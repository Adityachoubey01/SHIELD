import { ShieldLogo } from '@/components/shield-logo';
import { VoiceLogin } from '@/components/auth/voice-login';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-black p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center text-center">
          <ShieldLogo className="mb-4 h-20 w-20 text-white drop-shadow-lg" />
          <h1 className="font-headline text-6xl font-bold tracking-tight bg-gradient-to-r from-black to-white bg-clip-text text-transparent">
            SHIELD
          </h1>
          <p className="mt-2 text-lg text-indigo-200 drop-shadow-sm">
            The future of authentication is here.
          </p>
        </div>
        <div>
          <VoiceLogin />
        </div>
      </div>
    </main>
  );
}
