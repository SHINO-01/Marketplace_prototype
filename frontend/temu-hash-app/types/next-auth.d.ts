import NextAuth, { type DefaultSession } from 'next-auth';
import { type DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    role?: string;
  }

  interface Session {
    user?: DefaultSession['user'] & {
      role?: string | null;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    role?: string;
  }
}
