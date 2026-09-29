import { Fragment } from "react";
import type { Inline } from "@/content/types";
import { Placeholder } from "./Placeholder";

/** Renders typed inline runs: text, bold runs and legal placeholders. */
export function RichText({ content }: { content: readonly Inline[] }) {
  return (
    <>
      {content.map((run, i) => {
        if (typeof run === "string") return <Fragment key={i}>{run}</Fragment>;
        if ("strong" in run)
          return (
            <strong key={i} className="font-semibold text-ink">
              {run.strong}
            </strong>
          );
        return <Placeholder key={i} name={run.placeholder} label={run.label} />;
      })}
    </>
  );
}
