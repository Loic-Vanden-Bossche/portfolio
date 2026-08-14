import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type RefObject, useState } from "react";
import { flushSync } from "react-dom";

import { useSmoothScroll } from "@/components/motion/smooth-scroll-provider";
import type { PortfolioMode } from "@/components/portfolio/portfolio-data";

type PortfolioModeState = {
  changeMode: (mode: PortfolioMode) => void;
  isSwitching: boolean;
  mode: PortfolioMode;
  nextMode: PortfolioMode;
};

export function usePortfolioMode(
  stage: RefObject<HTMLDivElement | null>,
  curtain: RefObject<HTMLDivElement | null>,
): PortfolioModeState {
  const smoothScroll = useSmoothScroll();
  const [mode, setMode] = useState<PortfolioMode>("photography");
  const [nextMode, setNextMode] = useState<PortfolioMode>("development");
  const [isSwitching, setIsSwitching] = useState(false);

  function resetToModeStart() {
    smoothScroll.current?.scrollTo(0, { force: true, immediate: true });

    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}`,
      );
    }
  }

  function changeMode(requestedMode: PortfolioMode) {
    if (requestedMode === mode || isSwitching) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion || !stage.current || !curtain.current) {
      resetToModeStart();
      setMode(requestedMode);
      return;
    }

    setNextMode(requestedMode);
    setIsSwitching(true);

    const timeline = gsap.timeline({
      defaults: { ease: "power4.inOut" },
      onComplete: () => setIsSwitching(false),
    });

    timeline
      .set(curtain.current, {
        clipPath: "inset(100% 0% 0% 0%)",
        display: "grid",
      })
      .to(
        stage.current,
        {
          duration: 0.55,
          filter: "blur(14px)",
          opacity: 0,
          scale: 0.985,
          y: -26,
        },
        0,
      )
      .to(
        curtain.current,
        { clipPath: "inset(0% 0% 0% 0%)", duration: 0.72 },
        0,
      )
      .add(() => {
        resetToModeStart();
        flushSync(() => setMode(requestedMode));
        gsap.set(stage.current, {
          filter: "blur(14px)",
          opacity: 0,
          scale: 1.015,
          y: 28,
        });
        ScrollTrigger.refresh();
      })
      .to(curtain.current, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 0.76,
      })
      .to(
        stage.current,
        {
          duration: 0.7,
          filter: "blur(0px)",
          opacity: 1,
          scale: 1,
          y: 0,
        },
        "-=0.58",
      )
      .set(curtain.current, { display: "none" });
  }

  return { changeMode, isSwitching, mode, nextMode };
}
