import Image from "next/image";
import { PageHero } from "@/components/about/PageHero";
import { StylistCard } from "@/components/about/StylistCard";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { GoldRule } from "@/components/shared/GoldRule";
import { STYLISTS } from "@/lib/constants";

export const metadata = {
  title: "About · Selin Hair Studio",
  description:
    "Founded in Old Town Alexandria in 2010, Selin Hair Studio is built on lasting client relationships and a master craft of color and cut.",
};

const philosophyLines = ["Hair is personal.", "Color is craft.", "Every cut, a conversation."];
const values = [
  { title: "Artistry", body: "Every service is composed, never assembled — a quiet exercise in taste." },
  { title: "Precision", body: "Geometry and proportion guide every cut. Color is measured, never guessed." },
  { title: "Relationship", body: "We build clients for life, not appointments. Your story is our craft." },
  { title: "Excellence", body: "We exceed expectations — visit after visit, year after year." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Our Story"
        eyebrow="About Selin"
        image="/images/1560066984-138dadb4c035.jpg"
      />

      <section
        data-section="light"
        className="relative bg-[var(--color-surface-light)] px-6 py-28 text-[var(--color-text-dark)] md:px-10 md:py-36"
      >
        <div className="mx-auto grid max-w-[1280px] gap-16 md:grid-cols-[1.1fr_0.9fr] md:gap-20">
          <div>
            <SectionEyebrow>Since 2010</SectionEyebrow>
            <h2 className="mt-5 font-display text-4xl italic leading-[1.05] md:text-6xl">
              A studio built on relationships.
            </h2>
            <div className="mt-10 space-y-6 text-[17px] leading-relaxed text-[var(--color-text-dark-muted)]">
              <p>
                Selin Hair Studio opened its doors in Old Town Alexandria in 2010 with a simple
                idea: that the most beautiful hair comes from a relationship between client and
                stylist that lasts decades, not a single appointment.
              </p>
              <p>
                Fifteen years later, that idea is the architecture of the studio. Our master
                stylists build dossiers — not just files. We learn how your hair behaves in August
                humidity and February dryness, how it responds to color over years, what your
                wedding morning looked like, what your retirement haircut should feel like.
              </p>
              <p>
                Our approach to color is unhurried and exacting. We use Olaplex No.1 in every
                chemical service to protect bonds during processing, and we ask new chemical
                clients for a two-year color history with current and inspiration photos. It&rsquo;s
                slower. It&rsquo;s also why our color holds.
              </p>
              <p>
                Above all, we believe a salon should feel like a small refuge in the city — quiet,
                warm, and entirely yours for the time you&rsquo;re here.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden">
              <div className="absolute inset-0 translate-x-3 translate-y-3 border-2 border-[var(--color-gold-deep)]" />
              <Image
                src="/images/1633681926022-84c23e8cb2d6.jpg"
                alt="Studio interior"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        data-section="dark"
        className="relative bg-[var(--color-bg)] px-6 py-32 md:px-10 md:py-44"
      >
        <div className="mx-auto max-w-3xl">
          {philosophyLines.map((line, i) => (
            <div key={line} className={`flex flex-col items-${i % 2 === 0 ? "start" : "end"} gap-6 py-8`}>
              <h3
                className={`font-display text-4xl italic md:text-5xl lg:text-[52px] ${
                  i % 2 === 0 ? "text-left" : "text-right"
                } text-[var(--color-text-light)]`}
              >
                <span className="text-[var(--color-gold)]">&ldquo;</span>
                {line}
                <span className="text-[var(--color-gold)]">&rdquo;</span>
              </h3>
              {i < philosophyLines.length - 1 && <GoldRule width={120} />}
            </div>
          ))}
        </div>
      </section>

      <section
        data-section="light"
        className="relative bg-[var(--color-surface-light)] px-6 py-28 text-[var(--color-text-dark)] md:px-10 md:py-36"
      >
        <div className="mx-auto max-w-[1280px]">
          <div className="text-center">
            <SectionEyebrow align="center">The Stylists</SectionEyebrow>
            <h2 className="mt-5 font-display text-4xl italic md:text-6xl">
              The hands behind the work.
            </h2>
          </div>
          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {STYLISTS.map((s) => (
              <StylistCard key={s.name} {...s} />
            ))}
          </div>
        </div>
      </section>

      <section
        data-section="dark"
        className="relative bg-[var(--color-bg)] px-6 py-28 md:px-10 md:py-36"
      >
        <div className="mx-auto max-w-[1280px]">
          <div className="text-center">
            <SectionEyebrow align="center">Values</SectionEyebrow>
            <h2 className="mt-5 font-display text-4xl italic md:text-5xl">What we hold to.</h2>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="group border border-[var(--color-border-dark)] bg-[var(--color-surface-elevated)] p-8 transition-all hover:-translate-y-1 hover:border-[var(--color-gold)]"
              >
                <div className="h-px w-10 bg-[var(--color-gold)]" />
                <h3 className="mt-6 font-serif text-2xl text-[var(--color-text-light)]">{v.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-light-muted)]">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
