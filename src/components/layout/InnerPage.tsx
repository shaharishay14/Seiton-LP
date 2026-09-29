import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

/**
 * Shell for Privacy, Terms and Support (SPEC §12.1): in-flow header, the
 * page hero slides under it, footer pushed to the bottom.
 */
export function InnerPage({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header variant="inflow" />
      <main className="flex flex-col">{children}</main>
      <Footer className="mt-auto" />
    </div>
  );
}
