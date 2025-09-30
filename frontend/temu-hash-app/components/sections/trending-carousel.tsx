"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface TrendingAsset {
  id: string;
  title: string;
  creator: string;
  price: string;
  rating: number;
  imageUrl: string;
  category: string;
}

const trendingAssets: TrendingAsset[] = [
  {
    id: 'cyber-city-pack',
    title: 'Cyber City Modular Pack',
    creator: 'NeonStudio',
    price: '$39',
    rating: 4.9,
    category: '3D Models',
    imageUrl: 'https://www.gstatic.com/webp/gallery3/1.png'
  },
  {
    id: 'terra-textures',
    title: 'Procedural Terrain Textures',
    creator: 'AtlasForge',
    price: '$19',
    rating: 4.8,
    category: 'Textures',
    imageUrl: 'https://www.gstatic.com/webp/gallery3/2.png'
  },
  {
    id: 'void-soundscapes',
    title: 'Void Soundscapes SFX',
    creator: 'EchoSynth',
    price: 'Free',
    rating: 4.7,
    category: 'Audio',
    imageUrl: 'https://www.gstatic.com/webp/gallery3/3.png'
  },
  {
    id: 'aurora-shaders',
    title: 'Aurora Real-Time Shaders',
    creator: 'Spectral Labs',
    price: '$29',
    rating: 4.9,
    category: 'Shaders',
    imageUrl: 'https://www.gstatic.com/webp/gallery3/4.png'
  }
];

export function TrendingCarousel() {
  const [index, setIndex] = useState(0);
  const visibleAssets = useMemo(() => {
    const slideWindow = 3;
    return trendingAssets.slice(index, index + slideWindow);
  }, [index]);

  const canPrev = index > 0;
  const canNext = index < trendingAssets.length - 3;

  return (
    <section className="bg-white/50 dark:bg-slate-900/70 backdrop-blur-xl">
      <div className="container space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Trending assets this week</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Handpicked assets trending with studios building for next-gen platforms.
            </p>
          </div>
          <div className="hidden md:flex gap-3">
            <button
              onClick={() => (canPrev ? setIndex(index - 1) : null)}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/80 text-slate-700 transition hover:shadow-glass dark:border-white/10 dark:bg-white/10 dark:text-slate-200 ${
                !canPrev ? 'opacity-40 cursor-not-allowed' : ''
              }`}
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => (canNext ? setIndex(index + 1) : null)}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/80 text-slate-700 transition hover:shadow-glass dark:border-white/10 dark:bg-white/10 dark:text-slate-200 ${
                !canNext ? 'opacity-40 cursor-not-allowed' : ''
              }`}
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {visibleAssets.map((asset) => (
            <article key={asset.id} className="glass-panel overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={asset.imageUrl}
                  alt={asset.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 350px"
                />
                <span className="absolute top-4 left-4 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-slate-700 shadow-glass">
                  {asset.category}
                </span>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{asset.title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">By {asset.creator}</p>
                  </div>
                  <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary">{asset.price}</span>
                </div>

                <div className="flex items-center gap-1 text-sm text-amber-500">
                  <Star className="h-4 w-4 fill-current" />
                  <span>{asset.rating.toFixed(1)} rating</span>
                </div>

                <Link href={`/asset/${asset.id}`} className="inline-flex items-center text-sm font-semibold text-primary">
                  View asset →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
