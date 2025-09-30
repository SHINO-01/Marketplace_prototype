"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const links = [
  { href: '/', label: 'Home' },
  { href: '/browse', label: 'Browse' },
  { href: '/collections', label: 'Collections' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/admin', label: 'Admin' }
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-slate-900/60 border-b border-white/20 dark:border-white/10">
      <nav className="container flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="h-11 w-11 rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-glass flex items-center justify-center text-slate-900 font-semibold">
            TH
          </span>
          <div className="flex flex-col">
            <span className="text-lg font-semibold gradient-text">TemuHash</span>
            <span className="text-xs text-slate-600 dark:text-slate-400">Game Asset Marketplace</span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-primary underline underline-offset-4'
                    : 'text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/upload"
            className="hidden md:inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-slate-900 bg-white/80 dark:bg-white/10 dark:text-slate-100 border border-white/40 dark:border-white/10 shadow-glass hover:shadow-glass/70 transition"
          >
            Become a Creator
          </Link>
          <ThemeToggle />
          <button
            className="lg:hidden inline-flex items-center justify-center rounded-full border border-white/30 bg-white/80 dark:bg-white/10 w-10 h-10"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {isOpen ? (
        <div className="lg:hidden border-t border-white/20 dark:border-white/5 bg-white/80 dark:bg-slate-900/80">
          <div className="container flex flex-col gap-2 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base font-medium text-slate-700 dark:text-slate-200"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/upload"
              className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-slate-900 bg-white dark:bg-white/10 dark:text-slate-100 border border-white/40 dark:border-white/10"
              onClick={() => setIsOpen(false)}
            >
              Become a Creator
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
