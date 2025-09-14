import { ShieldLogo } from '@/components/shield-logo';
import { VoiceLogin } from '@/components/auth/voice-login';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-600 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center text-center">
          <ShieldLogo className="mb-4 h-16 w-16 text-primary" />
          <h1 className="font-headline text-3xl font-bold text-primary">
            SHIELD
          </h1>
          <p className="bg-gradient-to-r from-blue-900 to-purple-900 bg-clip-text font-semibold text-transparent">
            The future of authentication is here.
          </p>
        </div>
        <VoiceLogin />
      </div>
    </main>
  );
}
