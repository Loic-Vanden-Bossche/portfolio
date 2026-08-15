import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type RefObject, useEffect, useLayoutEffect, useRef } from "react";

import type { PhotoMotionLanguage } from "@/components/portfolio/photo-library";
import {
  atmosphereAccent,
  essayBackground,
} from "@/components/portfolio/photo-style-vars.css";

const motionFrom: Record<
  PhotoMotionLanguage,
  gsap.TweenVars & { clipPath?: string }
> = {
  organic: {
    clipPath: "inset(8% 5% 8% 5% round 42%)",
    rotate: -2,
    scale: 0.92,
  },
  glide: { clipPath: "inset(0 18% 0 0)", xPercent: -12, yPercent: 4 },
  grid: { clipPath: "inset(0 50% 0 50%)", scale: 1.04 },
  track: { clipPath: "inset(0 30% 0 0)", xPercent: 16 },
  horizon: { clipPath: "inset(44% 0 44% 0)", scale: 1.06 },
  focus: { clipPath: "circle(18% at 50% 50%)", scale: 1.08 },
  bloom: { clipPath: "circle(8% at 50% 58%)", rotate: 2, scale: 0.9 },
  orbit: {
    clipPath: "polygon(50% 8%, 82% 28%, 92% 70%, 50% 94%, 12% 72%, 18% 28%)",
    rotate: -7,
    scale: 0.86,
  },
  resonance: { clipPath: "inset(0 48% 0 48%)", scale: 1.03 },
  tableau: {
    clipPath: "inset(10% 8% 10% 8% round 4px)",
    yPercent: 8,
    scale: 0.94,
  },
};

const heroFrom: Record<PhotoMotionLanguage, gsap.TweenVars> = {
  organic: {
    clipPath: "inset(5% 5% 5% 5% round 44% 56% 48% 52%)",
    rotate: -2,
    scale: 0.88,
  },
  glide: {
    clipPath: "polygon(0 0, 62% 0, 92% 100%, 12% 100%)",
    xPercent: 16,
    yPercent: -4,
  },
  grid: { clipPath: "inset(0 48% 0 48%)", scale: 1.06 },
  track: { clipPath: "inset(0 42% 0 0)", xPercent: 24 },
  horizon: { clipPath: "inset(46% 0 46% 0)", scale: 1.08 },
  focus: { clipPath: "circle(4% at 50% 50%)", scale: 1.12 },
  bloom: { clipPath: "circle(3% at 48% 58%)", rotate: 3, scale: 0.86 },
  orbit: {
    clipPath: "polygon(50% 46%, 54% 48%, 54% 53%, 50% 56%, 46% 53%, 46% 48%)",
    rotate: -12,
    scale: 0.82,
  },
  resonance: { clipPath: "inset(0 49% 0 49%)", scaleX: 0.72 },
  tableau: {
    clipPath: "inset(12% 10% 12% 10% round 4px)",
    scale: 0.9,
    yPercent: 9,
  },
};

type StoryMotionOptions = {
  isTransitionEntry: boolean;
  transitionPhase: "covering" | "idle" | "revealing";
};

