'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './auth-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Mic, MicOff, Hand, ChevronRight, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const GRID_SIZE = 9;

export function PasswordSetup() {
  const { setPasswords, user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  
  const [step, setStep] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [gesturePattern, setGesturePattern] = useState([]);
  
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  useEffect(() => {
    if (!user) {
      toast({
        title: 'Unauthorized',
        description: 'Please sign up before setting passwords.',
        variant: 'destructive',
      });
      router.push('/signup');
    }
  }, [user, router, toast]);

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsRecording(true);
      setAudioURL(null);
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          setAudioURL(reader.result);
        };
        setIsRecording(false);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
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
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  const handleBoxClick = (index) => {
    setGesturePattern([...gesturePattern, index]);
  };
  
  const handleFinalizeSetup = () => {
    if (!audioURL || gesturePattern.length === 0) {
      toast({
        title: 'Setup Incomplete',
        description: 'Please set both a voice and gesture password.',
        variant: 'destructive',
      });
      return;
    }
    setPasswords({ voice: audioURL, gesture: gesturePattern });
    toast({
      title: 'Setup Complete!',
      description: 'Your new authentication methods have been saved.',
      className: 'bg-green-500 text-white',
    });
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Security Setup ({step}/2)</CardTitle>
        <Progress value={step * 50} className="mt-2" />
      </CardHeader>
      
      {step === 1 && (
        <>
          <CardContent className="space-y-4">
            <CardDescription className='flex items-center gap-2'><Mic /> Step 1: Create a voice password like a clap, whistle, or a short word.</CardDescription>
            <div className="flex flex-col items-center justify-center gap-4 p-6 border-2 border-dashed rounded-lg">
              {isRecording ? (
                <Button onClick={handleStopRecording} variant="destructive" size="lg" className="w-full">
                  <MicOff className="mr-2 h-5 w-5 animate-pulse" /> Stop Recording
                </Button>
              ) : (
                <Button onClick={handleStartRecording} size="lg" className="w-full">
                  <Mic className="mr-2 h-5 w-5" /> Start Recording
                </Button>
              )}
              {audioURL && (
                <div className='w-full space-y-2 text-center'>
                  <p className='text-sm text-green-600 font-medium flex items-center justify-center gap-1'><Check size={16}/> Voice password recorded!</p>
                  <audio src={audioURL} controls className="w-full" />
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => setStep(2)} disabled={!audioURL} className="w-full">
              Next: Gesture Password <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </>
      )}

      {step === 2 && (
        <>
          <CardContent className="space-y-4">
            <CardDescription className='flex items-center gap-2'><Hand/> Step 2: Create your secret gesture by clicking the squares in a sequence.</CardDescription>
            <div className="grid grid-cols-3 gap-2 md:gap-4">
              {Array.from({ length: GRID_SIZE }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleBoxClick(index)}
                  className={cn(
                    "aspect-square rounded-lg border-2 transition-colors",
                    gesturePattern.includes(index) ? 'bg-accent border-accent-foreground' : 'bg-muted/50 hover:bg-muted'
                  )}
                  aria-label={`Gesture pad ${index + 1}`}
                />
              ))}
            </div>
             {gesturePattern.length > 0 && <p className='text-sm text-center text-muted-foreground'>Pattern length: {gesturePattern.length}</p>}
          </CardContent>
          <CardFooter className="flex-col sm:flex-row gap-2">
             <Button variant="outline" onClick={() => setGesturePattern([])} className="w-full sm:w-auto">Reset</Button>
             <Button onClick={handleFinalizeSetup} disabled={gesturePattern.length === 0} className="w-full">
               <Check className="mr-2 h-4 w-4" /> Finalize Setup
             </Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
}
