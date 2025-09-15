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
  prompt: `You are a sophisticated voice biometric authentication system. Your task is to determine if the provided 'Voice Recording' was spoken by the same person who recorded the 'Audio Password'.

Analyze and compare the following voice characteristics for both audio files:
- Pitch and fundamental frequency
- Tone and timbre
- Cadence and rhythm
- Intonation and speech patterns

Do not just compare the words being spoken. The core of your task is to verify the speaker's identity based on their unique vocal signature.

Return \`isAuthenticated\` as \`true\` only if you are highly confident that the voice characteristics from the 'Voice Recording' match those of the 'Audio Password'. Otherwise, return \`false\`.

Provide a concise message for the user. If authenticated, say 'Voice signature verified.' If not, say 'Voice signature does not match.'

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
