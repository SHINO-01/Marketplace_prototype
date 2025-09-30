"use client";

import { useState, useTransition } from 'react';
import { signIn } from 'next-auth/react';
import { getProviderMetadata, type ProviderMetadata } from '@/lib/auth/provider-utils';

interface SignInCardProps {
  callbackUrl?: string;
  providers?: ProviderMetadata[];
}

const baseProviders = getProviderMetadata();

const buttonClasses =
  'w-full flex items-center justify-center gap-3 rounded-full border border-white/20 bg-white/80 dark:bg-white/10 px-5 py-2.5 text-sm font-semibold text-slate-900 dark:text-white shadow-glass hover:shadow-glass/70 transition disabled:opacity-50 disabled:cursor-not-allowed';

export function SignInCard({ callbackUrl, providers = baseProviders }: SignInCardProps) {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const enabledProviders = providers.filter((provider) => provider.enabled);

  const handleOAuthSignIn = async (providerId: string) => {
    setError(null);
    await signIn(providerId, { callbackUrl: callbackUrl ?? '/dashboard' });
  };

  const handleEmailSignIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setEmailSent(false);

    if (!email) {
      setError('Please enter a valid email address.');
      return;
    }

    startTransition(async () => {
      const response = await signIn('email', {
        email,
        callbackUrl: callbackUrl ?? '/dashboard',
        redirect: false
      });

      if (response?.error) {
        setError(response.error);
        return;
      }

      setEmailSent(true);
    });
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-3xl border border-white/10 bg-white/70 dark:bg-slate-900/80 shadow-2xl p-8 space-y-6">
      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Sign in to TemuHash</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Continue with a connected provider or request a secure sign-in link.
        </p>
      </div>

      <div className="space-y-3">
        {enabledProviders
          .filter((provider) => provider.type === 'oauth')
          .map((provider) => (
            <button
              key={provider.id}
              className={buttonClasses}
              onClick={() => handleOAuthSignIn(provider.id)}
              type="button"
            >
              Continue with {provider.name}
            </button>
          ))}
      </div>

      {enabledProviders.some((provider) => provider.type === 'email') ? (
        <form className="space-y-3" onSubmit={handleEmailSignIn}>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-full border border-white/30 bg-white/85 dark:bg-white/5 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="you@example.com"
              required
            />
          </div>

          <button className={buttonClasses} type="submit" disabled={isPending}>
            {isPending ? 'Sending magic link…' : 'Email me a magic link'}
          </button>

          {emailSent ? (
            <p className="text-sm text-green-600 dark:text-green-400 text-center">
              Check your inbox for a sign-in link. The link expires in 24 hours.
            </p>
          ) : null}
        </form>
      ) : null}

      {error ? <p className="text-sm text-red-500 text-center">{error}</p> : null}

      {providers
        .filter((provider) => !provider.enabled && provider.notes)
        .map((provider) => (
          <p key={provider.id} className="text-xs text-slate-500 dark:text-slate-400 text-center">
            {provider.notes}
          </p>
        ))}
    </div>
  );
}
