import { SignupForm } from '@/components/auth/signup-form';
import { GuardianGateLogo } from '@/components/guardian-gate-logo';

export default function SignupPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center text-center">
          <GuardianGateLogo className="mb-4 h-16 w-16 text-primary" />
          <h1 className="font-headline text-3xl font-bold text-primary">
            Create an Account
          </h1>
          <p className="text-muted-foreground">
            Join GuardianGate to experience next-gen security.
          </p>
        </div>
        <SignupForm />
      </div>
    </main>
  );
}
