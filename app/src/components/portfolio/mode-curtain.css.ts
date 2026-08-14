import { style } from "@vanilla-extract/css";

import { breakpoints } from "@/styles/breakpoints";
import { vars } from "@/styles/theme.css";

export const root = style({
  position: "fixed",
  zIndex: vars.zIndex.transition,
  inset: 0,
  display: "none",
  overflow: "hidden",
  placeItems: "center",
  background:
    "radial-gradient(circle at center, rgba(93, 100, 255, 0.2), transparent 36%), #080a14",
  color: "white",
  pointerEvents: "none",
  "::before": {
    position: "absolute",
    inset: 0,
    opacity: 0.18,
    backgroundImage:
      "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
    backgroundSize: "48px 48px",
    content: "",
  },
  "@media": {
    [breakpoints.reducedMotion]: { display: "none" },
  },
});

export const title = style({
  position: "relative",
  margin: 0,
  fontSize: "clamp(3.2rem, 9vw, 9rem)",
  fontWeight: vars.fontWeight.regular,
  letterSpacing: vars.letterSpacing.displayTight,
  lineHeight: 0.9,
  textAlign: "center",
});

export const index = style({
  position: "absolute",
  top: 40,
  left: 40,
  color: vars.color.accent.cyan,
  fontSize: "0.7rem",
  letterSpacing: vars.letterSpacing.label,
  "@media": {
    [breakpoints.mobile]: { top: 24, left: 24 },
  },
});

export const line = style({
  position: "absolute",
  right: 0,
  bottom: "13%",
  left: 0,
  height: 1,
  transform: "scaleX(0.65)",
  background: `linear-gradient(90deg, transparent, ${vars.color.accent.cyan}, transparent)`,
});
