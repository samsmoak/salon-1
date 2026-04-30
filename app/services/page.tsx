import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/about/PageHero";
import { ServiceCard } from "@/components/services/ServiceCard";
import { CategoryNav } from "@/components/services/CategoryNav";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { SERVICES, SERVICE_CATEGORIES, SERVICE_NOTES } from "@/lib/constants";

export const metadata = {
  title: "Services & Pricing · Selin Hair Studio",
  description: "Cuts, color, styling and treatments — full service menu and pricing.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Services"
        eyebrow="The Menu"
        image="/images/1562322140-8baeececf3df.jpg"
      />

      <section
        data-section="dark"
        className="relative bg-[var(--color-bg)] px-6 py-24 md:px-10 md:py-32"
      >
        <div className="mx-auto max-w-[1280px]">
          <div className="mx-auto mb-16 max-w-3xl border border-[var(--color-gold)] bg-[var(--color-surface-elevated)] p-8 md:p-10">
            <SectionEyebrow>Please Note</SectionEyebrow>
            {SERVICE_NOTES.map((n, i) => (
              <p
                key={i}
                className="mt-5 text-[15px] leading-relaxed text-[var(--color-text-light-muted)] first-of-type:mt-5"
              >
                {n}
              </p>
            ))}
          </div>

          <CategoryNav />

          {SERVICE_CATEGORIES.map((cat, ci) => (
            <div
              key={cat}
              id={cat}
              data-category={cat}
              className="scroll-mt-32 pb-20"
            >
              <div className="mb-10 flex items-end justify-between gap-6">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-gold)]">
                    {String(ci + 1).padStart(2, "0")} / {String(SERVICE_CATEGORIES.length).padStart(2, "0")}
                  </span>
                  <h2 className="mt-3 font-display text-5xl italic md:text-6xl">{cat}</h2>
                </div>
                <div className="hidden h-px flex-1 bg-[var(--color-border-dark)] md:block" />
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                {SERVICES.filter((s) => s.category === cat).map((s, i) => (
                  <ServiceCard key={s.name} service={s} index={i} />
                ))}
              </div>

              {cat === "Color" && (
                <div className="mt-10 overflow-hidden rounded-sm bg-[var(--color-gold)]">
                  <div className="px-8 py-6 text-[var(--color-bg)]">
                    <p className="font-mono text-[10px] uppercase tracking-[0.35em]">Welcome Offer</p>
                    <p className="mt-2 font-display text-2xl italic">
                      New clients enjoy 20% off their first service. Mention this offer when booking.
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="border border-[var(--color-border-dark)] bg-[var(--color-surface-elevated)] p-8">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-gold)]">
                Olaplex
              </span>
              <p className="mt-4 font-display text-xl italic text-[var(--color-text-light)]">
                All chemical services include Olaplex No.1.
              </p>
              <p className="mt-2 text-sm text-[var(--color-text-light-muted)]">
                Olaplex No.2 bonding treatment is an additional $50.
              </p>
            </div>
            <div className="border border-[var(--color-border-dark)] bg-[var(--color-surface-elevated)] p-8">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-gold)]">
                New Chemical Clients
              </span>
              <p className="mt-4 font-display text-xl italic text-[var(--color-text-light)]">
                A two-year color history, please.
              </p>
              <p className="mt-2 text-sm text-[var(--color-text-light-muted)]">
                Along with photos of your current hair and inspiration pictures when booking color services.
              </p>
            </div>
          </div>

          <div className="mt-20 flex justify-center">
            <Link
              href="/book"
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-gold)] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--color-bg)] transition-all hover:bg-[var(--color-gold-light)]"
            >
              Book a Complimentary Consultation
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
