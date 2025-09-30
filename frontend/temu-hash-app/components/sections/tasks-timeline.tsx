import { CalendarClock, CheckCircle2, UploadCloud } from 'lucide-react';

const timeline = [
  {
    title: 'Asset moderation',
    description: 'Cyber City Modular Pack awaiting moderation review.',
    status: 'In review',
    icon: CalendarClock,
    time: '3h ago'
  },
  {
    title: 'Version update published',
    description: 'Quantum UI Kit v2.1 pushed to subscribers.',
    status: 'Completed',
    icon: CheckCircle2,
    time: 'Yesterday'
  },
  {
    title: 'New upload draft',
    description: 'Holographic FX bundle draft with auto-tagging suggestions.',
    status: 'Draft',
    icon: UploadCloud,
    time: '2 days ago'
  }
];

export function TasksTimeline() {
  return (
    <section className="glass-panel p-6 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Workflow timeline</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Stay on top of moderation requests, updates, and drafts.</p>
        </div>
        <button className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/80 px-4 py-2 text-xs font-semibold text-slate-700 shadow-glass dark:border-white/10 dark:bg-white/10 dark:text-slate-200">
          View all tasks
        </button>
      </header>

      <ul className="space-y-4">
        {timeline.map((item) => (
          <li key={item.title} className="flex gap-4">
            <div className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/60 to-secondary/60 text-slate-900 shadow-glass">
              <item.icon className="h-5 w-5" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">{item.time}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">{item.description}</p>
              <span className="inline-flex w-fit items-center rounded-full border border-white/30 bg-white/70 px-3 py-1 text-[11px] font-semibold text-slate-600 shadow-glass dark:border-white/10 dark:bg-white/10 dark:text-slate-300">
                {item.status}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
