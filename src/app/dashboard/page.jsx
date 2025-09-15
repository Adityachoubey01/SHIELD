'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/auth-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut } from 'lucide-react';
import { ShieldLogo } from '@/components/shield-logo';

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
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-600 p-4">
      <Card className="w-full max-w-md shadow-2xl">
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
            <p>Age: {user.age}</p>
            <p>Contact: {user.contact}</p>
          </div>
          <Button onClick={logout} className="w-full" variant="destructive">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
