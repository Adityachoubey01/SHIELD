import { ShieldLogo } from '@/components/shield-logo';
import { VoiceLogin } from '@/components/auth/voice-login';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-black p-4">
      <div className="container grid max-w-6xl grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-16">
        <div className="hidden md:flex flex-col items-center justify-center">
          {/* This is a placeholder for a 3D animated graphic */}
          <iframe 
            src='https://my.spline.design/login-2b8104d55050f243c9b0e9ca16b14f6b/' 
            frameBorder='0' 
            width='100%' 
            height='400px'
            className='rounded-lg'
          ></iframe>
          <p className="mt-4 text-center text-sm text-gray-400">3D graphic from Spline.design</p>
        </div>
        
        <div className="w-full max-w-md space-y-6">
          <div className="flex animate-fade-in-up flex-col items-center text-center">
            <ShieldLogo className="mb-4 h-20 w-20 text-white drop-shadow-lg" />
            <h1 className="font-headline text-6xl font-bold tracking-tight bg-gradient-to-r from-black to-white bg-clip-text text-transparent">
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
      </div>
    </main>
  );
}
