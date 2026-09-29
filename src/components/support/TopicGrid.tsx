import { support } from "@/content/support";
import { Icon } from "@/components/ui/Icon";

/** "Browse by topic": cards that jump to the FAQ. */
export function TopicGrid() {
  const { topics } = support;
  return (
    <section aria-label="Topics" className="flex flex-col gap-8 px-gutter pb-16 sm:pb-25">
      <div className="flex flex-col gap-4.5">
        <span className="eyebrow">{topics.eyebrow}</span>
        <h2 className="type-section">{topics.title}</h2>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {topics.items.map((topic) => (
          <li key={topic.title}>
            <a
              href="#faq"
              className="flex h-full flex-col gap-4.5 rounded-[20px] bg-white p-6 text-ink shadow-ring hover:text-ink"
            >
              <span className="flex items-center justify-between">
                <span className="flex size-12 items-center justify-center rounded-lg bg-sunken">
                  <Icon name={topic.icon} size={22} />
                </span>
                <Icon name="arrow-up-right" size={20} color="#71717A" />
              </span>
              <span className="flex flex-col gap-1">
                <span className="text-xl leading-6.5 font-semibold tracking-[-0.025em]">{topic.title}</span>
                <span className="text-[15px] leading-5.5 text-ink-2">{topic.body}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
