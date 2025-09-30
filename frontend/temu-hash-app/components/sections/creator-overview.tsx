import Image from 'next/image';

const stats = [
  { label: 'Total revenue', value: '$12.4K', trend: '+18%', positive: true },
  { label: 'Downloads', value: '8.9K', trend: '+12%', positive: true },
  { label: 'Refund rate', value: '0.4%', trend: '-0.2%', positive: true },
  { label: 'Avg. rating', value: '4.8', trend: '+0.1', positive: true }
];

const topAssets = [
  {
    id: 'stellar-forge',
    title: 'Stellar Forge Pack',
    revenue: '$4.2K',
    thumbnail: 'https://images.unsplash.com/photo-1516117172878-fd2c41f4a759?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'quantum-ui',
    title: 'Quantum UI Kit',
    revenue: '$2.8K',
    thumbnail: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80'
  }
];

export function CreatorOverview() {
  return (
    <section className="glass-panel p-6 space-y-8">
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Creator performance</h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Track your sales momentum, discover top-performing assets, and forecast demand.
          </p>
        </div>
        <button className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/80 px-4 py-2 text-xs font-semibold text-slate-700 shadow-glass dark:border-white/10 dark:bg-white/10 dark:text-slate-200">
          Download report
        </button>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-white/30 bg-white/70 p-4 text-sm shadow-glass dark:border-white/10 dark:bg-white/5">
            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{stat.label}</p>
            <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">{stat.value}</p>
            <p className={`mt-1 text-xs font-semibold ${stat.positive ? 'text-emerald-500' : 'text-rose-500'}`}>{stat.trend}</p>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Top assets</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {topAssets.map((asset) => (
            <article key={asset.id} className="rounded-2xl border border-white/30 bg-white/70 p-4 shadow-glass dark:border-white/10 dark:bg-white/5">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-xl">
                  <Image src={asset.thumbnail} alt={asset.title} fill className="object-cover" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{asset.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Revenue: {asset.revenue}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
