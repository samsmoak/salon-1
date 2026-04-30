import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/about/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { GoldRule } from "@/components/shared/GoldRule";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";
import { HOURS, STUDIO } from "@/lib/constants";

export const metadata = {
  title: "Contact · Selin Hair Studio",
  description: "Visit, call or write to us. 619 S. Washington Street, Old Town Alexandria.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Find Us"
        eyebrow="Contact"
        image="/images/1487412947147-5cebf100ffc2.jpg"
      />

      <section
        data-section="dark"
        className="relative bg-[var(--color-bg)] px-6 py-24 md:px-10 md:py-32"
      >
        <div className="mx-auto grid max-w-[1280px] gap-16 md:grid-cols-2 md:gap-20">
          <div>
            <SectionEyebrow>Studio</SectionEyebrow>
            <h2 className="mt-5 font-display text-4xl italic md:text-5xl">
              {STUDIO.name}.
            </h2>
            <p className="mt-2 font-display text-xl italic text-[var(--color-text-light-muted)]">
              {STUDIO.area}.
            </p>

            <div className="mt-10 space-y-3">
              <a
                href={`tel:${STUDIO.phoneRaw}`}
                className="flex items-center gap-4 text-[var(--color-text-light)] hover:text-[var(--color-gold)]"
              >
                <Phone size={16} className="text-[var(--color-gold)]" />
                <span className="font-display text-xl italic">{STUDIO.phone}</span>
              </a>
              <a
                href={`mailto:${STUDIO.email}`}
                className="flex items-center gap-4 text-[var(--color-text-light)] hover:text-[var(--color-gold)]"
              >
                <Mail size={16} className="text-[var(--color-gold)]" />
                <span className="font-sans">{STUDIO.email}</span>
              </a>
              <p className="flex items-start gap-4 text-[var(--color-text-light)]">
                <MapPin size={16} className="mt-1 text-[var(--color-gold)]" />
                <span className="font-display text-lg italic">
                  {STUDIO.address}
                  <br />
                  {STUDIO.city}, {STUDIO.state} {STUDIO.zip}
                </span>
              </p>
            </div>

            <div className="mt-12">
              <SectionEyebrow>Hours</SectionEyebrow>
              <table className="mt-6 w-full max-w-md">
                <tbody>
                  {HOURS.map((h) => (
                    <tr key={h.day} className="border-b border-[var(--color-border-dark)]">
                      <td className="py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-text-light-muted)]">
                        {h.day}
                      </td>
                      <td
                        className={`py-3 text-right font-display italic ${
                          h.open ? "text-[var(--color-gold)]" : "text-[var(--color-text-light-muted)]"
                        }`}
                      >
                        {h.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <span className="rounded-full border border-[var(--color-gold)] px-4 py-2 font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--color-gold)]">
                Walk-ins Welcome
              </span>
              <span className="rounded-full border border-[var(--color-gold)] px-4 py-2 font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--color-gold)]">
                Appointments Preferred
              </span>
            </div>

            <p className="mt-10 max-w-md text-sm leading-relaxed text-[var(--color-text-light-muted)]">
              {STUDIO.parking}
            </p>

            <div className="mt-10 aspect-[4/3] w-full overflow-hidden border border-[var(--color-border-dark)]">
              <iframe
                title="Selin Hair Studio location"
                src="https://www.google.com/maps?q=619+S+Washington+St+Alexandria+VA+22314&output=embed"
                className="h-full w-full grayscale-[0.5] brightness-90"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="md:sticky md:top-28 md:self-start">
            <SectionEyebrow>Write to us</SectionEyebrow>
            <h2 className="mt-5 font-display text-4xl italic md:text-5xl">
              Tell us a little about your hair.
            </h2>
            <div className="mt-6 mb-10">
              <GoldRule width={60} />
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      <section
        data-section="light"
        className="relative bg-[var(--color-surface-light)] px-6 py-20 md:px-10 md:py-24"
      >
        <div className="mx-auto grid max-w-[1280px] gap-6 md:grid-cols-3">
          {[
            { icon: Phone, label: "Call", value: STUDIO.phone, href: `tel:${STUDIO.phoneRaw}` },
            { icon: Mail, label: "Email", value: STUDIO.email, href: `mailto:${STUDIO.email}` },
            { icon: MapPin, label: "Visit", value: "619 S. Washington St", href: "#" },
          ].map((c) => {
            const Icon = c.icon;
            return (
              <a
                key={c.label}
                href={c.href}
                className="group border border-[var(--color-border-dark)] bg-[var(--color-bg)] p-8 text-[var(--color-text-light)] transition-all hover:-translate-y-1 hover:border-[var(--color-gold)]"
              >
                <Icon size={20} className="text-[var(--color-gold)]" />
                <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.35em] text-[var(--color-gold)]">
                  {c.label}
                </p>
                <p className="mt-3 font-display text-xl italic">{c.value}</p>
              </a>
            );
          })}
        </div>
      </section>
    </>
  );
}
