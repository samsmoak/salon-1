import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/about/PageHero";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export const metadata = {
  title: "Gallery · Selin Hair Studio",
  description: "Color, cuts, styling and treatments — selected work from the studio.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        title="The Gallery"
        eyebrow="Selected Work"
        image="/images/1605497788044-5a32c7078486.jpg"
      />
      <section
        data-section="dark"
        className="relative bg-[var(--color-bg)] px-6 py-24 md:px-10 md:py-32"
      >
        <div className="mx-auto max-w-[1440px]">
          <GalleryGrid />
          <div className="mt-24 flex flex-col items-center text-center">
            <p className="font-display text-3xl italic md:text-4xl">
              Love what you see?
            </p>
            <Link
              href="/book"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--color-gold)] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--color-bg)] transition-all hover:bg-[var(--color-gold-light)]"
            >
              Book Your Appointment
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
