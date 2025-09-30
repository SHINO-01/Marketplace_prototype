import type { NextAuthConfig } from 'next-auth';
import { buildProviders } from '@/lib/auth/provider-utils';

const devSecret = 'temuhash-development-secret';

const allowedAdmins = (process.env.NEXTAUTH_ALLOWED_ADMINS ?? '')
  .split(',')
  .map((entry) => entry.trim().toLowerCase())
  .filter(Boolean);

const ensureSecret = (): string | undefined => {
  if (process.env.NEXTAUTH_SECRET) {
    return process.env.NEXTAUTH_SECRET;
  }

  if (process.env.NODE_ENV !== 'production') {
    console.warn('[temuhash-auth] NEXTAUTH_SECRET missing, using development fallback.');
    return devSecret;
  }

  return undefined;
};

export const authOptions: NextAuthConfig = {
  secret: ensureSecret(),
  trustHost: true,
  debug: process.env.NODE_ENV !== 'production',
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/signin'
  },
  providers: buildProviders(),
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const email = user.email?.toLowerCase();
        const userRole = (user as { role?: string }).role;

        if (userRole === 'admin' || (email && allowedAdmins.includes(email))) {
          token.role = 'admin';
        } else {
          token.role = 'user';
        }
      }

      if (!token.role) {
        const email = typeof token.email === 'string' ? token.email.toLowerCase() : undefined;
        token.role = email && allowedAdmins.includes(email) ? 'admin' : 'user';
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = (token.role as string | undefined) ?? 'user';
      }

      return session;
    }
  }
};

if (!authOptions.secret) {
  throw new Error('NEXTAUTH_SECRET must be set in production environments.');
}

export default authOptions;
