'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useRouter } from 'next/navigation';

const VOICE_ATTEMPTS_LIMIT = 5;
const GESTURE_ATTEMPTS_LIMIT = 3;

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [voicePassword, setVoicePassword] = useState(null);
  const [gesturePassword, setGesturePassword] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVoiceVerified, setIsVoiceVerified] = useState(false);
  const [voiceAttempts, setVoiceAttempts] = useState(VOICE_ATTEMPTS_LIMIT);
  const [gestureAttempts, setGestureAttempts] = useState(GESTURE_ATTEMPTS_LIMIT);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
//it is repsonsible in loading the data when this page starts.
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('gg_user');
      const storedVoicePassword = localStorage.getItem('gg_voicePassword');
      const storedGesturePassword = localStorage.getItem('gg_gesturePassword');

      if (storedUser) setUser(JSON.parse(storedUser));
      if (storedVoicePassword) setVoicePassword(storedVoicePassword);
      if (storedGesturePassword) setGesturePassword(JSON.parse(storedGesturePassword));
    } catch (error) {
      console.error('Failed to load auth data from localStorage', error);
      localStorage.clear();
    }
    setIsLoaded(true);
  }, []);

  const signup = useCallback((details) => {
    setUser(details);
    localStorage.setItem('gg_user', JSON.stringify(details));
    router.push('/setup');
  }, [router]);

  const setPasswords = useCallback((passwords) => {
    setVoicePassword(passwords.voice);
    setGesturePassword(passwords.gesture);
    localStorage.setItem('gg_voicePassword', passwords.voice);
    localStorage.setItem('gg_gesturePassword', JSON.stringify(passwords.gesture));
    // router.push('/'); // Will be handled in the component
  }, []);
  
  const decrementVoiceAttempts = useCallback(() => {
    setVoiceAttempts((prev) => Math.max(0, prev - 1));
  }, []);

  const decrementGestureAttempts = useCallback(() => {
    setGestureAttempts((prev) => Math.max(0, prev - 1));
  }, []);
  
  const loginWithVoice = useCallback(() => {
    setIsVoiceVerified(true);
    router.push('/gesture-login');
  }, [router]);

  const loginWithGesture = useCallback(() => {
    setIsAuthenticated(true);
    router.push('/dashboard');
  }, [router]);

  const resetAttempts = useCallback(() => {
    setVoiceAttempts(VOICE_ATTEMPTS_LIMIT);
    setGestureAttempts(GESTURE_ATTEMPTS_LIMIT);
  }, []);
  
  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setIsVoiceVerified(false);
    resetAttempts();
    router.push('/');
  }, [router, resetAttempts]);
  
  const value = {
    user,
    voicePassword,
    gesturePassword,
    isAuthenticated: isLoaded ? isAuthenticated : false,
    isVoiceVerified: isLoaded ? isVoiceVerified : false,
    voiceAttempts,
    gestureAttempts,
    signup,
    setPasswords,
    decrementVoiceAttempts,
    decrementGestureAttempts,
    loginWithVoice,
    loginWithGesture,
    logout,
    resetAttempts
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
