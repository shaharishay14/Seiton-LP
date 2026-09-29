/**
 * Support form contract, shared by the client form and POST /api/support so
 * both validate the same way.
 */

export const SUPPORT_TOPICS = [
  "Signing in",
  "Projects and limits",
  "Recording",
  "Calendar",
  "Plans and billing",
  "Something else",
] as const;

export const MESSAGE_MIN = 10;
export const MESSAGE_MAX = 5000;

export type SupportField = "email" | "topic" | "message";
export type SupportErrors = Partial<Record<SupportField, string>>;
export type SupportInput = { email: string; topic: string; message: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateSupport(input: Partial<Record<string, unknown>>): {
  data: SupportInput;
  errors: SupportErrors;
} {
  const email = typeof input.email === "string" ? input.email.trim() : "";
  const topic = typeof input.topic === "string" ? input.topic : "";
  const message = typeof input.message === "string" ? input.message.trim() : "";
  const errors: SupportErrors = {};

  if (!email) errors.email = "Enter your email address.";
  else if (email.length > 254 || !EMAIL.test(email))
    errors.email = "Enter a valid email address, like name@company.com.";

  if (!(SUPPORT_TOPICS as readonly string[]).includes(topic)) errors.topic = "Choose a topic.";

  if (!message) errors.message = "Tell us what happened.";
  else if (message.length < MESSAGE_MIN)
    errors.message = `Add a little more detail (at least ${MESSAGE_MIN} characters).`;
  else if (message.length > MESSAGE_MAX)
    errors.message = `Keep your message under ${MESSAGE_MAX.toLocaleString("en-US")} characters.`;

  return { data: { email, topic, message }, errors };
}
