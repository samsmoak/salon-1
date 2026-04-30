"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";

const schema = z.object({
  firstName: z.string().min(2, "Required"),
  lastName: z.string().min(2, "Required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(7, "Valid phone required"),
  subject: z.string().min(2, "Required"),
  message: z.string().min(10, "Tell us a little more"),
});

type FormValues = z.infer<typeof schema>;

function Field({
  label,
  name,
  type = "text",
  register,
  error,
  textarea = false,
}: {
  label: string;
  name: keyof FormValues;
  type?: string;
  register: ReturnType<typeof useForm<FormValues>>["register"];
  error?: string;
  textarea?: boolean;
}) {
  const [focus, setFocus] = useState(false);
  const [val, setVal] = useState("");
  const float = focus || val.length > 0;

  const baseProps = {
    ...register(name, {
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setVal(e.target.value),
    }),
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    className:
      "w-full bg-transparent pt-7 pb-2 px-0 font-sans text-[15px] text-[var(--color-text-light)] outline-none",
  };

  return (
    <div className="relative">
      <label
        className={`pointer-events-none absolute left-0 origin-left transition-all duration-300 ${
          float
            ? "top-1 scale-90 text-[10px] uppercase tracking-[0.3em] text-[var(--color-gold)]"
            : "top-7 text-[15px] text-[var(--color-text-light-muted)]"
        }`}
      >
        {label}
      </label>
      {textarea ? (
        <textarea rows={4} {...(baseProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} />
      ) : (
        <input type={type} {...(baseProps as React.InputHTMLAttributes<HTMLInputElement>)} />
      )}
      <div
        className={`absolute inset-x-0 bottom-0 h-px transition-all ${
          focus ? "bg-[var(--color-gold)] shadow-[0_0_12px_var(--color-gold-glow)]" : "bg-[var(--color-border-dark)]"
        }`}
      />
      {error && <p className="mt-1.5 text-xs text-red-300">{error}</p>}
    </div>
  );
}

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    await new Promise((r) => setTimeout(r, 800));
    console.log("Contact submission:", values);
    toast.success("Message received. We'll be in touch soon.");
    setSent(true);
    reset();
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="flex h-20 w-20 items-center justify-center rounded-full border border-[var(--color-gold)] text-[var(--color-gold)]"
            >
              <Check size={32} />
            </motion.div>
            <h3 className="mt-8 font-display text-3xl italic">Thank you.</h3>
            <p className="mt-3 text-[var(--color-text-light-muted)]">
              We&rsquo;ll be in touch soon.
            </p>
            <button
              onClick={() => setSent(false)}
              className="mt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-gold)]"
            >
              Send another →
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="First Name" name="firstName" register={register} error={errors.firstName?.message} />
              <Field label="Last Name" name="lastName" register={register} error={errors.lastName?.message} />
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Phone" name="phone" type="tel" register={register} error={errors.phone?.message} />
              <Field label="Email" name="email" type="email" register={register} error={errors.email?.message} />
            </div>
            <Field label="Subject" name="subject" register={register} error={errors.subject?.message} />
            <Field label="Message" name="message" register={register} error={errors.message?.message} textarea />

            <button
              disabled={isSubmitting}
              className="group mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-gold)] px-8 py-4 font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--color-bg)] transition-all hover:bg-[var(--color-gold-light)] disabled:opacity-60"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
