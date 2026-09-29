"use client";

import { ChevronDown } from "lucide-react";
import { useId, useRef, useState, type FormEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { support } from "@/content/support";
import {
  SUPPORT_TOPICS,
  validateSupport,
  type SupportErrors,
  type SupportField,
} from "@/lib/support-form";

const FIELD_ORDER: SupportField[] = ["email", "topic", "message"];

const control =
  "w-full rounded-md bg-white px-3.5 text-base text-ink shadow-[inset_0_0_0_1.5px_var(--color-line-strong)] placeholder:text-ink-3 aria-invalid:shadow-[inset_0_0_0_1.5px_var(--color-danger)]";

/**
 * "Write to us" card. Validates on submit, shows inline errors, posts JSON to
 * /api/support (which validates again) and replaces the form with a
 * confirmation. Includes a honeypot field for bots.
 */
export function SupportForm() {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLParagraphElement>(null);
  const [errors, setErrors] = useState<SupportErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "failed">("idle");
  const [sentTo, setSentTo] = useState<string | null>(null);

  const fieldId = (f: string) => `${id}-${f}`;
  const errorId = (f: SupportField) => `${id}-${f}-error`;

  function focusFirstError(errs: SupportErrors) {
    const first = FIELD_ORDER.find((f) => errs[f]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const values = Object.fromEntries(form.entries());
    const { data, errors: found } = validateSupport(values);
    setErrors(found);
    if (Object.keys(found).length) return focusFirstError(found);

    setStatus("sending");
    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, website: values.website ?? "" }),
      });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; errors?: SupportErrors };
      if (res.ok && body.ok) {
        setSentTo(data.email);
        requestAnimationFrame(() => doneRef.current?.focus());
        return;
      }
      if (body.errors) {
        setErrors(body.errors);
        setStatus("idle");
        return focusFirstError(body.errors);
      }
      setStatus("failed");
    } catch {
      setStatus("failed");
    }
  }

  const fieldError = (f: SupportField) =>
    errors[f] ? (
      <p id={errorId(f)} className="text-sm leading-5 text-danger">
        {errors[f]}
      </p>
    ) : null;

  const describedBy = (f: SupportField) => (errors[f] ? errorId(f) : undefined);

  return (
    <div
      id="contact"
      className="flex scroll-mt-6 flex-col gap-5.5 rounded-card bg-white p-7 shadow-ring sm:rounded-plan sm:p-9"
    >
      <div className="flex flex-col gap-2">
        <h2 className="type-legal-h2">{support.form.title}</h2>
        {!sentTo && <p className="text-[17px] leading-6.5 text-ink-2">{support.form.intro}</p>}
      </div>

      {sentTo ? (
        <p
          ref={doneRef}
          tabIndex={-1}
          role="status"
          className="flex items-start gap-3 text-[17px] leading-6.5 text-ink outline-none"
        >
          <span className="mt-px flex size-5.5 shrink-0 items-center justify-center rounded-[7px] bg-ink">
            <Icon name="check" size={13} strokeWidth={2.6} color="#FFFFFF" />
          </span>
          <span>
            Thanks. We&apos;ll reply to <strong className="font-semibold">{sentTo}</strong>.
          </span>
        </p>
      ) : (
        <form ref={formRef} noValidate onSubmit={onSubmit} className="flex flex-col gap-5.5">
          <div className="flex flex-col gap-2">
            <label htmlFor={fieldId("email")} className="mono-caps text-ink-2">
              Email
            </label>
            <input
              id={fieldId("email")}
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              required
              placeholder={support.form.emailPlaceholder}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={describedBy("email")}
              className={`${control} h-12`}
            />
            {fieldError("email")}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor={fieldId("topic")} className="mono-caps text-ink-2">
              Topic
            </label>
            <div className="relative">
              <select
                id={fieldId("topic")}
                name="topic"
                required
                defaultValue={SUPPORT_TOPICS[0]}
                aria-invalid={errors.topic ? true : undefined}
                aria-describedby={describedBy("topic")}
                className={`${control} h-12 appearance-none pr-10`}
              >
                {SUPPORT_TOPICS.map((topic) => (
                  <option key={topic}>{topic}</option>
                ))}
              </select>
              <ChevronDown
                size={18}
                strokeWidth={1.6}
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-ink-3"
              />
            </div>
            {fieldError("topic")}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor={fieldId("message")} className="mono-caps text-ink-2">
              Message
            </label>
            <textarea
              id={fieldId("message")}
              name="message"
              rows={5}
              required
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={describedBy("message")}
              className={`${control} h-[150px] resize-none py-3 leading-6`}
            />
            {fieldError("message")}
          </div>

          {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label htmlFor={fieldId("website")}>Website</label>
            <input id={fieldId("website")} name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="flex h-13 items-center justify-center gap-2.5 rounded-md bg-ink text-base font-medium text-white shadow-button disabled:opacity-70"
          >
            {status === "sending" ? "Sending…" : support.form.submit}
            <Icon name="arrow-right" size={18} />
          </button>
          <p aria-live="polite" className="-mt-2 text-sm text-danger empty:hidden">
            {status === "failed" ? "Something went wrong. Please try again, or email us." : ""}
          </p>
        </form>
      )}
    </div>
  );
}
