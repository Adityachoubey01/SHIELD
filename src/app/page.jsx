import { ShieldLogo } from '@/components/shield-logo';
import { VoiceLogin } from '@/components/auth/voice-login';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-black p-4">
      <div className="container grid max-w-6xl grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-16">
        
        <div className="w-full max-w-md space-y-6 md:order-2">
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

        <div className="hidden md:flex flex-col items-center justify-center md:order-1">
          <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
            <iframe 
              src='https://my.spline.design/login-2b8104d55050f243c9b0e9ca16b14f6b/' 
              frameBorder='0'
              className='w-full h-full'
            ></iframe>
          </div>
          <p className="mt-4 text-center text-sm text-gray-400">3D graphic from Spline.design</p>
        </div>

      </div>
    </main>
  );
}
