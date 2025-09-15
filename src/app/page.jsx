import { ShieldLogo } from '@/components/shield-logo';
import { VoiceLogin } from '@/components/auth/voice-login';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-600 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center text-center">
          <ShieldLogo className="mb-4 h-16 w-16 text-white drop-shadow-lg" />
          <h1 className="font-headline text-5xl font-bold tracking-tight bg-gradient-to-r from-black to-white bg-clip-text text-transparent">
            SHIELD
          </h1>
          <p className="text-lg text-indigo-200">
            The future of authentication is here.
          </p>
        </div>
        <VoiceLogin />
      </div>
    </main>
  );
}
