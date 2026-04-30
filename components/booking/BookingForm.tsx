"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Scissors, Palette, Sparkles, Wand2, type LucideIcon } from "lucide-react";
import { toast } from "sonner";
import { SERVICES, SERVICE_CATEGORIES, type Service } from "@/lib/constants";

type Booking = {
  category: Service["category"] | null;
  service: string | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  newClient: boolean;
  preferredDay: string;
  preferredTime: string;
  altDay: string;
  altTime: string;
  notes: string;
};

const initial: Booking = {
  category: null,
  service: null,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  newClient: false,
  preferredDay: "",
  preferredTime: "",
  altDay: "",
  altTime: "",
  notes: "",
};

const CAT_ICONS: Record<Service["category"], LucideIcon> = {
  Cuts: Scissors,
  Color: Palette,
  Styling: Sparkles,
  Treatments: Wand2,
};

const CAT_IMAGES: Record<Service["category"], string> = {
  Cuts: "/images/1522337360788-8b13dee7a37e.jpg",
  Color: "/images/1492106087820-71f1a00d2b11.jpg",
  Styling: "/images/1487412947147-5cebf100ffc2.jpg",
  Treatments: "/images/1607701703246-e4a9c9b29b60.jpg",
};

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const TIMES = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
];

const STEPS = ["Service", "Details", "Timing", "Notes", "Confirm"];

export function BookingForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Booking>(initial);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = <K extends keyof Booking>(k: K, v: Booking[K]) => {
    setError(null);
    setData((d) => ({ ...d, [k]: v }));
  };
  const progress = ((step + 1) / STEPS.length) * 100;

  function next() {
    if (step === 0 && !data.category) {
      setError("Please choose a service category to continue.");
      toast.error("Please choose a service category.");
      return;
    }
    if (step === 0 && !data.service) {
      setError("Please select a specific service from the list.");
      toast.error("Please select a service.");
      return;
    }
    if (step === 1 && (!data.firstName || !data.email || !data.phone)) {
      setError("Please fill in your name, phone, and email.");
      toast.error("Please fill in your details.");
      return;
    }
    if (step === 2 && (!data.preferredDay || !data.preferredTime)) {
      setError("Please choose a preferred day and time.");
      toast.error("Please choose a preferred day and time.");
      return;
    }
    setError(null);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }
  
  function back() {
    setError(null);
    setStep((s) => Math.max(s - 1, 0));
  }

  async function submit() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/submit-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({ ok: false, message: "Bad response" }));
      if (res.ok && json.ok) {
        setDone(true);
        toast.success("Booking request received.");
      } else {
        const msg = json?.message || "Something went wrong. Please try again.";
        setError(msg);
        toast.error(msg);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Network error. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-24 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
          className="flex h-24 w-24 items-center justify-center rounded-full border border-[var(--color-gold)] text-[var(--color-gold)]"
        >
          <Check size={36} />
        </motion.div>
        <h3 className="mt-10 font-display text-5xl italic">Request received.</h3>
        <p className="mt-6 max-w-md text-[var(--color-text-light-muted)]">
          We&rsquo;ll confirm your appointment within 24 hours. Watch your email for details.
        </p>
        {data.newClient && data.category === "Color" && (
          <p className="mt-4 max-w-md font-display text-base italic text-[var(--color-gold)]">
            Please email your two-year color history and hair photos to selinhairstudio@gmail.com.
          </p>
        )}
      </motion.div>
    );
  }

  return (
    <div className="relative">
      <div className="mb-10">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-[var(--color-gold)]">
            Step {String(step + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-[var(--color-text-light-muted)]">
            {STEPS[step]}
          </span>
        </div>
        <div className="mt-3 h-px w-full bg-[var(--color-border-dark)]">
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="h-full bg-[var(--color-gold)]"
          />
        </div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mb-6 border-l-2 border-red-400 bg-[rgba(220,80,80,0.08)] px-4 py-3 text-sm text-red-200"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="min-h-[400px]"
        >
          {step === 0 && (
            <Step1
              data={data}
              update={update}
              setData={setData}
            />
          )}
          {step === 1 && <Step2 data={data} update={update} />}
          {step === 2 && <Step3 data={data} update={update} />}
          {step === 3 && <Step4 data={data} update={update} />}
          {step === 4 && <Step5 data={data} />}
        </motion.div>
      </AnimatePresence>

      <div className="mt-12 flex items-center justify-between border-t border-[var(--color-border-dark)] pt-8">
        <button
          type="button"
          onClick={back}
          disabled={step === 0}
          className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--color-text-light-muted)] transition-colors hover:text-[var(--color-gold)] disabled:opacity-30"
        >
          <ArrowLeft size={14} />
          Back
        </button>
        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={next}
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-gold)] px-7 py-3 font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--color-bg)] transition-all hover:bg-[var(--color-gold-light)]"
          >
            Continue
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={submitting}
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-gold)] px-7 py-3 font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--color-bg)] transition-all hover:bg-[var(--color-gold-light)] disabled:opacity-60"
          >
            {submitting ? "Sending..." : "Submit Request"}
            <ArrowRight size={14} />
          </button>
        )}
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="block font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-gold)]">
      {children}
    </span>
  );
}

