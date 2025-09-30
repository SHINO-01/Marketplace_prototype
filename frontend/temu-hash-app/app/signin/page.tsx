import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { SignInCard } from '@/components/auth/signin-card';
import { auth } from '@/lib/auth';
import { getProviderMetadata } from '@/lib/auth/provider-utils';

export default async function SignInPage() {
  const session = await auth();

  if (session?.user) {
    redirect('/dashboard');
  }

  const referer = headers().get('referer');
  const callbackUrl = referer && !referer.endsWith('/signin') ? referer : '/dashboard';
  const providers = getProviderMetadata();

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4">
      <SignInCard callbackUrl={callbackUrl} providers={providers} />
    </div>
  );
}
