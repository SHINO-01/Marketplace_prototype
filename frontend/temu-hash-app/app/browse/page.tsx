import { AssetGrid } from '@/components/sections/asset-grid';
import { BrowseFilters } from '@/components/sections/browse-filters';

export default function BrowsePage() {
  return (
    <div className="container py-12 space-y-12">
      <header className="space-y-4">
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Browse game assets</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Filter across thousands of AAA-grade assets with versioned releases and multi-engine compatibility.
        </p>
      </header>
      <div className="grid lg:grid-cols-[280px_1fr] gap-8">
        <aside className="space-y-6">
          <BrowseFilters />
        </aside>
        <AssetGrid />
      </div>
    </div>
  );
}
