"use client";

import { useTheme } from 'next-themes';
import { MoonStar, SunMedium } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, systemTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const current = theme === 'system' ? systemTheme : theme;

  if (!mounted) {
    return (
      <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/70 text-slate-800 shadow-glass dark:border-white/10 dark:bg-white/10 dark:text-slate-100" aria-label="Toggle theme">
        <SunMedium className="h-5 w-5" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(current === 'dark' ? 'light' : 'dark')}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/80 text-slate-800 shadow-glass transition hover:shadow-glass/70 dark:border-white/10 dark:bg-white/10 dark:text-slate-100"
      aria-label="Toggle theme"
    >
      {current === 'dark' ? <SunMedium className="h-5 w-5" /> : <MoonStar className="h-5 w-5" />}
    </button>
  );
}