const fieldClass =
  "w-full bg-transparent border-b border-[var(--color-border-dark)] py-3 px-0 font-sans text-[15px] text-[var(--color-text-light)] outline-none focus:border-[var(--color-gold)] transition-colors placeholder:text-[var(--color-text-light-muted)]";

function Step1({
  data,
  update,
  setData,
}: {
  data: Booking;
  update: <K extends keyof Booking>(k: K, v: Booking[K]) => void;
  setData: React.Dispatch<React.SetStateAction<Booking>>;
}) {
  const selectedService = data.service 
    ? SERVICES.find(s => s.name === data.service)
    : null;

  return (
    <div>
      <h2 className="font-display text-3xl italic md:text-4xl">What brings you in?</h2>
      <p className="mt-3 text-[var(--color-text-light-muted)]">Choose a category, then select a service.</p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICE_CATEGORIES.map((c) => {
          const Icon = CAT_ICONS[c];
          const active = data.category === c;
          return (
            <button
              type="button"
              key={c}
              onClick={() => setData((d) => ({ ...d, category: c, service: null }))}
              style={{
                backgroundImage: `linear-gradient(rgba(10,8,5,0.55), rgba(10,8,5,0.88)), url(${CAT_IMAGES[c]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className={`relative h-44 border text-left transition-all ${
                active ? "border-[var(--color-gold)]" : "border-[var(--color-border-dark)] hover:border-[var(--color-gold)]"
              }`}
            >
              <div className="flex h-full flex-col justify-between p-5 text-[var(--color-text-light)]">
                <Icon size={20} />
                <div>
                  <p className="font-display text-2xl italic">{c}</p>
                  {active && (
                    <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--color-gold)]">
                      Selected
                    </p>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {data.category && (
        <div className="mt-10">
          <div className="flex items-center justify-between">
            <Label>Specific Service</Label>
            {selectedService && (
              <span className="font-mono text-sm text-[var(--color-gold)]">
                {selectedService.price}
              </span>
            )}
          </div>
          <div className="mt-4 grid gap-2">
            {SERVICES.filter((s) => s.category === data.category).map((s) => {
              const active = data.service === s.name;
              return (
                <button
                  type="button"
                  key={s.name}
                  onClick={() => update("service", s.name)}
                  className={`flex items-center justify-between border p-4 text-left transition-all ${
                    active
                      ? "border-[var(--color-gold)] bg-[var(--color-surface-elevated)]"
                      : "border-[var(--color-border-dark)] hover:border-[var(--color-gold)]"
                  }`}
                >
                  <div>
                    <span className="font-serif text-lg text-[var(--color-text-light)]">{s.name}</span>
                    {s.note && (
                      <div className="mt-1 font-display text-sm italic text-[var(--color-text-light-muted)]">
                        {s.note}
                      </div>
                    )}
                  </div>
                  <span className="font-mono text-sm text-[var(--color-gold)]">{s.price}</span>
                </button>
              );
            })}
          </div>
          {!data.service && (
            <p className="mt-4 text-sm text-amber-500/80 font-mono text-[10px] tracking-wide">
              ⚡ Please select a service to continue
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function Step2({ data, update }: { data: Booking; update: <K extends keyof Booking>(k: K, v: Booking[K]) => void }) {
  return (
    <div>
      <h2 className="font-display text-3xl italic md:text-4xl">Your details.</h2>
      <p className="mt-3 text-[var(--color-text-light-muted)]">So we can confirm your visit.</p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <div>
          <Label>First Name</Label>
          <input value={data.firstName} onChange={(e) => update("firstName", e.target.value)} className={fieldClass} />
        </div>
        <div>
          <Label>Last Name</Label>
          <input value={data.lastName} onChange={(e) => update("lastName", e.target.value)} className={fieldClass} />
        </div>
        <div>
          <Label>Phone</Label>
          <input
            value={data.phone}
            onChange={(e) => update("phone", e.target.value)}
            type="tel"
            className={fieldClass}
          />
        </div>
        <div>
          <Label>Email</Label>
          <input
            value={data.email}
            onChange={(e) => update("email", e.target.value)}
            type="email"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="mt-10 flex items-start gap-4">
        <button
          type="button"
          onClick={() => update("newClient", !data.newClient)}
          className={`flex h-6 w-6 shrink-0 items-center justify-center border transition-colors ${
            data.newClient ? "border-[var(--color-gold)] bg-[var(--color-gold)]" : "border-[var(--color-border-dark)]"
          }`}
        >
          {data.newClient && <Check size={14} className="text-[var(--color-bg)]" />}
        </button>
        <div>
          <p className="font-display text-lg italic text-[var(--color-text-light)]">I&rsquo;m a new client.</p>
          <p className="mt-1 text-sm text-[var(--color-text-light-muted)]">
            Welcome — new clients enjoy 20% off their first service. Mention this offer when we confirm.
          </p>
        </div>
      </div>

      {data.newClient && data.category === "Color" && (
        <div className="mt-8 border-l-2 border-[var(--color-gold)] bg-[var(--color-surface-elevated)] p-6">
          <p className="font-display text-base italic text-[var(--color-gold)]">A small request for color clients</p>
          <p className="mt-2 text-sm text-[var(--color-text-light-muted)]">
            Please email your two-year color history along with photos of your current hair and inspiration
            pictures to <span className="text-[var(--color-text-light)]">selinhairstudio@gmail.com</span> after
            submitting this form.
          </p>
        </div>
      )}
    </div>
  );
}

function Step3({ data, update }: { data: Booking; update: <K extends keyof Booking>(k: K, v: Booking[K]) => void }) {
  return (
    <div>
      <h2 className="font-display text-3xl italic md:text-4xl">When works for you?</h2>
      <p className="mt-3 text-[var(--color-text-light-muted)]">Mon–Sat. We&rsquo;re closed Sundays.</p>

      <div className="mt-10 grid gap-8">
        <div>
          <Label>Preferred Day</Label>
          <div className="mt-4 flex flex-wrap gap-2">
            {DAYS.map((d) => (
              <button
                type="button"
                key={d}
                onClick={() => update("preferredDay", d)}
                className={`rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] transition-all ${
                  data.preferredDay === d
                    ? "border-[var(--color-gold)] bg-[var(--color-gold)] text-[var(--color-bg)]"
                    : "border-[var(--color-border-dark)] text-[var(--color-text-light-muted)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
        <div>
          <Label>Preferred Time</Label>
          <div className="mt-4 flex flex-wrap gap-2">
            {TIMES.map((t) => (
              <button
                type="button"
                key={t}
                onClick={() => update("preferredTime", t)}
                className={`rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] transition-all ${
                  data.preferredTime === t
                    ? "border-[var(--color-gold)] bg-[var(--color-gold)] text-[var(--color-bg)]"
                    : "border-[var(--color-border-dark)] text-[var(--color-text-light-muted)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <Label>Alternative Day (optional)</Label>
            <input
              value={data.altDay}
              onChange={(e) => update("altDay", e.target.value)}
              placeholder="e.g. Friday"
              className={fieldClass}
            />
          </div>
          <div>
            <Label>Alternative Time (optional)</Label>
            <input
              value={data.altTime}
              onChange={(e) => update("altTime", e.target.value)}
              placeholder="e.g. 4:00 PM"
              className={fieldClass}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Step4({ data, update }: { data: Booking; update: <K extends keyof Booking>(k: K, v: Booking[K]) => void }) {
  return (
    <div>
      <h2 className="font-display text-3xl italic md:text-4xl">Anything we should know?</h2>
      <p className="mt-3 text-[var(--color-text-light-muted)]">
        Special requests, inspiration notes, a special occasion — tell us about your event.
      </p>
      <div className="mt-10">
        <Label>Notes</Label>
        <textarea
          value={data.notes}
          onChange={(e) => update("notes", e.target.value)}
          rows={6}
          placeholder="Anything we should prepare for..."
          className={`${fieldClass} resize-none`}
        />
      </div>
      <div className="mt-6 border-l-2 border-[var(--color-gold)] bg-[var(--color-surface-elevated)] p-6">
        <p className="font-display text-base italic text-[var(--color-gold)]">For up-do styling and complex color</p>
        <p className="mt-2 text-sm text-[var(--color-text-light-muted)]">
          You can email current hair photos and inspiration pictures to selinhairstudio@gmail.com after booking.
        </p>
      </div>
    </div>
  );
}

function Step5({ data }: { data: Booking }) {
  const selectedService = data.service 
    ? SERVICES.find(s => s.name === data.service)
    : null;
    
  const rows: Array<[string, string]> = [
    ["Service", `${data.category ?? ""} — ${data.service ?? ""}`],
    ["Price", selectedService?.price || "—"],
    ["Name", `${data.firstName} ${data.lastName}`.trim() || "—"],
    ["Phone", data.phone || "—"],
    ["Email", data.email || "—"],
    ["Preferred", `${data.preferredDay} · ${data.preferredTime}`],
    ["Alternative", `${data.altDay} ${data.altTime}`.trim() || "—"],
    ["New Client", data.newClient ? "Yes (20% off first service)" : "No"],
    ["Notes", data.notes || "—"],
  ];
  
  return (
    <div>
      <h2 className="font-display text-3xl italic md:text-4xl">Confirm your request.</h2>
      <p className="mt-3 text-[var(--color-text-light-muted)]">A summary before we send it through.</p>
      <div className="mt-10 divide-y divide-[var(--color-border-dark)] border border-[var(--color-border-dark)] bg-[var(--color-surface-elevated)]">
        {rows.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[140px_1fr] gap-6 px-6 py-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-gold)]">{k}</span>
            <span className={`font-display italic ${k === "Price" ? "text-[var(--color-gold)]" : "text-[var(--color-text-light)]"}`}>
              {v || "—"}
            </span>
          </div>
        ))}
      </div>
      {data.newClient && (
        <div className="mt-6 rounded-sm border border-[var(--color-gold)] bg-[var(--color-surface-elevated)] p-4 text-center">
          <p className="font-display text-sm italic text-[var(--color-gold)]">
            ✨ New client? Mention your 20% discount when we confirm! ✨
          </p>
        </div>
      )}
    </div>
  );
}