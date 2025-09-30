import { redirect } from 'next/navigation';
import { CreatorOverview } from '@/components/sections/creator-overview';
import { SalesInsights } from '@/components/sections/sales-insights';
import { TasksTimeline } from '@/components/sections/tasks-timeline';
import { auth } from '@/lib/auth';

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/signin?callbackUrl=/dashboard');
  }

  return (
    <div className="container py-12 space-y-10">
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Creator dashboard</h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Monitor performance, manage assets, and optimize your monetization strategy across marketplaces.
          </p>
        </div>
        <button className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-slate-900 shadow-glass hover:shadow-glass/70">
          Upload new asset
        </button>
      </header>

      <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-8">
          <CreatorOverview />
          <SalesInsights />
        </div>
        <TasksTimeline />
      </div>
    </div>
  );
}
