import { features } from "@/config/site";
import { CheckList } from "@/components/ui/CheckList";
import { featureVisuals } from "./FeatureVisuals";

/**
 * Four alternating rows: 480px text column + 640 × 640 visual panel at 1440.
 * Below 1024px rows stack with the text first.
 */
export function Features() {
  return (
    <section
      id="features"
      aria-label="Features"
      className="features-y flex flex-col gap-[clamp(80px,9.7223vw,140px)] px-gutter"
    >
      {features.map((feature, index) => {
        const Visual = featureVisuals[feature.id];
        const visualFirst = index % 2 === 1;
        return (
          <div
            key={feature.id}
            className={`grid items-center gap-8 sm:gap-10 lg:gap-[clamp(40px,5.56vw,80px)] ${
              visualFirst
                ? "lg:grid-cols-[minmax(0,640fr)_minmax(0,480fr)]"
                : "lg:grid-cols-[minmax(0,480fr)_minmax(0,640fr)]"
            }`}
          >
            <div
              className={`flex max-w-120 flex-col gap-4.5 sm:gap-5.5 ${visualFirst ? "lg:col-start-2 lg:row-start-1" : ""}`}
            >
              <span className="eyebrow max-sm:text-xs">{feature.eyebrow}</span>
              <h2 className="type-feature">
                {feature.titleLines[0]}
                <br />
                {feature.titleLines[1]}
              </h2>
              <p className="type-body-lg text-ink-2">{feature.body}</p>
              <CheckList items={feature.bullets} />
              {feature.pill && (
                <span className="inline-flex items-center self-start rounded-[7px] bg-accent-soft px-2.5 py-1.5">
                  <span className="mono-caps text-accent-ink">{feature.pill}</span>
                </span>
              )}
            </div>
            <div className={`w-full max-w-160 ${visualFirst ? "lg:col-start-1 lg:row-start-1" : ""}`}>
              <Visual />
            </div>
          </div>
        );
      })}
    </section>
  );
}
