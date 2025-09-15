import { GestureLogin } from '@/components/auth/gesture-login';
import { ShieldLogo } from '@/components/shield-logo';

export default function GestureLoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-600 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center text-center">
          <ShieldLogo className="mb-4 h-16 w-16 text-white" />
          <h1 className="font-headline text-3xl font-bold bg-gradient-to-r from-lime-600 to-green-600 bg-clip-text text-transparent">
            Gesture Password
          </h1>
          <p className="text-indigo-200">
            Enter your secret gesture sequence.
          </p>
        </div>
        <GestureLogin />
      </div>
    </main>
  );
}
