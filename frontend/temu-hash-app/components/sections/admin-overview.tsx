import { Shield, Users, TrendingUp, Globe2 } from 'lucide-react';

const kpis = [
  {
    label: 'Assets pending review',
    value: '126',
    trend: '+12%',
    description: 'Needs triage today',
    icon: Shield,
    tone: 'warn'
  },
  {
    label: 'Vendors onboarded',
    value: '2.4K',
    trend: '+6%',
    description: 'Last 30 days',
    icon: Users,
    tone: 'positive'
  },
  {
    label: 'Revenue (MTD)',
    value: '$184K',
    trend: '+9%',
    description: 'Gross marketplace sales',
    icon: TrendingUp,
    tone: 'positive'
  },
  {
    label: 'Platform uptime',
    value: '99.98%',
    trend: 'SLO 99.95%',
    description: 'Across regions',
    icon: Globe2,
    tone: 'neutral'
  }
];

export function AdminOverview() {
  return (
    <section className="glass-panel p-6 space-y-6">
      <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Operations dashboard</h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">Monitor marketplace health, compliance, and revenue KPIs.</p>
        </div>
        <button className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/80 px-4 py-2 text-xs font-semibold text-slate-700 shadow-glass dark:border-white/10 dark:bg-white/10 dark:text-slate-200">
          Export weekly report
        </button>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((item) => (
          <div key={item.label} className="rounded-2xl border border-white/30 bg-white/70 p-4 shadow-glass dark:border-white/10 dark:bg-white/5">
            <div className="flex items-center justify-between">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/70 to-secondary/70 text-slate-900 shadow-glass">
                <item.icon className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">{item.description}</span>
            </div>
            <p className="mt-4 text-2xl font-semibold text-slate-900 dark:text-white">{item.value}</p>
            <p
              className={`mt-1 text-xs font-semibold ${
                item.tone === 'positive' ? 'text-emerald-500' : item.tone === 'warn' ? 'text-amber-500' : 'text-slate-500'
              }`}
            >
              {item.trend}
            </p>
            <p className="mt-2 text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
