"use client";
import React, { useRef } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { cn } from "@/lib/utils";

// jagged "torn paper" edge sweeping down from r=0 (hidden) to r=100 (fully revealed)
function tornClip(r) {
  const j = 5;
  return `polygon(0% 0%, 100% 0%, 100% ${r}%, 84% ${r + j}%, 68% ${r - j}%, 52% ${r + j}%, 36% ${r - j}%, 20% ${r + j}%, 4% ${r - j}%, 0% ${r}%)`;
}

export const StickyScroll = ({
  content,
  contentClassName,
  header,
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0,
    );
    setActiveCard(closestBreakpointIndex);
  });

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
          <AnimatePresence initial={false}>
            <motion.div
              key={activeCard}
              style={{ zIndex: activeCard, filter: "drop-shadow(0 8px 8px rgba(0,0,0,0.35))" }}
              initial={{ clipPath: tornClip(-8) }}
              animate={{ clipPath: tornClip(108) }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              {active.content ?? null}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="process__progress">
          {content.map((_, index) => (
            <span
              key={index}
              className={`process__progress-dash ${index <= activeCard ? "is-active" : ""}`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCard}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="process__caption"
          >
            <h3>{active.title}</h3>
            <p>{active.description}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