export function usePhotoStoryMotion(
  root: RefObject<HTMLDivElement | null>,
  motion: PhotoMotionLanguage,
  options: StoryMotionOptions,
) {
  const heroPlayed = useRef(false);

  useLayoutEffect(() => {
    const currentRoot = root.current;
    if (!currentRoot || heroPlayed.current) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const words = currentRoot.querySelectorAll("[data-story-hero-word]");
    const texture = currentRoot.querySelector("[data-story-hero-texture]");
    const icon = currentRoot.querySelector("[data-story-hero-icon]");
    const index = currentRoot.querySelector("[data-story-hero-index]");
    const intro = currentRoot.querySelector("[data-story-hero-intro]");
    const atmosphereWire = currentRoot.querySelector(
      "[data-photo-part='atmosphere-wire']",
    );
    const particles = currentRoot.querySelectorAll(
      "[data-photo-part='atmosphere-particle']",
    );

    if (reducedMotion) {
      heroPlayed.current = true;
      gsap.set([words, texture, icon, index, intro], { clearProps: "all" });
      return;
    }

    const compact = window.matchMedia("(max-width: 720px)").matches;
    const context = gsap.context(() => {
      gsap.set(
        texture,
        options.isTransitionEntry
          ? {
              clipPath: "inset(0% 0% 0% 0% round 28px)",
              opacity: 1,
              rotate: 0,
              scale: 1,
              scaleX: 1,
              xPercent: 0,
              yPercent: 0,
            }
          : { ...heroFrom[motion], opacity: 0.38 },
      );
      gsap.set(words, {
        opacity: 0,
        rotate: motion === "orbit" ? 5 : 0,
        yPercent: compact ? 108 : 118,
      });
      gsap.set(icon, { opacity: 0, rotate: -28, scale: 0.35 });
      gsap.set(index, { opacity: 0, x: compact ? -12 : -28 });
      gsap.set(intro, {
        opacity: 0,
        x: compact ? 0 : motion === "track" ? 62 : 28,
        y: compact ? 22 : 12,
      });
      gsap.set(atmosphereWire, { opacity: 0, scale: 0.92 });
      gsap.set(particles, { opacity: 0, scale: 0 });

      if (
        options.isTransitionEntry &&
        options.transitionPhase !== "revealing"
      ) {
        return;
      }

      heroPlayed.current = true;
      const duration = options.isTransitionEntry ? 0.72 : compact ? 0.88 : 1.08;
      const heroTimeline = gsap.timeline({
        defaults: { ease: "power4.out" },
      });

      if (!options.isTransitionEntry) {
        heroTimeline.to(
          texture,
          {
            clipPath: "inset(0% 0% 0% 0% round 28px)",
            duration,
            opacity: 1,
            rotate: 0,
            scale: 1,
            scaleX: 1,
            xPercent: 0,
            yPercent: 0,
          },
          0,
        );
      }

      heroTimeline
        .to(icon, { duration: 0.62, opacity: 1, rotate: 0, scale: 1 }, 0.08)
        .to(index, { duration: 0.5, opacity: 1, x: 0 }, 0.14)
        .to(
          words,
          {
            duration: compact ? 0.62 : 0.78,
            opacity: 1,
            rotate: 0,
            stagger: 0.065,
            yPercent: 0,
          },
          0.16,
        )
        .to(intro, { duration: 0.62, opacity: 1, x: 0, y: 0 }, 0.32)
        .to(atmosphereWire, { duration: 0.8, opacity: 1, scale: 1 }, 0.1)
        .to(
          particles,
          {
            duration: 0.45,
            opacity: 1,
            scale: 1,
            stagger: { amount: compact ? 0.15 : 0.32, from: "random" },
          },
          0.2,
        );
    }, currentRoot);

    return () => context.revert();
  }, [motion, options.isTransitionEntry, options.transitionPhase, root]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!root.current) return;

    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add(
        "(prefers-reduced-motion: no-preference) and (min-width: 721px)",
        () => {
          gsap.utils
            .toArray<HTMLElement>("[data-story-chapter]")
            .forEach((chapter, index) => {
              const frame =
                chapter.querySelector<HTMLElement>("[data-story-frame]");
              const image =
                chapter.querySelector<HTMLElement>("[data-story-image]");
              const copy =
                chapter.querySelector<HTMLElement>("[data-story-copy]");
              if (!frame || !image || !copy) return;

              gsap.fromTo(
                frame,
                { ...motionFrom[motion], opacity: 0.25 },
                {
                  clipPath: "inset(0% 0% 0% 0% round 0px)",
                  ease: "none",
                  opacity: 1,
                  rotate: 0,
                  scale: 1,
                  scrollTrigger: {
                    end: "center 48%",
                    scrub: 0.55,
                    start: "top 92%",
                    trigger: chapter,
                  },
                  xPercent: 0,
                  yPercent: 0,
                },
              );

              gsap.from(copy, {
                ease: "power3.out",
                opacity: 0,
                scrollTrigger: {
                  start: "top 68%",
                  toggleActions: "play none none reverse",
                  trigger: chapter,
                },
                x: index % 2 === 0 ? 34 : -34,
                y: 16,
              });

              gsap.to(image, {
                ease: "none",
                scale: motion === "focus" ? 1.035 : 1.08,
                scrollTrigger: {
                  end: "bottom top",
                  scrub: 0.8,
                  start: "top bottom",
                  trigger: chapter,
                },
                yPercent: index % 2 === 0 ? -3 : 3,
              });
            });
        },
      );

      gsap.utils
        .toArray<HTMLElement>("[data-story-chapter]")
        .forEach((chapter) => {
          const accent = chapter.dataset.storyAccent;
          const background = chapter.dataset.storyBackground;
          const applyAtmosphere = () => {
            if (!root.current || !accent || !background) return;
            root.current.style.setProperty(atmosphereAccent, accent);
            root.current.style.setProperty(essayBackground, background);
          };
          ScrollTrigger.create({
            end: "bottom 45%",
            onEnter: applyAtmosphere,
            onEnterBack: applyAtmosphere,
            start: "top 55%",
            trigger: chapter,
          });
        });
    }, root);

    requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      media.revert();
      context.revert();
    };
  }, [motion, root]);
}
