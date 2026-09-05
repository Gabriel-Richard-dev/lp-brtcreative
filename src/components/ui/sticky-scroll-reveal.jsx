import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export const StickyScroll = ({
  content,
  contentClassName,
  header,
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const [prevCard, setPrevCard] = useState(null);
  const activeRef = useRef(0);
  const ref = useRef(null);
  const cardLength = content.length;

  useEffect(() => {
    // discrete bands instead of a continuous scroll-position computation —
    // each trigger only fires when scroll actually crosses its boundary,
    // instead of recalculating "closest breakpoint" on every scroll pixel
    const triggers = content.map((_, i) =>
      ScrollTrigger.create({
        trigger: ref.current,
        start: `${(i / cardLength) * 100}% top`,
        end: `${((i + 1) / cardLength) * 100}% top`,
        onToggle: (self) => {
          if (!self.isActive || activeRef.current === i) return;
          setPrevCard(activeRef.current);
          activeRef.current = i;
          setActiveCard(i);
        },
      }),
    );
    return () => triggers.forEach((t) => t.kill());
  }, [cardLength]);

  const active = content[activeCard];

  return (
    <div className="relative min-h-[800vh]" ref={ref}>
      <div className="flex flex-col items-center gap-6 sticky top-16">
        {header}
        <div
          className={cn(
            "relative mx-auto w-full max-w-sm overflow-hidden rounded-md bg-white",
            contentClassName,
          )}
        >
          {/* true crossfade: the outgoing card stays put underneath while the
              incoming one dissolves in on top, then unmounts itself — no JS
              per-frame work, just two overlapping CSS opacity transitions */}
          {prevCard !== null && prevCard !== activeCard && (
            <div className="absolute inset-0">{content[prevCard].content ?? null}</div>
          )}
          <div
            key={activeCard}
            className="absolute inset-0 process__step"
            onAnimationEnd={() => setPrevCard(null)}
          >
            {active.content ?? null}
          </div>
        </div>

        <div className="process__progress">
          {content.map((_, index) => (
            <span
              key={index}
              className={`process__progress-dash ${index <= activeCard ? "is-active" : ""}`}
            />
          ))}
        </div>

        <div key={activeCard} className="process__caption process__caption--in">
          <h3>{active.title}</h3>
        </div>
      </div>
    </div>
  );
};
