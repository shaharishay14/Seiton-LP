import { Tag } from "../parts";

/** Excerpt of the Acme Corp note with its highlight and tags. */
export function NoteCard() {
  return (
    <div className="flex w-[320px] flex-col gap-3 rounded-xl bg-white p-4 shadow-ring">
      <span className="mono-caps mono-10 text-ink-2">Acme Corp · Note</span>
      <span className="text-base leading-6">
        Set up <span className="rounded-[4px] bg-live px-1 py-px">SSO and a sandbox workspace</span> before
        Thursday.
      </span>
      <div className="flex gap-1.5">
        <Tag>#onboarding</Tag>
        <Tag>#q4</Tag>
      </div>
    </div>
  );
}
