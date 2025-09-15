'use client';

import { useState, useRef, useEffect } from 'react';
import { useAuth } from './auth-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, MicOff, UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { authenticateVoiceCommand } from '@/ai/flows/voice-command-authentication';
import { useRouter } from 'next/navigation';

export function VoiceLogin() {
  const { voicePassword, voiceAttempts, decrementVoiceAttempts, loginWithVoice, resetAttempts } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    resetAttempts();
  }, [resetAttempts]);

  const handleStartRecording = async () => {
    if (voiceAttempts <= 0) {
      toast({
        title: 'Attempts Limit Reached',
        description: 'You have no more voice authentication attempts.',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsRecording(true);
      
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const recordedDataUri = reader.result;
          await verifyVoice(recordedDataUri);
        };
        setIsRecording(false);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      
      // Stop recording after 3 seconds
      setTimeout(handleStopRecording, 3000);

    } catch (err) {
      toast({
        title: 'Microphone Error',
        description: 'Could not access microphone. Please check permissions.',
        variant: 'destructive',
      });
      setIsRecording(false);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  };

  const verifyVoice = async (recordedDataUri) => {
    if (!voicePassword) {
      toast({
        title: 'No Voice Password',
        description: 'No voice password has been set up for this account.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await authenticateVoiceCommand({
        voiceRecordingDataUri: recordedDataUri,
        audioPasswordDataUri: voicePassword,
      });

      if (result.isAuthenticated) {
        toast({
          title: 'Voice Authenticated!',
          description: result.message,
          className: 'bg-green-500 text-white',
        });
        loginWithVoice();
      } else {
        decrementVoiceAttempts();
        toast({
          title: 'Authentication Failed',
          description: `Incorrect voice command. You have ${voiceAttempts - 1} attempts left.`,
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error(error);
      decrementVoiceAttempts();
      toast({
        title: 'An Error Occurred',
        description: 'Something went wrong during authentication. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-lg animate-wine-to-light">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2"><Mic /> Voice Authentication</CardTitle>
          {isClient && (
            <div className="text-right">
              <p className="text-sm font-medium text-destructive">{voiceAttempts} attempts left</p>
            </div>
          )}
        </div>
        <CardDescription>Press the button and perform your voice command.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-4 p-8">
        <Button 
          onClick={isRecording ? handleStopRecording : handleStartRecording} 
          disabled={isLoading || (isClient && voiceAttempts <= 0)}
          size="icon"
          className="h-24 w-24 rounded-full"
          variant={isRecording ? 'destructive' : 'default'}
        >
          {isRecording ? (
            <MicOff className="h-10 w-10 animate-pulse" />
          ) : (
            <Mic className="h-10 w-10" />
          )}
        </Button>
        <p className="text-sm text-muted-foreground h-5">
            {isLoading ? "Verifying..." : isRecording ? "Recording..." : "Press to start"}
        </p>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <p className="text-sm text-muted-foreground">
          Don't have an account?
        </p>
        <Button variant="outline" className="w-full" onClick={() => router.push('/signup')}>
          <UserPlus className="mr-2 h-4 w-4" /> Create Account
        </Button>
      </CardFooter>
    </Card>
  );
}
