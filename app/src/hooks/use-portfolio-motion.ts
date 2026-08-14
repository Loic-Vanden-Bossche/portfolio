import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type RefObject, useEffect } from "react";

import type { PortfolioMode } from "@/components/portfolio/portfolio-data";

export function usePortfolioMotion(
  root: RefObject<HTMLDivElement | null>,
  stage: RefObject<HTMLDivElement | null>,
  mode: PortfolioMode,
) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".hero-reveal", {
          duration: 1.1,
          opacity: 0,
          stagger: 0.1,
          y: 30,
          ease: "power3.out",
        });

        if (mode === "development") {
          gsap.to(".scene", {
            yPercent: 14,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 1.2,
            },
          });
        }
      });

      return () => media.revert();
    }, root);

    return () => context.revert();
  }, [mode, root]);

  useEffect(() => {
    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
          gsap.from(element, {
            opacity: 0,
            y: 46,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          });
        });
      });
    }, stage);

    ScrollTrigger.refresh();
    return () => context.revert();
  }, [mode, stage]);
}
