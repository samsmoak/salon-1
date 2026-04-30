import { MapPin } from "lucide-react";
import { PageHero } from "@/components/about/PageHero";
import { GoldRule } from "@/components/shared/GoldRule";
import { POLICIES, STUDIO } from "@/lib/constants";

export const metadata = {
  title: "Policies · Selin Hair Studio",
  description: "Booking, cancellation, satisfaction, payment and product policies.",
};

export default function PoliciesPage() {
  return (
    <>
      <PageHero
        title="Studio Policies"
        eyebrow="Studio"
        image="/images/1521590832167-7bcbfaa6381f.jpg"
      />

      {POLICIES.map((p, i) => {
        const light = i % 2 === 0;
        return (
          <section
            key={p.title}
            data-section={light ? "light" : "dark"}
            className={`relative px-6 py-24 md:px-10 md:py-28 ${
              light
                ? "bg-[var(--color-surface-light)] text-[var(--color-text-dark)]"
                : "bg-[var(--color-bg)] text-[var(--color-text-light)]"
            }`}
          >
            <div className="mx-auto grid max-w-[1100px] gap-10 md:grid-cols-[200px_1fr] md:gap-16">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-[var(--color-gold)]">
                  {p.eyebrow}
                </span>
                <p
                  className={`mt-4 font-mono text-3xl ${
                    light ? "text-[var(--color-text-dark)]" : "text-[var(--color-text-light)]"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </p>
              </div>
              <div>
                <h2 className="font-display text-4xl italic leading-[1.05] md:text-5xl">
                  {p.title}
                </h2>
                <div className="my-6">
                  <GoldRule width={60} />
                </div>
                <p
                  className={`max-w-xl text-[17px] leading-relaxed ${
                    light ? "text-[var(--color-text-dark-muted)]" : "text-[var(--color-text-light-muted)]"
                  }`}
                >
                  {p.body}
                </p>
              </div>
            </div>
          </section>
        );
      })}

      <section
        data-section="dark"
        className="relative bg-[var(--color-bg)] px-6 py-24 md:px-10 md:py-32"
      >
        <div className="mx-auto max-w-[1100px]">
          <div className="border border-[var(--color-gold)] bg-[var(--color-surface-elevated)] p-10 md:p-14">
            <div className="flex items-center gap-4 text-[var(--color-gold)]">
              <MapPin size={20} />
              <span className="font-mono text-[10px] uppercase tracking-[0.35em]">Parking</span>
            </div>
            <h3 className="mt-6 font-display text-3xl italic md:text-4xl">Free, easy, and a note.</h3>
            <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-[var(--color-text-light-muted)]">
              {STUDIO.parking}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
