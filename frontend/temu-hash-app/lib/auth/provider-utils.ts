import CredentialsProvider from 'next-auth/providers/credentials';
import EmailProvider from 'next-auth/providers/email';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import type { Provider } from 'next-auth/providers';

export const DEV_ADMIN_CREDENTIALS = {
  id: 'admin',
  secret: 'temuhash-admin',
  email: 'admin@temuhash.local'
} as const;

export type ProviderType = 'oauth' | 'email' | 'credentials';

export interface ProviderMetadata {
  id: string;
  name: string;
  type: ProviderType;
  enabled: boolean;
  reason?: string;
  notes?: string;
}

const warn = (message: string) => {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(`[temuhash-auth] ${message}`);
  }
};

const info = (message: string) => {
  if (process.env.NODE_ENV !== 'production') {
    console.info(`[temuhash-auth] ${message}`);
  }
};

export function buildProviders(): Provider[] {
  const providers: Provider[] = [];

  if (process.env.GITHUB_ID && process.env.GITHUB_SECRET) {
    providers.push(
      GitHubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET
      })
    );
  } else {
    warn('GitHub provider disabled: missing GITHUB_ID or GITHUB_SECRET');
  }

  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    providers.push(
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      })
    );
  } else {
    warn('Google provider disabled: missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET');
  }

  const adminCredentialsProvided = Boolean(process.env.ADMIN_PANEL_ID && process.env.ADMIN_PANEL_SECRET);
  const useAdminFallback = !adminCredentialsProvided && process.env.NODE_ENV !== 'production';

  if (adminCredentialsProvided || useAdminFallback) {
    const adminId = adminCredentialsProvided ? process.env.ADMIN_PANEL_ID! : DEV_ADMIN_CREDENTIALS.id;
    const adminSecret = adminCredentialsProvided ? process.env.ADMIN_PANEL_SECRET! : DEV_ADMIN_CREDENTIALS.secret;
    const adminEmail = process.env.ADMIN_PANEL_EMAIL ?? DEV_ADMIN_CREDENTIALS.email;

    if (useAdminFallback) {
      warn(
        'Admin credentials provider using development fallback credentials (ID "admin", password "temuhash-admin"). Configure ADMIN_PANEL_ID and ADMIN_PANEL_SECRET before deploying.'
      );
    }

    providers.push(
      CredentialsProvider({
        id: 'admin-credentials',
        name: 'Admin Console',
        credentials: {
          adminId: { label: 'Admin ID', type: 'text' },
          adminSecret: { label: 'Password', type: 'password' }
        },
        async authorize(credentials) {
          if (!credentials?.adminId || !credentials.adminSecret) {
            return null;
          }

          const idMatch = credentials.adminId === adminId;
          const secretMatch = credentials.adminSecret === adminSecret;

          if (!idMatch || !secretMatch) {
            return null;
          }

          return {
            id: `admin-${adminId}`,
            name: 'Admin Console',
            email: adminEmail,
            role: 'admin'
          } as { id: string; name: string; email: string; role: string };
        }
      })
    );
  } else {
    warn('Admin credentials provider disabled: missing ADMIN_PANEL_ID or ADMIN_PANEL_SECRET');
  }

  if (process.env.EMAIL_SERVER && process.env.EMAIL_FROM) {
    providers.push(
      EmailProvider({
        server: process.env.EMAIL_SERVER,
        from: process.env.EMAIL_FROM,
        maxAge: 60 * 60 * 24 // 24 hours
      })
    );
  } else {
    warn('Email provider disabled: missing EMAIL_SERVER or EMAIL_FROM');
  }

  if (providers.length === 0) {
    warn('No authentication providers enabled. Users will be unable to sign in.');
  }

  return providers;
}

export function getProviderMetadata(): ProviderMetadata[] {
  const githubEnabled = Boolean(process.env.GITHUB_ID && process.env.GITHUB_SECRET);
  const googleEnabled = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
  const emailEnabled = Boolean(process.env.EMAIL_SERVER && process.env.EMAIL_FROM);
  const adminCredentialsProvided = Boolean(process.env.ADMIN_PANEL_ID && process.env.ADMIN_PANEL_SECRET);
  const adminFallback = !adminCredentialsProvided && process.env.NODE_ENV !== 'production';
  const adminEnabled = adminCredentialsProvided || adminFallback;

  return [
    {
      id: 'github',
      name: 'GitHub',
      type: 'oauth',
      enabled: githubEnabled,
      reason: 'Connect with your GitHub account',
      notes: githubEnabled ? undefined : 'Set GITHUB_ID and GITHUB_SECRET to enable GitHub SSO.'
    },
    {
      id: 'google',
      name: 'Google',
      type: 'oauth',
      enabled: googleEnabled,
      reason: 'Use your Google Workspace or Gmail identity',
      notes: googleEnabled ? undefined : 'Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to enable Google SSO.'
    },
    {
      id: 'email',
      name: 'Email',
      type: 'email',
      enabled: emailEnabled,
      reason: 'Receive a secure sign-in link in your inbox',
      notes: emailEnabled ? undefined : 'Configure EMAIL_SERVER and EMAIL_FROM to send magic links securely.'
    },
    {
      id: 'admin-credentials',
      name: 'Admin Console',
      type: 'credentials',
      enabled: adminEnabled,
      reason: 'Restricted access for platform operations and moderation teams',
      notes: adminCredentialsProvided
        ? undefined
        : adminFallback
          ? 'Development fallback credentials active: ID "admin", password "temuhash-admin".'
          : 'Set ADMIN_PANEL_ID and ADMIN_PANEL_SECRET to enable admin access.'
    }
  ];
}
