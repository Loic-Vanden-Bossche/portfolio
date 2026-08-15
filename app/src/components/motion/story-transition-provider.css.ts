import { createVar, style } from "@vanilla-extract/css";

import {
  storyHeroWash,
  storyImageFilter,
  storyImagePosition,
} from "@/components/portfolio/photo-presentation-vars.css";

export const transitionAccent = createVar();
export const transitionBackground = createVar();

export const overlay = style({
  position: "fixed",
  zIndex: 100000,
  inset: 0,
  overflow: "hidden",
  pointerEvents: "none",
  isolation: "isolate",
});

export const scrim = style({
  position: "absolute",
  zIndex: 0,
  inset: 0,
  opacity: 0,
  background: transitionBackground,
});

export const glow = style({
  position: "absolute",
  zIndex: 1,
  top: "50%",
  left: "50%",
  width: "min(110vw, 1500px)",
  aspectRatio: "1",
  borderRadius: "50%",
  opacity: 0,
  background: `radial-gradient(circle, color-mix(in srgb, ${transitionAccent} 32%, transparent), transparent 66%)`,
  transform: "translate(-50%, -50%) scale(.6)",
  willChange: "transform, opacity",
});

export const ghost = style({
  position: "fixed",
  zIndex: 3,
  overflow: "hidden",
  border: `1px solid color-mix(in srgb, ${transitionAccent} 42%, transparent)`,
  background: transitionBackground,
  boxShadow: "0 36px 100px rgba(0,0,0,.42)",
  willChange: "top, left, width, height, transform, clip-path, opacity",
});

export const image = style({
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  opacity: 0.76,
  backgroundPosition: storyImagePosition,
  backgroundSize: "cover",
  filter: storyImageFilter,
  willChange: "transform, opacity",
});

export const wash = style({
  position: "absolute",
  zIndex: 1,
  inset: 0,
  background: storyHeroWash,
});

export const identity = style({
  position: "absolute",
  zIndex: 4,
  right: "clamp(20px, 5vw, 72px)",
  bottom: "clamp(20px, 5vw, 66px)",
  display: "flex",
  alignItems: "center",
  gap: 14,
  color: "white",
  opacity: 0,
  transform: "translateY(18px)",
});

export const icon = style({
  display: "grid",
  width: 48,
  height: 48,
  color: transitionAccent,
  border: `1px solid color-mix(in srgb, ${transitionAccent} 55%, transparent)`,
  borderRadius: 999,
  placeItems: "center",
  background: "rgba(4,6,11,.54)",
});

export const title = style({
  fontSize: "clamp(1.2rem, 3vw, 2.4rem)",
  fontWeight: 540,
  letterSpacing: "-.045em",
});

export const motifs = style({
  position: "absolute",
  zIndex: 2,
  inset: 0,
  overflow: "hidden",
});

export const motif = style({
  position: "absolute",
  display: "block",
  opacity: 0,
  background: transitionAccent,
  willChange: "transform, opacity",
  selectors: {
    "&:nth-child(1)": { top: "16%", left: "8%" },
    "&:nth-child(2)": { top: "28%", right: "12%" },
    "&:nth-child(3)": { top: "54%", left: "18%" },
    "&:nth-child(4)": { right: "20%", bottom: "17%" },
    "&:nth-child(5)": { top: "9%", left: "48%" },
    "&:nth-child(6)": { bottom: "8%", left: "42%" },
  },
});

export const organicMotif = style({
  width: "clamp(34px, 7vw, 100px)",
  aspectRatio: "1",
  borderRadius: "42% 58% 63% 37%",
  background: "transparent",
  border: `1px solid color-mix(in srgb, ${transitionAccent} 65%, transparent)`,
});

export const lineMotif = style({
  width: "clamp(80px, 18vw, 280px)",
  height: 1,
  transformOrigin: "left center",
});

export const dotMotif = style({
  width: 5,
  height: 5,
  borderRadius: "50%",
  boxShadow: `0 0 18px color-mix(in srgb, ${transitionAccent} 80%, transparent)`,
});

export const ringMotif = style({
  width: "clamp(60px, 12vw, 180px)",
  aspectRatio: "1",
  border: `1px solid color-mix(in srgb, ${transitionAccent} 62%, transparent)`,
  borderRadius: "50%",
  background: "transparent",
});

export const grid = style({
  position: "absolute",
  zIndex: 2,
  inset: 0,
  opacity: 0,
  backgroundImage: `linear-gradient(color-mix(in srgb, ${transitionAccent} 19%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, ${transitionAccent} 19%, transparent) 1px, transparent 1px)`,
  backgroundSize: "clamp(44px, 7vw, 92px) clamp(44px, 7vw, 92px)",
});
