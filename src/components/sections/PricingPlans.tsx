"use client";

import { useState } from "react";
import { pricing, siteConfig, type Billing } from "@/config/site";
import { Icon } from "@/components/ui/Icon";
import { Texture } from "@/components/phone/Texture";

const proMask = "radial-gradient(ellipse at 100% 0%, #000 20%, rgba(0,0,0,0) 72%)";

function PlanFeatures({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2.5 text-base">
          <Icon name="check" size={16} strokeWidth={2.4} color="#14855A" className="shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Price({ amount, period }: { amount: string; period: string }) {
  return (
    <div className="flex items-baseline gap-1">
      <span className="text-[48px] leading-12 font-semibold tracking-[-0.05em] sm:text-[56px] sm:leading-14">{amount}</span>
      <span className="text-lg text-ink-3">{period}</span>
    </div>
  );
}

/** Billing toggle + Free / Pro cards. Default billing: yearly. */
export function PricingPlans() {
  const [billing, setBilling] = useState<Billing>(pricing.defaultBilling);
  const pro = pricing.pro.byBilling[billing];
  const { free } = pricing;

  return (
    <>
      <div
        role="group"
        aria-label="Billing"
        className="flex h-11 w-full gap-1 rounded-md bg-sunken p-1 sm:w-auto"
      >
        {pricing.billingOptions.map((option) => {
          const selected = billing === option.value;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={selected}
              onClick={() => setBilling(option.value)}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-[9px] px-3 text-sm sm:px-4.5 font-medium sm:flex-none ${
                selected ? "bg-white text-ink shadow-segment" : "text-ink-2"
              }`}
            >
              {option.label}
              {"badge" in option && (
                <span className="font-mono text-[11px] text-accent-ink">{option.badge}</span>
              )}
            </button>
          );
        })}
      </div>

      <div className="grid w-full max-w-140 gap-4 sm:gap-5 lg:max-w-240 lg:grid-cols-2">
        <div className="flex flex-col gap-6 rounded-card bg-white p-7 shadow-ring sm:rounded-plan sm:p-9">
          <div className="flex flex-col gap-2.5">
            <h3 className="text-[22px] font-semibold tracking-[-0.03em]">{free.name}</h3>
            <Price amount={free.price} period={free.period} />
            <span className="mono-caps text-ink-2">{free.note}</span>
          </div>
          <PlanFeatures items={free.features} />
          <a
            href={siteConfig.appStoreUrl}
            className="mt-auto flex h-13 items-center justify-center rounded-md text-base font-medium shadow-ring-strong"
          >
            {free.cta}
          </a>
        </div>

        <div className="relative flex flex-col gap-6 overflow-hidden rounded-card bg-white p-7 shadow-pro sm:rounded-plan sm:p-9">
          <Texture
            name="iris"
            sizes="300px"
            className="absolute top-0 right-0 h-65 w-75"
            style={{ WebkitMaskImage: proMask, maskImage: proMask }}
          />
          <div className="relative flex flex-col gap-2.5">
            <div className="flex items-center gap-2.5">
              <h3 className="text-[22px] font-semibold tracking-[-0.03em]">{pricing.pro.name}</h3>
              <span className="flex h-5.5 items-center rounded-xs bg-ink px-2">
                <span className="mono-caps mono-10 text-white">{pricing.pro.badge}</span>
              </span>
            </div>
            <div aria-live="polite" className="flex flex-col gap-2.5">
              <Price amount={pro.price} period={pricing.pro.period} />
              <span className="mono-caps text-ink-2">{pro.note}</span>
            </div>
          </div>
          <div className="relative">
            <PlanFeatures items={pricing.pro.features} />
          </div>
          <a
            href={siteConfig.appStoreUrl}
            className="relative mt-auto flex h-13 items-center justify-center gap-2.5 rounded-md bg-ink text-base font-medium text-white"
          >
            <span>{pro.cta}</span>
            <Icon name="arrow-right" size={18} />
          </a>
        </div>
      </div>
    </>
  );
}
