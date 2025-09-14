import { GestureLogin } from '@/components/auth/gesture-login';
import { GuardianGateLogo } from '@/components/guardian-gate-logo';

export default function GestureLoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center text-center">
          <GuardianGateLogo className="mb-4 h-16 w-16 text-primary" />
          <h1 className="font-headline text-3xl font-bold text-primary">
            Gesture Password
          </h1>
          <p className="text-muted-foreground">
            Enter your secret gesture sequence.
          </p>
        </div>
        <GestureLogin />
      </div>
    </main>
  );
}
