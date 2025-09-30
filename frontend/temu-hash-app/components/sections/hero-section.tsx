import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Layers, Rocket } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="container grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/40 dark:border-white/10 bg-white/70 dark:bg-white/10 px-4 py-2 text-sm shadow-glass">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-slate-700 dark:text-slate-200">Discover high-fidelity assets curated for your next game</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Unlock stunning <span className="gradient-text">game worlds</span> with assets crafted by top creators.
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
            TemuHash brings together premium 3D models, textures, audio, shaders, and more. Build faster with versioned assets,
            flexible licensing, and a thriving creator community.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/browse"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary px-8 py-3 text-sm font-semibold text-slate-900 shadow-glass hover:shadow-glass/70"
            >
              Explore Marketplace
            </Link>
            <Link
              href="/upload"
              className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/70 px-8 py-3 text-sm font-semibold text-slate-700 shadow-glass transition hover:border-primary/40 hover:text-primary dark:border-white/10 dark:bg-white/10 dark:text-slate-200"
            >
              Become a Creator
            </Link>
          </div>

          <dl className="grid gap-6 md:grid-cols-3">
            <Highlight title="40k+" description="Curated assets" />
            <Highlight title="Top 1%" description="Creator talent" />
            <Highlight title="120+" description="Supported formats" />
          </dl>
        </div>

        <div className="relative">
          <div className="absolute -top-10 -right-12 h-72 w-72 rounded-full bg-primary/30 blur-3xl" aria-hidden />
          <div className="glass-panel p-6 space-y-6">
            <div className="relative h-60 w-full overflow-hidden rounded-2xl">
              <Image
                src="https://www.gstatic.com/webp/gallery3/1.png"
                alt="Futuristic sci-fi environment"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 500px"
                priority
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                <Layers className="h-4 w-4 text-primary" />
                <span>Modular asset packs with version control</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                <Rocket className="h-4 w-4 text-secondary" />
                <span>Optimized for Unity, Unreal, Godot, and custom engines</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface HighlightProps {
  title: string;
  description: string;
}

function Highlight({ title, description }: HighlightProps) {
  return (
    <div className="glass-panel p-4 text-center">
      <dt className="text-2xl font-semibold text-slate-900 dark:text-white">{title}</dt>
      <dd className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{description}</dd>
    </div>
  );
}
