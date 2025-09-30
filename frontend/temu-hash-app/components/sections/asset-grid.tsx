import Image from 'next/image';
import Link from 'next/link';
import { mockAssets } from '@/lib/mock-data';
import { Star } from 'lucide-react';

export function AssetGrid() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
        <p>{mockAssets.length} curated assets</p>
        <select className="glass-panel px-4 py-2 text-xs font-medium bg-white/80 dark:bg-white/10">
          <option>Recommended</option>
          <option>Newest</option>
          <option>Top Rated</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
        </select>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {mockAssets.map((asset) => (
          <article key={asset.id} className="glass-panel overflow-hidden">
            <div className="relative h-44">
              <Image
                src={asset.thumbnail}
                alt={asset.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 350px"
              />
              <div className="absolute inset-x-4 top-4 flex items-center justify-between text-xs font-semibold text-white">
                <span className="rounded-full bg-slate-900/60 px-3 py-1 backdrop-blur-lg">{asset.category}</span>
                <span className="rounded-full bg-primary px-3 py-1 text-slate-900">{asset.price}</span>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <header className="space-y-2">
                <Link href={`/asset/${asset.slug}`} className="text-lg font-semibold text-slate-900 dark:text-white">
                  {asset.title}
                </Link>
                <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3">{asset.description}</p>
              </header>

              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <Image
                    src={asset.creator.avatar}
                    alt={asset.creator.name}
                    width={32}
                    height={32}
                    className="rounded-full border border-white/40"
                  />
                  <span>{asset.creator.name}</span>
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="h-4 w-4 fill-current" />
                  <span>{asset.rating.toFixed(1)}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {asset.compatibility.map((engine) => (
                  <span
                    key={engine}
                    className="rounded-full border border-white/40 dark:border-white/10 bg-white/70 px-3 py-1 text-[11px] font-semibold text-slate-600 dark:bg-white/10 dark:text-slate-300"
                  >
                    {engine}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
