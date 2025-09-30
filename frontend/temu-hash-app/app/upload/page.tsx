import Link from 'next/link';
import { Layers, Sparkles, UploadCloud } from 'lucide-react';

export default function UploadPage() {
  return (
    <div className="container py-12 space-y-10">
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/70 px-4 py-2 text-xs font-semibold text-slate-600 shadow-glass dark:border-white/10 dark:bg-white/10 dark:text-slate-300">
          <UploadCloud className="h-4 w-4 text-primary" /> Creator workflow
        </div>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Upload and monetize assets</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Drag-and-drop uploads, automatic validation, and guided metadata to get assets live faster.
        </p>
      </header>

      <div className="grid gap-8 xl:grid-cols-[0.7fr_1.3fr]">
        <aside className="glass-panel p-6 space-y-6">
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">Upload requirements</h2>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300 list-disc list-inside">
            <li>Supported formats: FBX, GLTF, WAV, PNG, MP3, Unreal/Unity packages</li>
            <li>Provide at least 3 preview images or clips (watermark optional)</li>
            <li>Include engine compatibility metadata and version history notes</li>
            <li>Licensing tiers: personal, commercial, studio (default templates available)</li>
          </ul>
          <Link href="/docs/creator-guidelines" className="text-sm font-semibold text-primary">
            Review full guidelines →
          </Link>
        </aside>

        <section className="glass-panel p-6 space-y-6">
          <div className="rounded-3xl border border-dashed border-primary/40 bg-white/40 p-10 text-center shadow-inner dark:bg-white/5">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Drag and drop asset files here</p>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Max 10GB per upload • Automatic virus + metadata scanning • Versioning enabled</p>
            <button className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-slate-900 shadow-glass hover:shadow-glass/70">
              <UploadCloud className="h-4 w-4" /> Select files
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/30 bg-white/70 p-4 shadow-glass dark:border-white/10 dark:bg-white/5">
              <div className="flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
                <Sparkles className="h-4 w-4 text-secondary" /> Auto-tagging (roadmap)
              </div>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                Planned integration with metadata extraction and AI suggestions for improved discovery.
              </p>
            </div>
            <div className="rounded-2xl border border-white/30 bg-white/70 p-4 shadow-glass dark:border-white/10 dark:bg-white/5">
              <div className="flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
                <Layers className="h-4 w-4 text-primary" /> Batch publishing
              </div>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                Queue and stage multiple assets for release windows and promotional campaigns.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
