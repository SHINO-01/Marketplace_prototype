import Link from 'next/link';

export function CallToAction() {
  return (
    <section className="relative">
      <div className="container relative">
        <div className="absolute inset-x-0 -top-10 h-72 rounded-full bg-gradient-to-r from-primary/40 via-secondary/20 to-primary/40 blur-3xl" aria-hidden />
        <div className="relative glass-panel px-10 py-12 flex flex-col gap-6 items-start md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">Join TemuHash</p>
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
              Build, ship, and monetize game-ready assets effortlessly.
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl">
              TemuHash is designed for modular growth—start showcasing your portfolio, automate licensing, and reach studios worldwide.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/auth/sign-up"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-2.5 text-sm font-semibold text-slate-900 shadow-glass hover:shadow-glass/70"
            >
              Start for Free
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/70 px-6 py-2.5 text-sm font-semibold text-slate-700 shadow-glass transition hover:border-primary/40 hover:text-primary dark:border-white/10 dark:bg-white/10 dark:text-slate-200"
            >
              Book a Demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
