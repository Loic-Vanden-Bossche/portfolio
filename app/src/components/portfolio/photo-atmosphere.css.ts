import { keyframes, style } from "@vanilla-extract/css";

import { breakpoints } from "@/styles/breakpoints";
import { vars } from "@/styles/theme.css";

import {
  atmosphereAccent,
  essayBackground,
  particleDelay,
  particleDriftX,
  particleDriftY,
  particleDuration,
  particleLeft,
  particleSize,
  particleTop,
} from "./photo-style-vars.css";

export const root = style({
  position: "absolute",
  zIndex: vars.zIndex.base,
  inset: 0,
  pointerEvents: "none",
});

export const viewport = style({
  position: "sticky",
  top: 0,
  width: "100%",
  height: "100svh",
  overflow: "hidden",
  backgroundColor: essayBackground,
  isolation: "isolate",
  "::after": {
    position: "absolute",
    zIndex: 4,
    inset: 0,
    opacity: 0.1,
    backgroundImage:
      "linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px)",
    backgroundSize: "72px 72px",
    content: "",
  },
});

export const glow = style({
  position: "absolute",
  zIndex: vars.zIndex.base,
  width: "min(72vw, 980px)",
  aspectRatio: "1",
  borderRadius: "50%",
  background: `radial-gradient(circle, color-mix(in srgb, ${atmosphereAccent} 19%, transparent), transparent 68%)`,
  willChange: "transform, opacity",
  "@media": {
    [breakpoints.coarseOrReducedData]: { opacity: 0.6 },
  },
});

export const primaryGlow = style({ top: "-36%", right: "-18%" });
export const secondaryGlow = style({
  bottom: "-48%",
  left: "-20%",
  opacity: 0.48,
  scale: 0.82,
});

export const particles = style({ position: "absolute", zIndex: 2, inset: 0 });

const drift = keyframes({
  from: { translate: "0 0" },
  to: { translate: `${particleDriftX} ${particleDriftY}` },
});

export const particle = style({
  position: "absolute",
  top: particleTop,
  left: particleLeft,
  width: particleSize,
  height: particleSize,
  borderRadius: "50%",
  animation: `${drift} ${particleDuration} ease-in-out ${particleDelay} infinite alternate`,
  background: atmosphereAccent,
  boxShadow: `0 0 9px color-mix(in srgb, ${atmosphereAccent} 70%, transparent)`,
  opacity: 0.48,
  willChange: "transform",
  selectors: {
    "&:nth-child(n + 11)": {
      "@media": {
        [breakpoints.coarseOrReducedData]: { display: "none" },
      },
    },
  },
  "@media": {
    [breakpoints.reducedMotion]: { animation: "none" },
  },
});

export const wire = style({
  position: "absolute",
  zIndex: 3,
  inset: "-8%",
  width: "116%",
  height: "116%",
  overflow: "visible",
  pointerEvents: "none",
  willChange: "transform",
});

const wirePath = style({ fill: "none", vectorEffect: "non-scaling-stroke" });
export const wireBase = style([
  wirePath,
  { stroke: "rgba(221, 234, 255, 0.14)", strokeWidth: 1 },
]);
export const wireEnergy = style([
  wirePath,
  {
    stroke: atmosphereAccent,
    strokeWidth: 1.5,
    strokeDasharray: "0.16 0.84",
    strokeDashoffset: 0,
    strokeLinecap: "round",
    "@media": {
      [breakpoints.coarseOrReducedData]: { strokeWidth: 1 },
    },
  },
]);
