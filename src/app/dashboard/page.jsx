'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/auth-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut } from 'lucide-react';
import { ShieldLogo } from '@/components/shield-logo';
import Image from 'next/image';

export default function DashboardPage() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <ShieldLogo className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  const getInitials = (name) => {
    if (!name) return '??';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-600 p-4">
      <Image
        src="https://images.unsplash.com/photo-1596238266479-0a6b5795a285?q=80&w=1887&auto=format&fit=crop"
        alt="Network background"
        fill
        quality={80}
        className="absolute inset-0 h-full w-full object-cover opacity-0 animate-bg-pan-fwd"
        data-ai-hint="network abstract"
      />
      <div className="relative z-10 w-full max-w-md animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
        <Card className="w-full max-w-md shadow-2xl bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex items-center justify-center">
              <Avatar className="h-20 w-20">
                <AvatarImage src={`https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(user.name)}`} alt={`${user.name}'s avatar`} />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="font-headline text-3xl">Welcome, {user.name}!</CardTitle>
            <p className="text-muted-foreground pt-2">
              You have successfully authenticated.
            </p>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <div className="text-center text-muted-foreground">
              <p>Email: {user.email}</p>
              <p>Age: {user.age}</p>
              <p>Contact: {user.contact}</p>
            </div>
            <Button onClick={logout} className="w-full" variant="destructive">
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
