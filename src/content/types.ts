import type { LegalKey } from "@/config/legal";

/** A run of inline text: plain text, a bold run, or a legal placeholder. */
export type Inline = string | { strong: string } | { placeholder: LegalKey; label?: string };

export type Block =
  | { type: "paragraph"; content: Inline[] }
  | { type: "list"; items: Inline[][] }
  /** Definition table: mono label + value per row. */
  | { type: "table"; rows: { label: string; value: Inline[] }[] };

export type LegalSection = {
  /** Anchor id, kept identical to the design reference. */
  id: string;
  number: string;
  title: string;
  blocks: Block[];
};

export type LegalDocument = {
  title: string;
  badge: string;
  /** Meta description. */
  description: string;
  shortVersion: string[];
  sections: LegalSection[];
};
