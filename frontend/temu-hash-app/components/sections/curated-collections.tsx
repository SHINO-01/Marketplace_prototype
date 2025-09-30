import Image from 'next/image';
import Link from 'next/link';

const collections = [
  {
    id: 'neo-noir',
    title: 'Neo-Noir Cityscapes',
    description: 'Dynamic city builders, volumetric lighting, synthwave audio packs, and UI overlays.',
    image: 'https://images.unsplash.com/photo-1526401485004-46910ecc8e51?auto=format&fit=crop&w=900&q=80',
    items: 42
  },
  {
    id: 'fantasy-realms',
    title: 'Fantasy Realms Essentials',
    description: 'High-fidelity character kits, spell FX, orchestral soundtracks, and mystical HUDs.',
    image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80',
    items: 58
  },
  {
    id: 'mecha-legion',
    title: 'Mecha Legion Toolkit',
    description: 'Animated mech rigs, hard-surface textures, particle FX, and battle-ready audio.',
    image: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80',
    items: 37
  }
];

export function CuratedCollections() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {collections.map((collection) => (
        <article key={collection.id} className="glass-panel overflow-hidden group">
          <div className="relative h-48">
            <Image src={collection.image} alt={collection.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <span className="text-xs uppercase tracking-wide">{collection.items} assets</span>
              <h3 className="text-lg font-semibold">{collection.title}</h3>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-sm text-slate-600 dark:text-slate-300">{collection.description}</p>
            <Link href={`/collections/${collection.id}`} className="text-sm font-semibold text-primary">
              View collection →
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
