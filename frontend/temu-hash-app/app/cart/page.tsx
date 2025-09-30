import Link from 'next/link';
import { mockAssets } from '@/lib/mock-data';
import { Trash2 } from 'lucide-react';

export default function CartPage() {
  return (
    <div className="container py-12 space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Your cart</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Review asset licenses, apply coupons, and proceed to secure checkout.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="space-y-4">
          {mockAssets.map((asset) => (
            <article key={asset.id} className="glass-panel p-4 flex flex-col gap-4 md:flex-row md:items-center">
              <div className="flex-1 space-y-2">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{asset.title}</h2>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  <span>License: Professional</span>
                  <span className="mx-2">•</span>
                  <span>Compatibility: {asset.compatibility.join(', ')}</span>
                </div>
                <Link href={`/asset/${asset.slug}`} className="text-xs font-semibold text-primary">
                  View asset
                </Link>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
                <span className="font-semibold text-slate-900 dark:text-white">{asset.price}</span>
                <button className="inline-flex items-center gap-1 text-xs font-semibold text-rose-500">
                  <Trash2 className="h-4 w-4" />
                  Remove
                </button>
              </div>
            </article>
          ))}
        </section>

        <aside className="glass-panel p-6 space-y-6">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Order summary</h2>
            <div className="text-sm text-slate-600 dark:text-slate-300">
              <p className="flex justify-between">
                <span>Subtotal</span>
                <span>$72.00</span>
              </p>
              <p className="flex justify-between">
                <span>Estimated tax</span>
                <span>$7.20</span>
              </p>
              <p className="flex justify-between font-semibold text-slate-900 dark:text-white">
                <span>Total</span>
                <span>$79.20</span>
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <input
              type="text"
              placeholder="Promo code"
              className="w-full rounded-full border border-white/30 bg-white/70 px-4 py-2 text-sm text-slate-600 shadow-glass dark:border-white/10 dark:bg-white/10 dark:text-slate-200"
            />
            <button className="w-full inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-slate-900 shadow-glass hover:shadow-glass/70">
              Proceed to checkout
            </button>
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
              Payments handled via Stripe & PayPal. VAT/GST calculated automatically.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
