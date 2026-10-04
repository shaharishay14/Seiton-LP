import { NextResponse } from "next/server";
import { validateSupport } from "@/lib/support-form";

/**
 * Receives the Support page form. Validates again on the server and returns
 * `{ ok: true }` or `{ ok: false, errors }` (400).
 *
 * It does NOT send anything yet.
 * TODO(support-email): deliver the message to `legal.supportEmail`
 * (src/config/legal.ts) once that address and a mail provider are chosen.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot filled: answer like a success so bots learn nothing.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const { data, errors } = validateSupport(body);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  // Log without the message body or full address.
  console.info("[support] message received", {
    topic: data.topic,
    emailDomain: data.email.split("@")[1],
    length: data.message.length,
  });
  return NextResponse.json({ ok: true });
}
