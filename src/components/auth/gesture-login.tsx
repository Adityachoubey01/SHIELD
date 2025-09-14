'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './auth-provider';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Hand, Undo2 } from 'lucide-react';

const GRID_SIZE = 9;

export function GestureLogin() {
  const {
    gesturePassword,
    gestureAttempts,
    decrementGestureAttempts,
    loginWithGesture,
    isVoiceVerified,
    logout,
  } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [currentPattern, setCurrentPattern] = useState<number[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (!isVoiceVerified) {
      toast({
        title: 'Access Denied',
        description: 'Please complete voice authentication first.',
        variant: 'destructive',
      });
      router.push('/');
    }
  }, [isVoiceVerified, router, toast]);

  const handleBoxClick = (index: number) => {
    if (gestureAttempts <= 0) return;

    const newPattern = [...currentPattern, index];
    setCurrentPattern(newPattern);

    if (gesturePassword && newPattern.length === gesturePassword.length) {
      validatePattern(newPattern);
    }
  };
  
  const validatePattern = (pattern: number[]) => {
    if (JSON.stringify(pattern) === JSON.stringify(gesturePassword)) {
      toast({
        title: 'Success!',
        description: 'Gesture authenticated. Welcome back!',
        className: 'bg-green-500 text-white',
      });
      loginWithGesture();
    } else {
      decrementGestureAttempts();
      setCurrentPattern([]);
      if (gestureAttempts - 1 > 0) {
        toast({
          title: 'Incorrect Gesture',
          description: `Please try again. You have ${gestureAttempts - 1} attempts left.`,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Too Many Incorrect Attempts',
          description: 'You have been locked out. Please start over.',
          variant: 'destructive',
        });
        logout();
      }
    }
  };

  const resetPattern = () => {
    setCurrentPattern([]);
  };

  if (!isClient || !isVoiceVerified) {
    return null; // or a loading spinner
  }
  
  if (!gesturePassword) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No gesture password found. Please sign up to create one.</p>
          <Button onClick={() => router.push('/signup')} className="mt-4 w-full">Go to Sign Up</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2"><Hand /> Gesture Authentication</CardTitle>
          <div className="text-right">
            <p className="text-sm font-medium text-destructive">{gestureAttempts} attempts left</p>
          </div>
        </div>
        <CardDescription>Click the squares in your secret sequence.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2 md:gap-4">
          {Array.from({ length: GRID_SIZE }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleBoxClick(index)}
              disabled={gestureAttempts <= 0}
              className={cn(
                "aspect-square rounded-lg border-2 transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                currentPattern.includes(index) ? 'bg-accent border-accent-foreground' : 'bg-muted/50 hover:bg-muted',
                gestureAttempts <= 0 ? 'cursor-not-allowed opacity-50' : ''
              )}
              aria-label={`Gesture pad ${index + 1}`}
            />
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" onClick={resetPattern} className="w-full" disabled={currentPattern.length === 0}>
          <Undo2 className="mr-2 h-4 w-4" /> Reset Pattern
        </Button>
      </CardFooter>
    </Card>
  );
}
