import { Code, PackageSearch, Headphones, Star, ShieldCheck, Users } from 'lucide-react';

const features = [
  {
    title: 'Modular asset categories',
    description: '3D models, textures, audio, shaders, scripts, and scene templates curated by experts.',
    icon: PackageSearch
  },
  {
    title: 'Search & discovery',
    description: 'Full-text search, filters, collections, and semantic recommendations ready for future AI add-ons.',
    icon: Code
  },
  {
    title: 'Flexible licensing',
    description: 'Personal, commercial, studio, and subscription-based licensing with DRM protection.',
    icon: ShieldCheck
  },
  {
    title: 'Rich previews',
    description: 'Image galleries, WebGL viewers, audio demos, and version history with diffing roadmap.',
    icon: Headphones
  },
  {
    title: 'Community-driven',
    description: 'Ratings, reviews, Q&A threads, creator follow system, and curated collections by experts.',
    icon: Users
  },
  {
    title: 'Creator success tools',
    description: 'Analytics dashboards, sales insights, automated tagging, and marketing campaigns.',
    icon: Star
  }
];

export function FeatureGrid() {
  return (
    <section>
      <div className="container space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">Built for creators and studios</h2>
          <p className="text-base text-slate-600 dark:text-slate-300">
            Modular architecture ensures features can evolve without disrupting your production pipelines.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="glass-panel p-6 space-y-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/70 to-secondary/70 text-slate-900 shadow-glass">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{feature.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
