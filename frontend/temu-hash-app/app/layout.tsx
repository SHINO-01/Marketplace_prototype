import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers/providers';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { auth } from '@/lib/auth';

const fontSans = Plus_Jakarta_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TemuHash | Game Asset Marketplace',
  description:
    'TemuHash is a glassmorphism-inspired marketplace for discovering, buying, and selling high-quality game assets.',
  keywords: [
    'game assets',
    'marketplace',
    '3D models',
    'textures',
    'audio',
    'shaders',
    'plugins'
  ]
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fontSans.className}>
        <Providers session={session}>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 flex flex-col">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
