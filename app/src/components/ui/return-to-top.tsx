"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";

import { useSmoothScroll } from "@/components/motion/smooth-scroll-provider";

export function ReturnToTop() {
  const button = useRef<HTMLButtonElement>(null);
  const progress = useRef<SVGCircleElement>(null);
  const lenis = useSmoothScroll();
  const t = useTranslations("Portfolio.navigation");

  useEffect(() => {
    let animationFrame = 0;

    const update = () => {
      animationFrame = 0;

      const scrollTop = window.scrollY;
      const scrollRange = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
      );
      const pageProgress = Math.min(scrollTop / scrollRange, 1);

      if (button.current) {
        button.current.dataset.visible = String(
          scrollTop > window.innerHeight * 0.8,
        );
      }
      if (progress.current) {
        progress.current.style.strokeDashoffset = String(1 - pageProgress);
      }
    };

    const requestUpdate = () => {
      if (!animationFrame) animationFrame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  const returnToTop = () => {
    if (window.location.hash) {
      window.history.replaceState(
        window.history.state,
        "",
        `${window.location.pathname}${window.location.search}`,
      );
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (lenis.current) {
      lenis.current.scrollTo(0, {
        duration: reducedMotion ? 0 : 1.25,
        force: true,
        immediate: reducedMotion,
      });
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <button
      aria-label={t("returnToTop")}
      className="return-to-top"
      data-cursor="link"
      data-visible="false"
      onClick={returnToTop}
      ref={button}
      title={t("returnToTop")}
      type="button"
    >
      <svg aria-hidden="true" viewBox="0 0 44 44">
        <circle className="return-to-top-track" cx="22" cy="22" r="19" />
        <circle
          className="return-to-top-progress"
          cx="22"
          cy="22"
          pathLength="1"
          r="19"
          ref={progress}
        />
        <path
          className="return-to-top-arrow"
          d="M 16 24 L 22 18 L 28 24 M 22 18 L 22 29"
        />
      </svg>
    </button>
  );
}
