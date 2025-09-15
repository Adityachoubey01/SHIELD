import { ShieldLogo } from '@/components/shield-logo';
import { VoiceLogin } from '@/components/auth/voice-login';

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background p-4">
      <div className="absolute inset-0 z-0">
        <div className="animated-background"></div>
      </div>
      <div className="z-10 w-full max-w-md space-y-6">
        <div className="flex animate-fade-in-up flex-col items-center text-center">
          <ShieldLogo className="mb-4 h-20 w-20 text-white drop-shadow-lg" />
          <h1 className="font-headline text-6xl font-bold tracking-tight bg-gradient-to-r from-white via-neutral-300 to-white bg-clip-text text-transparent drop-shadow-md">
            SHIELD
          </h1>
          <p className="mt-2 text-lg text-indigo-200 drop-shadow-sm">
            The future of authentication is here.
          </p>
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <VoiceLogin />
        </div>
      </div>
    </main>
  );
}
