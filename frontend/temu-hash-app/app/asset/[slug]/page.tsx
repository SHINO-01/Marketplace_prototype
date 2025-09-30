import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { mockAssets } from '@/lib/mock-data';
import { Star, Download, Share2, ShieldCheck } from 'lucide-react';

interface AssetPageProps {
  params: { slug: string };
}

export default function AssetPage({ params }: AssetPageProps) {
  const asset = mockAssets.find((item) => item.slug === params.slug);

  if (!asset) {
    return notFound();
  }

  return (
    <div className="container py-12 space-y-10">
      <nav className="text-xs text-slate-500 dark:text-slate-400">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>{' '}
        /{' '}
        <Link href="/browse" className="hover:text-primary">
          Browse
        </Link>{' '}
        / {asset.title}
      </nav>

      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="glass-panel p-6 space-y-6">
          <div className="relative h-80 rounded-3xl overflow-hidden">
            <Image src={asset.thumbnail} alt={asset.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 700px" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">{asset.title}</h1>
            <div className="mt-2 flex flex-wrap gap-3 text-sm text-slate-600 dark:text-slate-300">
              <span className="inline-flex items-center gap-1 text-amber-500">
                <Star className="h-4 w-4 fill-current" />
                {asset.rating.toFixed(1)} rating
              </span>
              <span>Category: {asset.category}</span>
              <span>Compatible with: {asset.compatibility.join(', ')}</span>
            </div>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{asset.description}</p>
          <div className="flex flex-wrap gap-2">
            {asset.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-white/30 dark:border-white/10 bg-white/70 px-3 py-1 text-[11px] font-semibold text-slate-600 dark:bg-white/10 dark:text-slate-300">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="glass-panel p-6 space-y-5">
            <div className="flex items-center gap-3">
              <Image src={asset.creator.avatar} alt={asset.creator.name} width={48} height={48} className="rounded-full border border-white/40" />
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{asset.creator.name}</p>
                <Link href={`/creators/${asset.creator.name.toLowerCase()}`} className="text-xs text-primary">
                  View profile
                </Link>
              </div>
            </div>

            <div className="space-y-3">
              <div className="rounded-2xl bg-gradient-to-br from-primary to-secondary text-slate-900 px-6 py-5 shadow-glass">
                <p className="text-xs uppercase font-semibold">License starts at</p>
                <p className="text-2xl font-bold">{asset.price}</p>
              </div>
              <button className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-slate-900 shadow-glass hover:shadow-glass/70">
                <Download className="h-4 w-4" />
                Add to cart
              </button>
              <button className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/70 px-6 py-3 text-sm font-semibold text-slate-700 shadow-glass dark:border-white/10 dark:bg-white/10 dark:text-slate-200">
                <Share2 className="h-4 w-4" />
                Share asset
              </button>
            </div>
          </div>

          <div className="glass-panel p-6 space-y-4 text-sm text-slate-600 dark:text-slate-300">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">License coverage</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>Personal, commercial, and studio license tiers</li>
              <li>Unlimited downloads, per-seat licensing support</li>
              <li>Version updates and patch notes included</li>
              <li className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" /> DRM-protected previews
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
