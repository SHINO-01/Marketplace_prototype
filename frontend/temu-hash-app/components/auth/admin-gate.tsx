"use client";

import { useState, useTransition } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function AdminGate() {
  const router = useRouter();
  const [adminId, setAdminId] = useState('');
  const [adminSecret, setAdminSecret] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    startTransition(async () => {
      const response = await signIn('admin-credentials', {
        adminId,
        adminSecret,
        redirect: false,
        callbackUrl: '/admin'
      });

      if (response?.error) {
        setError('Invalid admin credentials.');
        return;
      }

      router.replace('/admin');
      router.refresh();
    });
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-16 px-4">
      <form
        className="w-full max-w-md space-y-6 rounded-3xl border border-white/10 bg-white/80 dark:bg-slate-900/80 shadow-2xl p-8"
        onSubmit={handleSubmit}
      >
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Admin authentication</h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Enter your administrator credentials to access the operations console.
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="adminId">
              Admin ID
            </label>
            <input
              id="adminId"
              type="text"
              value={adminId}
              autoComplete="username"
              onChange={(event) => setAdminId(event.target.value)}
              className="w-full rounded-full border border-white/30 bg-white/90 dark:bg-white/5 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="adminSecret">
              Password
            </label>
            <input
              id="adminSecret"
              type="password"
              value={adminSecret}
              autoComplete="current-password"
              onChange={(event) => setAdminSecret(event.target.value)}
              className="w-full rounded-full border border-white/30 bg-white/90 dark:bg-white/5 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-glass hover:shadow-glass/70 transition disabled:opacity-60"
          disabled={isPending}
        >
          {isPending ? 'Verifying…' : 'Authenticate'}
        </button>

        {error ? <p className="text-sm text-red-500 text-center">{error}</p> : null}
      </form>
    </div>
  );
}
