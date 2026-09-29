import { support } from "@/content/support";
import { Texture } from "@/components/phone/Texture";
import { Icon } from "@/components/ui/Icon";
import { Placeholder } from "@/components/ui/Placeholder";

const irisMask = "radial-gradient(ellipse at 100% 0%, #000 20%, rgba(0,0,0,0) 72%)";

/** Right column of the contact section: support email + "Before you write". */
export function ContactAside() {
  return (
    <div className="flex flex-col gap-5">
      <div className="relative flex flex-col gap-3 overflow-hidden rounded-card bg-white p-7 shadow-pro sm:rounded-plan sm:p-8">
        <Texture
          name="iris"
          sizes="260px"
          className="absolute top-0 right-0 h-55 w-65"
          style={{ WebkitMaskImage: irisMask, maskImage: irisMask }}
        />
        <span className="mono-caps relative text-ink-2">{support.emailCard.label}</span>
        <span className="relative text-2xl leading-7.5 font-semibold tracking-[-0.03em] break-words">
          <Placeholder name="supportEmail" />
        </span>
        <span className="relative text-base leading-6 text-ink-2">
          {support.emailCard.replyTime} <Placeholder name="responseTime" />
        </span>
      </div>
      <div className="flex flex-col gap-4 rounded-card bg-canvas p-7 shadow-ring sm:rounded-plan sm:p-8">
        <h2 className="mono-caps text-ink-2">{support.beforeYouWrite.label}</h2>
        <ul className="flex flex-col gap-3">
          {support.beforeYouWrite.items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-base leading-6">
              <span className="mt-px flex size-5.5 shrink-0 items-center justify-center rounded-[7px] bg-ink">
                <Icon name="check" size={13} strokeWidth={2.6} color="#FFFFFF" />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
