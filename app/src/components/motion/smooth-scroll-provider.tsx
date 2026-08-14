"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  createContext,
  type MutableRefObject,
  useContext,
  useEffect,
  useRef,
} from "react";

type SmoothScrollProviderProps = {
  children: React.ReactNode;
};

const SmoothScrollContext =
  createContext<MutableRefObject<Lenis | null> | null>(null);

export function useSmoothScroll() {
  const context = useContext(SmoothScrollContext);

  if (!context) {
    throw new Error("useSmoothScroll must be used within SmoothScrollProvider");
  }

  return context;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true, limitCallbacks: true });

    const lenis = new Lenis({
      anchors: { offset: -96 },
      lerp: 0.085,
      respectReducedMotion: true,
      smoothWheel: true,
      stopInertiaOnNavigate: true,
      wheelMultiplier: 0.9,
    });
    lenisRef.current = lenis;
    const removeScrollListener = lenis.on("scroll", ScrollTrigger.update);
    const updateLenis = (time: number) => lenis.raf(time * 1000);

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(500, 33);
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      removeScrollListener();
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={lenisRef}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
