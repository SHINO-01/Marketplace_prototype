import Link from 'next/link';

const footerLinks = {
  explore: [
    { label: 'Browse Assets', href: '/browse' },
    { label: 'Collections', href: '/collections' },
    { label: 'Trending', href: '/browse?sort=trending' },
    { label: 'New Releases', href: '/browse?sort=new' }
  ],
  creators: [
    { label: 'Creator Hub', href: '/dashboard' },
    { label: 'Upload Asset', href: '/upload' },
    { label: 'Guidelines', href: '/docs/creator-guidelines' },
    { label: 'Payouts', href: '/docs/payouts' }
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
    { label: 'Terms', href: '/legal/terms' }
  ]
};

export function Footer() {
  return (
    <footer className="border-t border-white/20 dark:border-white/10 bg-white/60 dark:bg-slate-900/70 backdrop-blur-xl">
      <div className="container py-16 grid gap-12 md:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="h-11 w-11 rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-glass flex items-center justify-center text-slate-900 font-semibold">
              TH
            </span>
            <span className="text-xl font-semibold gradient-text">TemuHash</span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Discover, share, and monetize world-class game assets with a community of creators and studios worldwide.
          </p>
        </div>

        <FooterColumn title="Explore" links={footerLinks.explore} />
        <FooterColumn title="Creators" links={footerLinks.creators} />
        <FooterColumn title="Company" links={footerLinks.company} />
      </div>
      <div className="border-t border-white/20 dark:border-white/10">
        <div className="container flex flex-col md:flex-row items-center justify-between py-6 gap-3 text-sm text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} TemuHash. Crafted for game creators.</p>
          <div className="flex gap-4">
            <Link href="/legal/privacy" className="hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/legal/cookies" className="hover:text-primary">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

interface FooterColumnProps {
  title: string;
  links: Array<{ label: string; href: string }>;
}

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{title}</h3>
      <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="hover:text-primary">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
