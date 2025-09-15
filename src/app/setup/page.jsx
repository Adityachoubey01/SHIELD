import { PasswordSetup } from '@/components/auth/password-setup';
import { ShieldLogo } from '@/components/shield-logo';

export default function SetupPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-600 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center text-center">
          <ShieldLogo className="mb-4 h-16 w-16 text-white" />
          <h1 className="font-headline text-3xl font-bold bg-gradient-to-r from-black to-white bg-clip-text text-transparent">
            Create Your Passwords
          </h1>
          <p className="bg-gradient-to-r from-blue-900 to-purple-900 bg-clip-text font-semibold text-transparent">
            Set up your unique voice and gesture credentials.
          </p>
        </div>
        <PasswordSetup />
      </div>
    </main>
  );
}
