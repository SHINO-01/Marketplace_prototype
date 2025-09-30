export interface Asset {
  id: string;
  title: string;
  slug: string;
  category: string;
  tags: string[];
  rating: number;
  price: string;
  thumbnail: string;
  description: string;
  creator: {
    name: string;
    avatar: string;
  };
  compatibility: string[];
}

export const mockAssets: Asset[] = [
  {
    id: '1',
    title: 'Nebula Outpost Environment',
    slug: 'nebula-outpost-environment',
    category: '3D Models',
    tags: ['Sci-fi', 'Unreal Engine', 'Modular'],
    rating: 4.8,
    price: '$49',
    thumbnail: 'https://images.unsplash.com/photo-1549923746-1235c1a1a6b6?auto=format&fit=crop&w=800&q=80',
    description: 'Modular sci-fi environment kit optimized for Unreal and Unity with baked lighting presets.',
    creator: {
      name: 'NovaForge Studio',
      avatar: 'https://www.gstatic.com/webp/gallery3/2.png'
    },
    compatibility: ['Unity', 'Unreal Engine', 'Godot']
  },
  {
    id: '2',
    title: 'Arcane UI & HUD Pack',
    slug: 'arcane-ui-hud-pack',
    category: 'UI Kits',
    tags: ['Fantasy', 'RPG', 'UI'],
    rating: 4.7,
    price: '$24',
    thumbnail: 'https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=800&q=80',
    description: 'Stylized RPG user interface kit with animated HUD elements and blueprint-based widgets.',
    creator: {
      name: 'GlyphLabs',
      avatar: 'https://www.gstatic.com/webp/gallery3/4.png'
    },
    compatibility: ['Unity', 'Unreal Engine']
  },
  {
    id: '3',
    title: 'Celestial Atmospheres Audio Pack',
    slug: 'celestial-atmospheres-audio-pack',
    category: 'Audio',
    tags: ['Ambient', 'Cinematic', 'Atmosphere'],
    rating: 4.9,
    price: 'Free',
    thumbnail: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
    description: 'Immersive ambient soundscapes for space, sci-fi, and exploration experiences.',
    creator: {
      name: 'EchoSphere',
      avatar: 'https://www.gstatic.com/webp/gallery3/5.png'
    },
    compatibility: ['WAV', 'MP3', 'OGG']
  }
];
