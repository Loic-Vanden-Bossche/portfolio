import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type RefObject, useEffect } from "react";

import {
  atmosphereAccent,
  essayAccent,
} from "@/components/portfolio/photo-style-vars.css";

function getCustomProperty(variableReference: string) {
  return variableReference.slice(4, -1);
}

const essayAccentProperty = getCustomProperty(essayAccent);
const atmosphereAccentProperty = getCustomProperty(atmosphereAccent);

function scrollReveal(trigger: HTMLElement) {
  return {
    scrollTrigger: {
      trigger,
      start: "top 82%",
      once: true,
    },
  };
}

export function usePhotoEssayMotion(root: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const enableDepthMotion = window.matchMedia(
          "(min-width: 900px) and (pointer: fine)",
        ).matches;
        const chapters = gsap.utils.toArray<HTMLElement>(
          '[data-photo-part="chapter"]',
        );
        const progressMarks = gsap.utils.toArray<HTMLElement>(
          '[data-photo-part="progress-mark"]',
        );
        const atmosphere = root.current?.querySelector<HTMLElement>(
          '[data-photo-part="atmosphere"]',
        );
        const atmosphereGlows = gsap.utils.toArray<HTMLElement>(
          '[data-photo-part="atmosphere-glow"]',
        );
        const atmosphereParticles = gsap.utils.toArray<HTMLElement>(
          '[data-photo-part="atmosphere-particle"]',
        );
        const atmosphereWire = root.current?.querySelector<SVGSVGElement>(
          '[data-photo-part="atmosphere-wire"]',
        );
        const atmosphereWireEnergy =
          root.current?.querySelector<SVGPathElement>(
            '[data-photo-part="atmosphere-wire-energy"]',
          );

        chapters.forEach((chapter, index) => {
          const frame = chapter.querySelector<HTMLElement>(
            '[data-photo-part="frame"]',
          );
          const image = chapter.querySelector<HTMLElement>(
            '[data-photo-part="image"]',
          );
          const copy = chapter.querySelector<HTMLElement>(
            '[data-photo-part="copy"]',
          );
          const title = chapter.querySelector<HTMLElement>(
            '[data-photo-part="title"]',
          );
          const number = chapter.querySelector<HTMLElement>(
            '[data-photo-part="number"]',
          );
          const rule = chapter.querySelector<HTMLElement>(
            '[data-photo-part="rule"]',
          );
          const animation = chapter.dataset.photoAnimation;

          if (!frame || !image || !copy || !title || !number) return;

          const applyTheme = () => {
            const accent = chapter.dataset.photoAccent ?? "#c8f06a";
            const background = chapter.dataset.photoBackground ?? "#07120d";

            gsap.set(root.current, {
              [essayAccentProperty]: accent,
            });
            if (atmosphere) {
              gsap.to(atmosphere, {
                [atmosphereAccentProperty]: accent,
                backgroundColor: background,
                duration: 1.05,
                ease: "power2.inOut",
                overwrite: "auto",
              });
            }
            gsap.to(atmosphereGlows, {
              opacity: (glowIndex) => (glowIndex === 0 ? 1 : 0.45),
              scale: (glowIndex) =>
                glowIndex === 0
                  ? 0.88 + (index % 4) * 0.08
                  : 0.72 + (index % 3) * 0.1,
              xPercent: (glowIndex) =>
                glowIndex === 0
                  ? ((index * 17) % 38) - 19
                  : ((index * 23) % 32) - 16,
              yPercent: (glowIndex) =>
                glowIndex === 0
                  ? ((index * 13) % 28) - 14
                  : ((index * 19) % 30) - 15,
              duration: 1.35,
              ease: "power3.inOut",
              overwrite: "auto",
            });
            gsap.to(atmosphereParticles, {
              x: (particleIndex) =>
                ((particleIndex * 31 + index * 47) % 150) - 75,
              y: (particleIndex) =>
                ((particleIndex * 19 + index * 37) % 110) - 55,
              scale: (particleIndex) =>
                0.7 + ((particleIndex + index) % 5) * 0.18,
              opacity: (particleIndex) =>
                0.24 + ((particleIndex + index) % 4) * 0.14,
              duration: 1.3,
              stagger: 0.012,
              ease: "power2.inOut",
              overwrite: "auto",
            });
            if (atmosphereWire) {
              gsap.to(atmosphereWire, {
                rotation: -7 + (index % 5) * 3.5,
                scale: 0.96 + (index % 3) * 0.04,
                xPercent: ((index * 11) % 18) - 9,
                yPercent: ((index * 7) % 14) - 7,
                duration: 1.4,
                ease: "power3.inOut",
                overwrite: "auto",
              });
            }
            if (atmosphereWireEnergy) {
              gsap.fromTo(
                atmosphereWireEnergy,
                { strokeDashoffset: 1 },
                {
                  strokeDashoffset: 0,
                  duration: 1.35,
                  ease: "power2.out",
                  overwrite: true,
                },
              );
            }
            gsap.to(progressMarks, {
              opacity: (markIndex) => (markIndex === index ? 1 : 0.24),
              scale: (markIndex) => (markIndex === index ? 1.8 : 1),
              duration: 0.35,
            });
          };

          ScrollTrigger.create({
            trigger: chapter,
            start: "top 55%",
            end: "bottom 45%",
            onEnter: applyTheme,
            onEnterBack: applyTheme,
          });

          if (animation === "horizon") {
            gsap.from(frame, {
              clipPath: "inset(0% 100% 0% 0%)",
              duration: 1.45,
              ease: "power4.inOut",
              ...scrollReveal(chapter),
            });
            if (enableDepthMotion) {
              gsap.fromTo(
                image,
                { scale: 1.2, xPercent: -4 },
                {
                  scale: 1,
                  xPercent: 4,
                  ease: "none",
                  scrollTrigger: {
                    trigger: chapter,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.1,
                  },
                },
              );
            }
            gsap.from(title, {
              yPercent: 120,
              duration: 1,
              ease: "power3.out",
              ...scrollReveal(chapter),
            });
          }

          if (animation === "focus") {
            const aura = chapter.querySelector<HTMLElement>(
              '[data-photo-part="botanical-aura"]',
            );
            const pollen = chapter.querySelectorAll<HTMLElement>(
              '[data-photo-part="pollen"]',
            );

            gsap.from(frame, {
              opacity: 0,
              rotation: -4,
              scale: 0.9,
              y: 100,
              duration: 1.4,
              ease: "expo.out",
              ...scrollReveal(chapter),
            });
            gsap.from(copy, {
              x: -90,
              opacity: 0,
              duration: 1.05,
              ease: "power3.out",
              ...scrollReveal(chapter),
            });
            if (enableDepthMotion) {
              gsap.to(image, {
                yPercent: -9,
                ease: "none",
                scrollTrigger: {
                  trigger: chapter,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1.4,
                },
              });
            }
            if (aura) {
              const atmosphere = gsap.timeline({
                ...scrollReveal(chapter),
              });

              atmosphere
                .from(aura, {
                  opacity: 0,
                  rotation: -75,
                  scale: 0.35,
                  duration: 1.3,
                  ease: "expo.out",
                })
                .from(
                  pollen,
                  {
                    opacity: 0,
                    scale: 0.15,
                    x: (particleIndex) => (particleIndex - 2) * -18,
                    y: 34,
                    duration: 0.85,
                    stagger: 0.09,
                    ease: "back.out(2)",
                  },
                  "<0.12",
                )
                .to(
                  pollen,
                  {
                    opacity: 0.2,
                    x: (particleIndex) => (particleIndex - 2) * 20,
                    y: -46,
                    duration: 1.1,
                    stagger: 0.08,
                    ease: "power1.out",
                  },
                  "-=0.35",
                );
            }
          }

          if (animation === "glide") {
            gsap.from(frame, {
              clipPath: "inset(0% 0% 0% 100%)",
              xPercent: -14,
              duration: 1.35,
              ease: "power4.inOut",
              ...scrollReveal(chapter),
            });
            gsap.from(title, {
              xPercent: 45,
              opacity: 0,
              duration: 1.2,
              ease: "power3.out",
              ...scrollReveal(chapter),
            });
            if (rule) {
              gsap.from(rule, {
                scaleX: 0,
                transformOrigin: "left center",
                duration: 1.5,
                ease: "expo.out",
                ...scrollReveal(chapter),
              });
            }
          }

          if (animation === "summit") {
            if (enableDepthMotion) {
              gsap.fromTo(
                frame,
                { clipPath: "inset(46% 0% 46% 0%)" },
                {
                  clipPath: "inset(0% 0% 0% 0%)",
                  ease: "none",
                  scrollTrigger: {
                    trigger: chapter,
                    start: "top 88%",
                    end: "center 52%",
                    scrub: 1,
                  },
                },
              );
              gsap.fromTo(
                image,
                { scale: 1.06, yPercent: 2.5 },
                {
                  scale: 1,
                  yPercent: -2.5,
                  ease: "none",
                  scrollTrigger: {
                    trigger: chapter,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.2,
                  },
                },
              );
            } else {
              gsap.from(frame, {
                opacity: 0,
                scaleY: 0.92,
                duration: 1,
                ease: "power3.out",
                ...scrollReveal(chapter),
              });
            }
            gsap.from(copy, {
              opacity: 0,
              yPercent: 42,
              duration: 1.15,
              ease: "power3.out",
              ...scrollReveal(chapter),
            });
          }

          if (animation === "perspective") {
            const timeRings = chapter.querySelectorAll<HTMLElement>(
              '[data-photo-part="time-ring"]',
            );
            const timeHand = chapter.querySelector<HTMLElement>(
              '[data-photo-part="time-hand"]',
            );
            const timeCenter = chapter.querySelector<HTMLElement>(
              '[data-photo-part="time-center"]',
            );

            gsap.from(frame, {
              opacity: 0,
              y: 48,
              duration: 1.25,
              ease: "power3.out",
              ...scrollReveal(chapter),
            });
            if (enableDepthMotion) {
              gsap.fromTo(
                image,
                { scale: 1.035, yPercent: 2 },
                {
                  scale: 1,
                  yPercent: -2,
                  ease: "none",
                  scrollTrigger: {
                    trigger: chapter,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.1,
                  },
                },
              );
            }
            gsap.from(number, {
              opacity: 0,
              y: 24,
              scale: 0.86,
              duration: 0.9,
              ease: "back.out(1.4)",
              ...scrollReveal(chapter),
            });
            if (timeHand && timeCenter) {
              const clockwork = gsap.timeline({
                ...scrollReveal(chapter),
              });

              clockwork
                .from(timeRings, {
                  opacity: 0,
                  rotation: (ringIndex) => (ringIndex === 0 ? -110 : 95),
                  scale: 0.45,
                  duration: 1.35,
                  stagger: 0.12,
                  ease: "expo.out",
                })
                .from(
                  timeHand,
                  {
                    opacity: 0,
                    rotation: -210,
                    scaleY: 0,
                    duration: 1.15,
                    ease: "back.out(1.7)",
                  },
                  "<0.18",
                )
                .from(
                  timeCenter,
                  {
                    opacity: 0,
                    scale: 3.2,
                    duration: 0.7,
                    ease: "expo.out",
                  },
                  "-=0.7",
                );
            }
          }

          if (animation === "arrival") {
            gsap.fromTo(
              frame,
              {
                clipPath: "polygon(100% 0%, 100% 0%, 72% 100%, 72% 100%)",
                skewX: -9,
                xPercent: 22,
              },
              {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                skewX: 0,
                xPercent: 0,
                duration: 1.55,
                ease: "power4.inOut",
                ...scrollReveal(chapter),
              },
            );
            gsap.fromTo(
              image,
              { scale: 1.16, xPercent: 9 },
              {
                scale: 1,
                xPercent: 0,
                duration: 1.7,
                ease: "power3.out",
                ...scrollReveal(chapter),
              },
            );
            gsap.from(copy, {
              opacity: 0,
              xPercent: -35,
              duration: 1.2,
              ease: "circ.out",
              ...scrollReveal(chapter),
            });
          }

          if (animation === "orbit") {
            if (enableDepthMotion) {
              gsap.fromTo(
                frame,
                { clipPath: "circle(0% at 50% 50%)", rotation: -18 },
                {
                  clipPath: "circle(72% at 50% 50%)",
                  rotation: 0,
                  ease: "none",
                  scrollTrigger: {
                    trigger: chapter,
                    start: "top 92%",
                    end: "center 45%",
                    scrub: 1.15,
                  },
                },
              );
              gsap.fromTo(
                image,
                { rotation: 13, scale: 1.25 },
                {
                  rotation: 0,
                  scale: 1,
                  ease: "none",
                  scrollTrigger: {
                    trigger: chapter,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.2,
                  },
                },
              );
            } else {
              gsap.from(frame, {
                opacity: 0,
                scale: 0.94,
                duration: 1.05,
                ease: "power3.out",
                ...scrollReveal(chapter),
              });
            }
          }

          if (animation === "shutters") {
            const shutters = chapter.querySelectorAll<HTMLElement>(
              '[data-photo-part="shutter"]',
            );
            gsap.to(shutters[0], {
              xPercent: -102,
              duration: 1.25,
              ease: "power4.inOut",
              ...scrollReveal(chapter),
            });
            gsap.to(shutters[1], {
              xPercent: 102,
              duration: 1.25,
              ease: "power4.inOut",
              ...scrollReveal(chapter),
            });
            gsap.fromTo(
              image,
              { opacity: 0.72, scale: 1.04 },
              {
                opacity: 1,
                scale: 1,
                duration: 1.6,
                ease: "power2.out",
                ...scrollReveal(chapter),
              },
            );
          }

          if (animation === "platform") {
            gsap.from(frame, {
              opacity: 0,
              scaleY: 0.35,
              transformOrigin: "center bottom",
              duration: 1.25,
              ease: "expo.out",
              ...scrollReveal(chapter),
            });
            if (enableDepthMotion) {
              gsap.to(image, {
                yPercent: -17,
                ease: "none",
                scrollTrigger: {
                  trigger: chapter,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1,
                },
              });
              gsap.fromTo(
                title,
                { xPercent: 34 },
                {
                  xPercent: -12,
                  ease: "none",
                  scrollTrigger: {
                    trigger: chapter,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.35,
                  },
                },
              );
            }
          }

          if (animation === "pulse") {
            const rings = chapter.querySelectorAll<HTMLElement>(
              '[data-photo-part="pulse-ring"]',
            );

            if (enableDepthMotion) {
              gsap.fromTo(
                image,
                { scale: 1.075, yPercent: 2.5 },
                {
                  scale: 1,
                  yPercent: -2.5,
                  ease: "none",
                  scrollTrigger: {
                    trigger: chapter,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.15,
                  },
                },
              );
            }
            gsap.fromTo(
              rings,
              { opacity: 0.8, scale: 0.18 },
              {
                opacity: 0,
                scale: 1.65,
                duration: 1.55,
                stagger: 0.18,
                ease: "power2.out",
                ...scrollReveal(chapter),
              },
            );
            gsap.from(copy, {
              opacity: 0,
              y: 36,
              duration: 1.2,
              ease: "power3.out",
              ...scrollReveal(chapter),
            });
            gsap.from(title, {
              letterSpacing: "0.14em",
              duration: 1.45,
              ease: "power2.out",
              ...scrollReveal(chapter),
            });
          }
        });
      });

      media.add("(prefers-reduced-motion: reduce)", () => {
        const chapters = gsap.utils.toArray<HTMLElement>(
          '[data-photo-part="chapter"]',
        );
        const atmosphere = root.current?.querySelector<HTMLElement>(
          '[data-photo-part="atmosphere"]',
        );
        const progressMarks = gsap.utils.toArray<HTMLElement>(
          '[data-photo-part="progress-mark"]',
        );

        chapters.forEach((chapter, index) => {
          const applyTheme = () => {
            const accent = chapter.dataset.photoAccent ?? "#c8f06a";

            gsap.set(root.current, { [essayAccentProperty]: accent });
            if (atmosphere) {
              gsap.set(atmosphere, {
                [atmosphereAccentProperty]: accent,
                backgroundColor: chapter.dataset.photoBackground ?? "#07120d",
              });
            }
            gsap.set(progressMarks, {
              opacity: (markIndex) => (markIndex === index ? 1 : 0.24),
              scale: (markIndex) => (markIndex === index ? 1.8 : 1),
            });
          };

          ScrollTrigger.create({
            trigger: chapter,
            start: "top 55%",
            end: "bottom 45%",
            onEnter: applyTheme,
            onEnterBack: applyTheme,
          });
        });
      });

      return () => media.revert();
    }, root);

    return () => context.revert();
  }, [root]);
}
