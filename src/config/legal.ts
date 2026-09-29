/**
 * Facts the legal and support pages need but we don't have yet (SPEC §14).
 *
 * Every value is `null` until it is decided. A `null` renders as a blue
 * bracketed tag (e.g. [COMPANY NAME]) through <Placeholder>; a string renders
 * as plain text. Content files reference these keys, never literal values.
 *
 * `npm run check:placeholders` lists the keys that are still null
 * (add `-- --strict` to exit non-zero, e.g. in a release pipeline).
 *
 * This file must stay dependency-free: the check script imports it directly.
 */

export const legalLabels = {
  companyName: "COMPANY NAME",
  companyAddress: "COMPANY ADDRESS",
  privacyEmail: "PRIVACY EMAIL",
  supportEmail: "SUPPORT EMAIL",
  responseTime: "RESPONSE TIME",
  lastUpdated: "DATE",
  analyticsNote: "DESCRIBE ANY ANALYTICS OR CRASH REPORTING, OR REMOVE THIS ROW",
  transcriptionProvider: "TRANSCRIPTION PROVIDER",
  hostingProvider: "HOSTING PROVIDER",
  emailProvider: "EMAIL PROVIDER",
  dataRegion: "REGION",
  transferSafeguards: "ADD TRANSFER SAFEGUARDS IF REQUIRED",
  deletionPath: "DESCRIBE THE DELETION PATH",
  backupPeriod: "BACKUP PERIOD",
  responsePeriod: "RESPONSE PERIOD",
  encryptionNote: "CONFIRM ENCRYPTION AT REST AND ACCESS CONTROLS",
  minimumAge: "MINIMUM AGE",
  priceChangeNotice: "CONFIRM PRICE-CHANGE NOTICE PERIOD",
  regulatedDataPosition: "CONFIRM POSITION ON REGULATED DATA",
  liabilityCap: "AMOUNT",
  appleTermsCheck: "CONFIRM AGAINST APPLE'S CURRENT MINIMUM TERMS FOR APP LICENCES",
  jurisdiction: "JURISDICTION",
  courts: "COURTS",
} as const;

export type LegalKey = keyof typeof legalLabels;

export const legal: Record<LegalKey, string | null> = {
  /** Legal entity that runs Seiton. Privacy 01, 12 · Terms 01, 08, 11, 15 */
  companyName: null,
  /** Postal address. Privacy 12 · Terms 15 */
  companyAddress: null,
  /** Privacy 01, 08, 12 */
  privacyEmail: null,
  /** Terms 15 · Support. Also where /api/support should deliver messages. */
  supportEmail: null,
  /** e.g. "within 2 business days". Support */
  responseTime: null,
  /** e.g. "1 October 2026". Hero line on Privacy and Terms */
  lastUpdated: null,
  /** Privacy 02 "Device and usage" (or remove the row) */
  analyticsNote: null,
  /** Privacy 04 */
  transcriptionProvider: null,
  /** Privacy 05 */
  hostingProvider: null,
  /** Privacy 05 */
  emailProvider: null,
  /** Privacy 06 */
  dataRegion: null,
  /** Privacy 06 */
  transferSafeguards: null,
  /** How to close an account and erase data. Privacy 07 · Terms 09 · Support FAQ */
  deletionPath: null,
  /** Privacy 07 */
  backupPeriod: null,
  /** Privacy 08 */
  responsePeriod: null,
  /** Privacy 09 */
  encryptionNote: null,
  /** Privacy 10 · Terms 02 */
  minimumAge: null,
  /** Terms 05 */
  priceChangeNotice: null,
  /** Terms 10 */
  regulatedDataPosition: null,
  /** Terms 11 */
  liabilityCap: null,
  /** Terms 12 */
  appleTermsCheck: null,
  /** Terms 13 */
  jurisdiction: null,
  /** Terms 13 */
  courts: null,
};
