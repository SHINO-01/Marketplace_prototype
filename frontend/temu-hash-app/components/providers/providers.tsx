"use client";

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';

interface ProvidersProps {
  children: React.ReactNode;
  session?: Session | null;
}

export function Providers({ children, session }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient());
  const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env;
  const showDevtools = env?.NODE_ENV === 'development';

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem storageKey="temuhash-theme">
          {children}
          {showDevtools ? <ReactQueryDevtools initialIsOpen={false} /> : null}
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
