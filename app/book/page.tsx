import { PageHero } from "@/components/about/PageHero";
import { BookingForm } from "@/components/booking/BookingForm";
import { SectionEyebrow } from "@/components/shared/SectionEyebrow";

export const metadata = {
  title: "Book · Selin Hair Studio",
  description: "Book your appointment at Selin Hair Studio in Old Town Alexandria.",
};

export default function BookPage() {
  return (
    <>
      <PageHero
        title="Book"
        eyebrow="Reserve"
        image="/images/1500840216050-6ffa99d75160.jpg"
      />
      <section
        data-section="dark"
        className="relative bg-[var(--color-bg)] px-6 py-24 md:px-10 md:py-32"
      >
        <div className="mx-auto max-w-3xl">
          <SectionEyebrow>Appointment</SectionEyebrow>
          <h2 className="mt-5 font-display text-4xl italic md:text-5xl">
            A few details to get you in the chair.
          </h2>
          <div className="mt-8 space-y-3 text-[15px] leading-relaxed text-[var(--color-text-light-muted)]">
            <p>
              Complimentary consultations are available for color and treatment services. Walk-ins are
              welcome — appointments preferred.
            </p>
            <p className="font-display text-base italic text-[var(--color-gold)]">
              New clients: remember to mention your 20% off first-visit offer when booking.
            </p>
          </div>

          <div className="mt-16">
            <BookingForm />
          </div>
        </div>
      </section>
    </>
  );
}
