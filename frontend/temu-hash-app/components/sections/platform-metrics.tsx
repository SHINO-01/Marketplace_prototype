import { Activity, Server, Users, MonitorSmartphone } from 'lucide-react';

const uptimeRegions = [
  { region: 'NA', uptime: '99.99%', latency: '42ms' },
  { region: 'EU', uptime: '99.97%', latency: '55ms' },
  { region: 'APAC', uptime: '99.95%', latency: '68ms' }
];

const alerts = [
  { label: 'Security events', value: 3, tone: 'warn' as const },
  { label: 'Performance incidents', value: 0, tone: 'positive' as const },
  { label: 'Deployments today', value: 5, tone: 'neutral' as const }
];

export function PlatformMetrics() {
  return (
    <section className="glass-panel p-6 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Platform metrics</h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Reliability posture, regional uptime, and security signals with SIEM integration.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-600 shadow-glass dark:border-white/10 dark:bg-white/10 dark:text-slate-300">
          <Activity className="h-4 w-4 text-emerald-400" /> Live
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-white/30 bg-white/70 p-4 shadow-glass dark:border-white/10 dark:bg-white/5">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
            <Server className="h-4 w-4 text-primary" /> Regional uptime
          </div>
          <ul className="mt-4 space-y-3 text-xs text-slate-600 dark:text-slate-300">
            {uptimeRegions.map((item) => (
              <li key={item.region} className="flex items-center justify-between">
                <span>{item.region}</span>
                <span className="font-semibold text-slate-900 dark:text-white">{item.uptime}</span>
                <span className="rounded-full border border-white/30 bg-white/70 px-3 py-1 shadow-glass dark:border-white/10 dark:bg-white/10">{item.latency}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-white/30 bg-white/70 p-4 shadow-glass dark:border-white/10 dark:bg-white/5">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
            <MonitorSmartphone className="h-4 w-4 text-secondary" /> Active surfaces
          </div>
          <div className="mt-4 grid gap-3 text-xs text-slate-600 dark:text-slate-300">
            <MetricBadge icon={<Users className="h-4 w-4" />} label="Concurrent users" value="4.3K" tone="positive" />
            <MetricBadge icon={<Activity className="h-4 w-4" />} label="API throughput" value="12.7K rpm" tone="neutral" />
            <MetricBadge icon={<Server className="h-4 w-4" />} label="Service health" value="All green" tone="positive" />
          </div>
        </div>
      </div>

      <footer className="flex flex-wrap gap-3 text-xs text-slate-500 dark:text-slate-400">
        {alerts.map((alert) => (
          <span
            key={alert.label}
            className={`inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/70 px-3 py-1 shadow-glass dark:border-white/10 dark:bg-white/10 ${
              alert.tone === 'warn' ? 'text-amber-500' : alert.tone === 'positive' ? 'text-emerald-500' : 'text-slate-500'
            }`}
          >
            {alert.label}: {alert.value}
          </span>
        ))}
      </footer>
    </section>
  );
}

interface MetricBadgeProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone: 'positive' | 'neutral' | 'warn';
}

function MetricBadge({ icon, label, value, tone }: MetricBadgeProps) {
  const toneClass =
    tone === 'positive' ? 'text-emerald-500' : tone === 'warn' ? 'text-amber-500' : 'text-slate-500 dark:text-slate-300';

  return (
    <span className={`inline-flex items-center justify-between gap-3 rounded-2xl border border-white/30 bg-white/70 px-4 py-2 shadow-glass dark:border-white/10 dark:bg-white/10 ${toneClass}`}>
      <span className="flex items-center gap-2">
        {icon}
        <span>{label}</span>
      </span>
      <span className="font-semibold text-slate-900 dark:text-white">{value}</span>
    </span>
  );
}
