import { HeroSection } from '@/components/sections/hero-section';
import { TrendingCarousel } from '@/components/sections/trending-carousel';
import { FeatureGrid } from '@/components/sections/feature-grid';
import { CallToAction } from '@/components/sections/call-to-action';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrendingCarousel />
      <FeatureGrid />
      <CallToAction />
    </>
  );
}
