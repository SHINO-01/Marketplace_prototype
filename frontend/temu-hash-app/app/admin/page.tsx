import { AdminOverview } from '@/components/sections/admin-overview';
import { ModerationQueue } from '@/components/sections/moderation-queue';
import { PlatformMetrics } from '@/components/sections/platform-metrics';
import { auth } from '@/lib/auth';
import { AdminGate } from '@/components/auth/admin-gate';

export default async function AdminPage() {
  const session = await auth();
  const isAdmin = session?.user?.role === 'admin';

  if (!isAdmin) {
    return <AdminGate />;
  }

  return (
    <div className="container py-12 space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Platform operations</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Manage asset approvals, monitor health metrics, and curate marketplace promotions.
        </p>
      </header>

      <div className="grid gap-8 xl:grid-cols-[1fr_0.8fr]">
        <div className="space-y-8">
          <AdminOverview />
          <ModerationQueue />
        </div>
        <PlatformMetrics />
      </div>
    </div>
  );
}
