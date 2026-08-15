"use client";

import { assignInlineVars } from "@vanilla-extract/dynamic";
import gsap from "gsap";
import { useTranslations } from "next-intl";
import {
  createContext,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { flushSync } from "react-dom";

import { PhotoCategoryIcon } from "@/components/portfolio/photo-category-icon";
import {
  getPhotoCategory,
  getPhotoCategoryHero,
  type PhotoCategorySlug,
  type PhotoMotionLanguage,
} from "@/components/portfolio/photo-library";
import {
  storyHeroWash,
  storyImageFilter,
  storyImagePosition,
  storyImageScale,
} from "@/components/portfolio/photo-presentation-vars.css";
import { useRouter } from "@/i18n/navigation";

import { useSmoothScroll } from "./smooth-scroll-provider";
import * as styles from "./story-transition-provider.css";

export type StoryTransitionRequest = {
  beforeNavigate?: () => void;
  category: PhotoCategorySlug;
  href: string;
  sourceElement: HTMLElement;
};

type ActiveTransition = {
  borderRadius: string;
  category: PhotoCategorySlug;
  height: number;
  imageSrc: string;
  left: number;
  top: number;
  width: number;
};

type DestinationTransition = {
  borderRadius: string;
  bounds: DOMRect;
};

type StoryTransitionContextValue = {
  activeCategory: PhotoCategorySlug | null;
  navigateToStory: (request: StoryTransitionRequest) => void;
  phase: "covering" | "idle" | "revealing";
  registerDestinationReady: (
    category: PhotoCategorySlug,
    heroElement: HTMLElement,
  ) => void;
};

const StoryTransitionContext =
  createContext<StoryTransitionContextValue | null>(null);

function startSmoothScroll(smoothScroll: ReturnType<typeof useSmoothScroll>) {
  smoothScroll.current?.start();
}

function stopSmoothScroll(smoothScroll: ReturnType<typeof useSmoothScroll>) {
  smoothScroll.current?.stop();
}

const entranceShape: Record<PhotoMotionLanguage, gsap.TweenVars> = {
  organic: {
    borderRadius: "46% 54% 43% 57%",
    clipPath: "inset(0% 0% 0% 0% round 42%)",
    rotate: -2,
  },
  glide: {
    borderRadius: 0,
    clipPath: "polygon(0 0, 82% 0, 100% 100%, 14% 100%)",
    xPercent: 2,
  },
  grid: {
    borderRadius: 0,
    clipPath: "inset(0% 0% 0% 0%)",
    scale: 1.01,
  },
  track: {
    borderRadius: 0,
    clipPath: "inset(0% 0% 0% 0%)",
    xPercent: -1,
  },
  horizon: {
    borderRadius: 0,
    clipPath: "inset(0% 0% 0% 0%)",
    scaleY: 1.01,
  },
  focus: {
    borderRadius: "50%",
    clipPath: "circle(72% at 50% 50%)",
    scale: 1.015,
  },
  bloom: {
    borderRadius: "48% 52% 46% 54%",
    clipPath: "circle(72% at 50% 50%)",
    rotate: 1.5,
  },
  orbit: {
    borderRadius: 0,
    clipPath: "polygon(50% 0%, 92% 22%, 100% 72%, 52% 100%, 7% 78%, 0% 25%)",
    rotate: 3,
  },
  resonance: {
    borderRadius: 0,
    clipPath: "inset(0% 0% 0% 0%)",
    scaleX: 1.01,
  },
  tableau: {
    borderRadius: 4,
    clipPath: "inset(0% 0% 0% 0% round 4px)",
    yPercent: -1,
  },
};

const motifMotion: Record<
  PhotoMotionLanguage,
  { from: gsap.TweenVars; to: gsap.TweenVars }
> = {
  organic: {
    from: { rotate: -70, scale: 0.2, xPercent: -18 },
    to: { rotate: 12, scale: 1, xPercent: 0 },
  },
  glide: {
    from: { rotate: -8, scaleX: 0.15, xPercent: -70, yPercent: 35 },
    to: { rotate: -8, scaleX: 1, xPercent: 0, yPercent: 0 },
  },
  grid: {
    from: { scaleX: 0, scaleY: 0.2 },
    to: { scaleX: 1, scaleY: 1 },
  },
  track: {
    from: { scaleX: 0.18, xPercent: 90 },
    to: { scaleX: 1, xPercent: -8 },
  },
  horizon: {
    from: { scaleX: 0.05, yPercent: 45 },
    to: { scaleX: 1.2, yPercent: 0 },
  },
  focus: {
    from: { scale: 0.08 },
    to: { scale: 1.15 },
  },
  bloom: {
    from: { rotate: -110, scale: 0.05 },
    to: { rotate: 18, scale: 1 },
  },
  orbit: {
    from: { rotate: -150, scale: 0.08 },
    to: { rotate: 22, scale: 1 },
  },
  resonance: {
    from: { scaleX: 0.02, xPercent: -12 },
    to: { scaleX: 1.25, xPercent: 0 },
  },
  tableau: {
    from: { scale: 0.45, yPercent: 80 },
    to: { scale: 1, yPercent: 0 },
  },
};

export function useStoryTransition() {
  const context = useContext(StoryTransitionContext);
  if (!context) {
    throw new Error(
      "useStoryTransition must be used within StoryTransitionProvider",
    );
  }
  return context;
}

export function shouldAnimateStoryNavigation(
  event: ReactMouseEvent<HTMLAnchorElement>,
) {
  return !(
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  );
}

export function StoryTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const smoothScroll = useSmoothScroll();
  const t = useTranslations("PhotographyArchive");
  const overlay = useRef<HTMLDivElement>(null);
  const scrim = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const ghost = useRef<HTMLDivElement>(null);
  const ghostImage = useRef<HTMLSpanElement>(null);
  const identity = useRef<HTMLDivElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const activeRef = useRef<ActiveTransition | null>(null);
  const destinationRef = useRef<DestinationTransition | null>(null);
  const destinationReady = useRef(false);
  const entranceComplete = useRef(false);
  const revealStarted = useRef(false);
  const fallbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cleanupTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const revealTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const [active, setActive] = useState<ActiveTransition | null>(null);
  const [phase, setPhase] =
    useState<StoryTransitionContextValue["phase"]>("idle");

  const clearTransition = useCallback(() => {
    timeline.current?.kill();
    timeline.current = null;
    if (fallbackTimer.current) clearTimeout(fallbackTimer.current);
    if (cleanupTimer.current) clearTimeout(cleanupTimer.current);
    if (navigationTimer.current) clearTimeout(navigationTimer.current);
    if (revealTimer.current) clearTimeout(revealTimer.current);
    fallbackTimer.current = null;
    cleanupTimer.current = null;
    navigationTimer.current = null;
    revealTimer.current = null;
    destinationRef.current = null;
    destinationReady.current = false;
    entranceComplete.current = false;
    revealStarted.current = false;
    activeRef.current = null;
    startSmoothScroll(smoothScroll);
    delete document.documentElement.dataset.storyTransitioning;
    setActive(null);
    setPhase("idle");
  }, [smoothScroll]);

  const revealDestination = useCallback(() => {
    if (
      !activeRef.current ||
      !entranceComplete.current ||
      revealStarted.current
    )
      return;
    revealStarted.current = true;
    const destinationCategory = getPhotoCategory(activeRef.current.category);
    const target = destinationRef.current;
    const currentGhost = ghost.current;
    const currentOverlay = overlay.current;
    if (!currentGhost || !currentOverlay) {
      clearTransition();
      return;
    }

    setPhase("revealing");
    timeline.current?.kill();
    if (cleanupTimer.current) clearTimeout(cleanupTimer.current);
    cleanupTimer.current = setTimeout(clearTransition, 700);
    const targetVars = target
      ? {
          borderRadius: target.borderRadius,
          height: target.bounds.height,
          left: target.bounds.left,
          top: target.bounds.top,
          width: target.bounds.width,
        }
      : { opacity: 0, scale: 1.025 };

    timeline.current = gsap
      .timeline({ onComplete: clearTransition })
      .to(identity.current, { duration: 0.2, opacity: 0, y: -10 }, 0)
      .to(grid.current, { duration: 0.35, opacity: 0 }, 0)
      .to("[data-story-transition-motif]", { duration: 0.3, opacity: 0 }, 0)
      .to(
        scrim.current,
        { duration: 0.48, ease: "power2.inOut", opacity: 0 },
        0,
      )
      .to(glow.current, { duration: 0.45, opacity: 0, scale: 1.15 }, 0)
      .to(
        ghostImage.current,
        {
          duration: 0.5,
          opacity: 1,
          scale: Number(destinationCategory.presentation.scale),
        },
        0,
      )
      .to(
        currentGhost,
        {
          ...targetVars,
          backgroundColor: "#05070b",
          borderColor: "rgba(255,255,255,.12)",
          boxShadow: "0 30px 100px rgba(0,0,0,.38)",
          clipPath: `inset(0% 0% 0% 0% round ${target?.borderRadius ?? "28px"})`,
          duration: 0.5,
          ease: "power4.inOut",
          rotate: 0,
          scale: 1,
          scaleX: 1,
          scaleY: 1,
          xPercent: 0,
          yPercent: 0,
        },
        0,
      )
      .to(currentOverlay, { duration: 0.12, opacity: 0 }, 0.4);
  }, [clearTransition]);

  const registerDestinationReady = useCallback(
    (category: PhotoCategorySlug, heroElement: HTMLElement) => {
      if (activeRef.current?.category !== category) return;
      destinationRef.current = {
        borderRadius: window.getComputedStyle(heroElement).borderRadius,
        bounds: heroElement.getBoundingClientRect(),
      };
      destinationReady.current = true;
      if (entranceComplete.current) revealDestination();
    },
    [revealDestination],
  );

  const navigateToStory = useCallback(
    ({
      beforeNavigate,
      category,
      href,
      sourceElement,
    }: StoryTransitionRequest) => {
      if (activeRef.current) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reducedMotion) {
        beforeNavigate?.();
        router.push(href);
        return;
      }

      const bounds = sourceElement.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(sourceElement);
      const sourceImage = sourceElement.querySelector<HTMLImageElement>("img");
      const categoryData = getPhotoCategory(category);
      const cover = getPhotoCategoryHero(categoryData);
      const nextActive: ActiveTransition = {
        borderRadius: computedStyle.borderRadius,
        category,
        height: Math.max(bounds.height, 42),
        imageSrc:
          sourceImage?.currentSrc ||
          sourceImage?.src ||
          `/img/sections/${cover.file}`,
        left: bounds.left,
        top: bounds.top,
        width: Math.max(bounds.width, 42),
      };

      activeRef.current = nextActive;
      destinationReady.current = false;
      entranceComplete.current = false;
      revealStarted.current = false;
      stopSmoothScroll(smoothScroll);
      document.documentElement.dataset.storyTransitioning = "true";
      flushSync(() => {
        setActive(nextActive);
        setPhase("covering");
      });
      beforeNavigate?.();
      stopSmoothScroll(smoothScroll);

      const motifPreset = motifMotion[categoryData.motion];
      const motifElements = overlay.current?.querySelectorAll(
        "[data-story-transition-motif]",
      );

      timeline.current = gsap
        .timeline({
          defaults: { overwrite: "auto" },
          onComplete: () => {
            entranceComplete.current = true;
            if (destinationReady.current) revealDestination();
          },
        })
        .set(overlay.current, { opacity: 1 })
        .to(
          scrim.current,
          { duration: 0.34, ease: "power2.out", opacity: 1 },
          0,
        )
        .to(
          glow.current,
          { duration: 0.62, ease: "power3.out", opacity: 1, scale: 1 },
          0,
        )
        .to(
          ghost.current,
          {
            ...entranceShape[categoryData.motion],
            duration: 0.72,
            ease: "power4.inOut",
            height: window.innerHeight,
            left: 0,
            top: 0,
            width: window.innerWidth,
          },
          0,
        )
        .to(
          ghostImage.current,
          { duration: 0.72, ease: "power3.inOut", opacity: 0.9, scale: 1.08 },
          0,
        )
        .to(
          identity.current,
          { duration: 0.34, ease: "power3.out", opacity: 1, y: 0 },
          0.28,
        )
        .to(
          grid.current,
          {
            duration: 0.35,
            opacity: categoryData.motion === "grid" ? 0.8 : 0.2,
          },
          0.22,
        )
        .fromTo(
          motifElements ?? [],
          { ...motifPreset.from, opacity: 0 },
          {
            ...motifPreset.to,
            duration: 0.48,
            ease:
              categoryData.motion === "organic"
                ? "back.out(1.5)"
                : "power3.out",
            opacity: 0.72,
            stagger: 0.045,
          },
          0.18,
        );

      navigationTimer.current = setTimeout(() => router.push(href), 500);

      const revealWhenMounted = () => {
        if (
          window.location.pathname.endsWith(`/photography/${category}`) &&
          destinationReady.current
        ) {
          entranceComplete.current = true;
          revealDestination();
          return;
        }
        revealTimer.current = setTimeout(revealWhenMounted, 80);
      };
      revealTimer.current = setTimeout(revealWhenMounted, 720);

      fallbackTimer.current = setTimeout(() => {
        if (!window.location.pathname.endsWith(`/photography/${category}`)) {
          const locale = window.location.pathname.split("/")[1];
          window.location.assign(
            new URL(`/${locale}${href}`, window.location.origin).href,
          );
          return;
        }
        if (!destinationReady.current) {
          destinationRef.current = null;
          destinationReady.current = true;
        }
        entranceComplete.current = true;
        revealDestination();
      }, 1800);
    },
    [revealDestination, router, smoothScroll],
  );

  useEffect(
    () => () => {
      timeline.current?.kill();
      if (fallbackTimer.current) clearTimeout(fallbackTimer.current);
      if (cleanupTimer.current) clearTimeout(cleanupTimer.current);
      if (navigationTimer.current) clearTimeout(navigationTimer.current);
      if (revealTimer.current) clearTimeout(revealTimer.current);
      startSmoothScroll(smoothScroll);
      delete document.documentElement.dataset.storyTransitioning;
    },
    [smoothScroll],
  );

  const value: StoryTransitionContextValue = {
    activeCategory: active?.category ?? null,
    navigateToStory,
    phase,
    registerDestinationReady,
  };

  const categoryData = active ? getPhotoCategory(active.category) : null;
  const motifClass = categoryData
    ? getMotifClass(categoryData.motion)
    : styles.lineMotif;

  return (
    <StoryTransitionContext.Provider value={value}>
      {children}
      {active && categoryData ? (
        <div
          aria-hidden="true"
          className={styles.overlay}
          data-story-transition-motion={categoryData.motion}
          data-story-transition-phase={phase}
          ref={overlay}
          style={assignInlineVars({
            [styles.transitionAccent]: categoryData.accent,
            [styles.transitionBackground]: categoryData.background,
            [storyHeroWash]: categoryData.presentation.wash,
            [storyImageFilter]: categoryData.presentation.filter,
            [storyImagePosition]: categoryData.presentation.position,
            [storyImageScale]: categoryData.presentation.scale,
          })}
        >
          <div className={styles.scrim} ref={scrim} />
          <div className={styles.glow} ref={glow} />
          <div className={styles.grid} ref={grid} />
          <div className={styles.motifs}>
            {Array.from({ length: 6 }, (_, index) => (
              <span
                className={`${styles.motif} ${motifClass}`}
                data-story-transition-motif=""
                key={index}
              />
            ))}
          </div>
          <div
            className={styles.ghost}
            ref={ghost}
            style={{
              borderRadius: active.borderRadius,
              height: active.height,
              left: active.left,
              top: active.top,
              width: active.width,
            }}
          >
            <span
              aria-hidden="true"
              className={styles.image}
              ref={ghostImage}
              style={{
                backgroundImage: `url("${active.imageSrc}")`,
              }}
            />
            <span className={styles.wash} />
          </div>
          <div className={styles.identity} ref={identity}>
            <span className={styles.icon}>
              <PhotoCategoryIcon icon={categoryData.icon} size={22} />
            </span>
            <span className={styles.title}>
              {t(`categories.${categoryData.slug}.title`)}
            </span>
          </div>
        </div>
      ) : null}
    </StoryTransitionContext.Provider>
  );
}

function getMotifClass(motion: PhotoMotionLanguage) {
  if (motion === "organic" || motion === "bloom") return styles.organicMotif;
  if (motion === "focus" || motion === "orbit") return styles.ringMotif;
  if (motion === "tableau") return styles.dotMotif;
  return styles.lineMotif;
}
