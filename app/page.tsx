import { LandingHero } from "@/components/hero/LandingHero";
import { PhilosophyTeaser } from "@/components/home/PhilosophyTeaser";
import { HorizontalServices } from "@/components/home/HorizontalServices";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { NewClientPromo } from "@/components/home/NewClientPromo";
import { TestimonialsMarquee } from "@/components/home/TestimonialsMarquee";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { CTABanner } from "@/components/home/CTABanner";

export default function Home() {
  return (
    <>
      <LandingHero />
      <PhilosophyTeaser />
      <HorizontalServices />
      <GalleryPreview />
      <NewClientPromo />
      <TestimonialsMarquee />
      <AboutTeaser />
      <CTABanner />
    </>
  );
}
