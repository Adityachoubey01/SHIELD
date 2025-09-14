// The `use server` directive is required for Server Actions used in Next.js.
'use server';

/**
 * @fileOverview Implements voice command authentication using Genkit.
 *
 * - `authenticateVoiceCommand` - A function that handles the voice command authentication process.
 * - `VoiceCommandAuthenticationInput` - The input type for the authenticateVoiceCommand function.
 * - `VoiceCommandAuthenticationOutput` - The return type for the authenticateVoiceCommand function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VoiceCommandAuthenticationInputSchema = z.object({
  voiceRecordingDataUri: z
    .string()
    .describe(
      "A voice recording, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  audioPasswordDataUri: z
    .string()
    .describe(
      "The user's saved audio password, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type VoiceCommandAuthenticationInput = z.infer<typeof VoiceCommandAuthenticationInputSchema>;

const VoiceCommandAuthenticationOutputSchema = z.object({
  isAuthenticated: z
    .boolean()
    .describe('Whether the voice command matches the stored audio password.'),
  message: z.string().describe('A message indicating the authentication result.'),
});
export type VoiceCommandAuthenticationOutput = z.infer<typeof VoiceCommandAuthenticationOutputSchema>;

export async function authenticateVoiceCommand(
  input: VoiceCommandAuthenticationInput
): Promise<VoiceCommandAuthenticationOutput> {
  return authenticateVoiceCommandFlow(input);
}

const authenticateVoiceCommandPrompt = ai.definePrompt({
  name: 'authenticateVoiceCommandPrompt',
  input: {schema: VoiceCommandAuthenticationInputSchema},
  output: {schema: VoiceCommandAuthenticationOutputSchema},
  prompt: `You are an authentication expert. You will determine if the user is who they say they are based on whether or not their voice recording matches their stored audio password. Return isAuthenticated as true if the voice recording matches the audio password and false if it does not. Also, return a message to the user indicating whether or not they were authenticated.

Voice Recording: {{media url=voiceRecordingDataUri}}
Audio Password: {{media url=audioPasswordDataUri}}`,
});

const authenticateVoiceCommandFlow = ai.defineFlow(
  {
    name: 'authenticateVoiceCommandFlow',
    inputSchema: VoiceCommandAuthenticationInputSchema,
    outputSchema: VoiceCommandAuthenticationOutputSchema,
  },
  async input => {
    const {output} = await authenticateVoiceCommandPrompt(input);
    return output!;
  }
);
