import { ChevronDown, Filter } from 'lucide-react';

const categories = ['3D Models', 'Textures', 'Audio', 'Shaders', 'Plugins', 'Scenes'];
const engines = ['Unity', 'Unreal Engine', 'Godot', 'Custom'];
const pricing = ['Free', 'Under $20', '$20 - $50', '$50+'];

export function BrowseFilters() {
  return (
    <div className="glass-panel p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-900 dark:text-white">Filters</h2>
        <button className="inline-flex items-center gap-2 text-xs font-semibold text-primary">
          <Filter className="h-4 w-4" />
          Reset all
        </button>
      </header>

      <FilterGroup title="Category" options={categories} />
      <FilterGroup title="Engine" options={engines} />
      <FilterGroup title="Pricing" options={pricing} />
    </div>
  );
}

interface FilterGroupProps {
  title: string;
  options: string[];
}

function FilterGroup({ title, options }: FilterGroupProps) {
  return (
    <div className="space-y-3">
      <button className="flex w-full items-center justify-between text-sm font-semibold text-slate-700 dark:text-slate-200">
        {title}
        <ChevronDown className="h-4 w-4" />
      </button>
      <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
        {options.map((option) => (
          <label key={option} className="flex items-center gap-2">
            <input type="checkbox" className="h-4 w-4 rounded border border-white/40 dark:border-white/10" />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
