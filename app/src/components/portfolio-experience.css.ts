import { style } from "@vanilla-extract/css";

import { breakpoints } from "@/styles/breakpoints";
import { accent, accentSecondary, modeGlow } from "@/styles/runtime.css";
import { vars } from "@/styles/theme.css";

export const root = style({
  vars: {
    [accent]: vars.color.accent.cyan,
    [accentSecondary]: vars.color.accent.violet,
    [modeGlow]: "rgba(85, 230, 255, 0.14)",
  },
  position: "relative",
  minHeight: "100vh",
  isolation: "isolate",
  background: `radial-gradient(circle at 80% 10%, ${modeGlow}, transparent 32%), radial-gradient(circle at 12% 52%, rgba(75, 121, 255, 0.08), transparent 34%), ${vars.color.background}`,
  transition: `background ${vars.motion.duration.slow} ${vars.motion.easing.standard}`,
  selectors: {
    '&[data-mode="photography"]': {
      vars: {
        [accent]: vars.color.accent.photography,
        [accentSecondary]: vars.color.accent.photographySecondary,
        [modeGlow]: "rgba(255, 158, 91, 0.13)",
      },
    },
    '&[data-mode="development"]': {
      vars: {
        [accent]: vars.color.accent.cyan,
        [accentSecondary]: vars.color.accent.violet,
      },
    },
  },
  "::before": {
    position: "fixed",
    zIndex: vars.zIndex.base,
    inset: 0,
    opacity: 0.14,
    backgroundImage:
      "linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px)",
    backgroundSize: "72px 72px",
    maskImage: "linear-gradient(to bottom, black, transparent 84%)",
    content: "",
    pointerEvents: "none",
  },
});

export const scene = style({
  position: "fixed",
  zIndex: vars.zIndex.base,
  inset: "-8vh 0 0",
  height: "108vh",
  opacity: 0.54,
  pointerEvents: "none",
  transition: `opacity ${vars.motion.duration.slow} ${vars.motion.easing.standard}`,
  "@media": {
    [breakpoints.mobile]: { opacity: 0.28 },
    [breakpoints.reducedMotion]: { display: "none" },
  },
});

export const developmentScene = style({
  opacity: 0.92,
  "@media": {
    [breakpoints.mobile]: { opacity: 0.56 },
  },
});

export const ambient = style({
  position: "fixed",
  zIndex: vars.zIndex.base,
  width: "34rem",
  height: "34rem",
  borderRadius: vars.radius.pill,
  filter: "blur(110px)",
  opacity: 0.1,
  pointerEvents: "none",
});

export const ambientPrimary = style({
  top: "4%",
  right: "-12rem",
  background: accentSecondary,
});

export const ambientSecondary = style({
  bottom: "10%",
  left: "-20rem",
  background: accent,
});

export const stage = style({
  position: "relative",
  zIndex: vars.zIndex.content,
});

export const main = style({
  position: "relative",
  zIndex: vars.zIndex.content,
  width: vars.layout.content,
  marginInline: "auto",
  "@media": {
    [breakpoints.mobile]: { width: vars.layout.contentMobile },
  },
});
