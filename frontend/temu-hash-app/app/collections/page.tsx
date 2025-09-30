import { CuratedCollections } from '@/components/sections/curated-collections';

export default function CollectionsPage() {
  return (
    <div className="container py-12 space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Curated collections</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Handpicked asset bundles for popular genres, engines, and production pipelines.
        </p>
      </header>
      <CuratedCollections />
    </div>
  );
}
