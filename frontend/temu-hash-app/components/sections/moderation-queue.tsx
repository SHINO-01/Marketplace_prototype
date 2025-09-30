import { AlertCircle, ShieldCheck, Timer } from 'lucide-react';

const moderationItems = [
  {
    id: 'asset-234',
    title: 'Cyber City Modular Pack',
    submitter: 'NeonStudio',
    category: '3D Models',
    status: 'Awaiting review',
    priority: 'High',
    sla: 'Due in 2h',
    icon: AlertCircle
  },
  {
    id: 'asset-872',
    title: 'Aurora Real-Time Shaders',
    submitter: 'Spectral Labs',
    category: 'Shaders',
    status: 'QA checks',
    priority: 'Medium',
    sla: 'Due in 6h',
    icon: Timer
  },
  {
    id: 'asset-932',
    title: 'Void Soundscapes SFX',
    submitter: 'EchoSynth',
    category: 'Audio',
    status: 'Approved',
    priority: 'Low',
    sla: 'Completed',
    icon: ShieldCheck
  }
];

export function ModerationQueue() {
  return (
    <section className="glass-panel p-6 space-y-6">
      <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Moderation queue</h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">Prioritize reviews, maintain quality, and handle escalations quickly.</p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/70 px-3 py-1 text-xs font-medium text-slate-600 shadow-glass dark:border-white/10 dark:bg-white/10 dark:text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-500" /> SLA On track
        </div>
      </header>

      <ul className="space-y-4">
        {moderationItems.map((item) => (
          <li key={item.id} className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between rounded-2xl border border-white/30 bg-white/70 px-4 py-3 shadow-glass dark:border-white/10 dark:bg-white/5">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/70 to-secondary/70 text-slate-900 shadow-glass">
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.title}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {item.category} • Submitted by {item.submitter}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center rounded-full border border-white/30 bg-white/70 px-3 py-1 shadow-glass dark:border-white/10 dark:bg-white/10">
                {item.status}
              </span>
              <span className="inline-flex items-center rounded-full border border-white/30 bg-white/70 px-3 py-1 shadow-glass dark:border-white/10 dark:bg-white/10">
                Priority: {item.priority}
              </span>
              <span className="inline-flex items-center rounded-full border border-white/30 bg-white/70 px-3 py-1 shadow-glass dark:border-white/10 dark:bg-white/10">
                {item.sla}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
