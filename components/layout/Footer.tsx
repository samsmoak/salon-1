import Link from "next/link";
import { Instagram, Facebook } from "lucide-react";
import { STUDIO, NAV_LINKS, HOURS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--color-border-dark)] bg-[var(--color-bg)] pt-20 pb-10">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent" />
      <div className="mx-auto grid max-w-[1440px] gap-14 px-6 md:grid-cols-3 md:px-10">
        <div>
          <Link href="/" className="font-display text-3xl text-[var(--color-text-light)]">
            {STUDIO.shortName}
            <span className="text-[var(--color-gold)]">.</span>
          </Link>
          <p className="mt-6 max-w-xs font-display text-lg italic text-[var(--color-text-light-muted)]">
            Where artistry meets identity.
          </p>
          <div className="mt-8 flex items-center gap-5">
            <a
              href={STUDIO.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-[var(--color-gold)] transition-transform hover:-translate-y-0.5"
            >
              <Instagram size={18} />
            </a>
            <a
              href={STUDIO.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-[var(--color-gold)] transition-transform hover:-translate-y-0.5"
            >
              <Facebook size={18} />
            </a>
            <a
              href={STUDIO.social.yelp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Yelp"
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-gold)]"
            >
              Yelp
            </a>
          </div>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-gold)]">
            Studio
          </p>
          <ul className="mt-6 space-y-3">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-light-muted)] hover:text-[var(--color-text-light)]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/book"
                className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-gold)] hover:text-[var(--color-gold-light)]"
              >
                Book Now
              </Link>
            </li>
          </ul>
          <div className="mt-8 space-y-1.5 text-sm text-[var(--color-text-light-muted)]">
            {HOURS.map((h) => (
              <div key={h.day} className="flex justify-between gap-6 max-w-[260px]">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em]">{h.day}</span>
                <span className={h.open ? "text-[var(--color-text-light)]" : ""}>{h.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-gold)]">
            Visit
          </p>
          <address className="mt-6 not-italic font-display text-xl text-[var(--color-text-light)]">
            619 South Washington Street
            <br />
            Alexandria, VA 22314
          </address>
          <div className="mt-6 space-y-2">
            <a
              href={`tel:${STUDIO.phoneRaw}`}
              className="block font-display text-xl italic text-[var(--color-gold)]"
            >
              {STUDIO.phone}
            </a>
            <a
              href={`mailto:${STUDIO.email}`}
              className="block text-sm text-[var(--color-text-light-muted)] hover:text-[var(--color-text-light)]"
            >
              {STUDIO.email}
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-[1440px] flex-col items-start justify-between gap-3 border-t border-[var(--color-border-dark)] px-6 pt-8 md:flex-row md:items-center md:px-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-light-muted)]">
          © {new Date().getFullYear()} Selin Hair Studio · Old Town Alexandria, VA
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-light-muted)]">
          619 S. Washington Street · {STUDIO.phone}
        </p>
      </div>
    </footer>
  );
}
