import { BarChart3, LineChart, PieChart } from 'lucide-react';

const revenueSeries = [
  { label: 'Jan', value: 8200 },
  { label: 'Feb', value: 9600 },
  { label: 'Mar', value: 12100 },
  { label: 'Apr', value: 14200 }
];

const marketplaceSplit = [
  { label: 'TemuHash', value: 62 },
  { label: 'External', value: 23 },
  { label: 'Direct', value: 15 }
];

export function SalesInsights() {
  return (
    <section className="glass-panel p-6 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Sales insights</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Revenue momentum, channel distribution, and retention metrics to guide your roadmap.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/70 px-3 py-1 text-xs font-medium text-slate-600 shadow-glass dark:border-white/10 dark:bg-white/10 dark:text-slate-300">
          <LineChart className="h-4 w-4" />
          Last 90 days
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Projected revenue</h3>
          <div className="h-48 rounded-2xl border border-white/30 bg-white/40 p-4 shadow-inner dark:border-white/10 dark:bg-white/5">
            <div className="grid h-full grid-cols-4 gap-4 items-end">
              {revenueSeries.map((point) => (
                <div key={point.label} className="flex flex-col items-center gap-2">
                  <div
                    className="w-full rounded-full bg-gradient-to-b from-primary to-secondary shadow-glass"
                    style={{ height: `${point.value / 180}px` }}
                  />
                  <span className="text-xs text-slate-500 dark:text-slate-400">{point.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Channel distribution</h3>
          <div className="rounded-2xl border border-white/30 bg-white/40 p-6 shadow-inner dark:border-white/10 dark:bg-white/5">
            <div className="flex items-center justify-center gap-3">
              <PieChart className="h-12 w-12 text-primary" />
              <div className="text-3xl font-semibold text-slate-900 dark:text-white">62%</div>
            </div>
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 text-center">
              TemuHash share of total revenue (last quarter)
            </p>
            <ul className="mt-4 space-y-3 text-xs text-slate-600 dark:text-slate-300">
              {marketplaceSplit.map((item) => (
                <li key={item.label} className="flex items-center justify-between">
                  <span>{item.label}</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-100">{item.value}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <footer className="flex flex-wrap gap-3 text-xs text-slate-500 dark:text-slate-400">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/70 px-3 py-1 shadow-glass dark:border-white/10 dark:bg-white/10">
          <BarChart3 className="h-4 w-4 text-secondary" /> Conversion ratio 4.1%
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/70 px-3 py-1 shadow-glass dark:border-white/10 dark:bg-white/10">
          Repeat customers 36%
        </span>
      </footer>
    </section>
  );
}
