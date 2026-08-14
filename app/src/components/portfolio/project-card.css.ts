import { style } from "@vanilla-extract/css";

import { breakpoints } from "@/styles/breakpoints";
import { accent, accentSecondary } from "@/styles/runtime.css";
import { vars } from "@/styles/theme.css";

export const root = style({
  position: "relative",
  display: "flex",
  minHeight: 560,
  padding: 26,
  overflow: "hidden",
  flexDirection: "column",
  justifyContent: "space-between",
  border: `1px solid ${vars.color.line}`,
  borderRadius: vars.radius.card,
  background:
    "linear-gradient(145deg, rgba(17, 25, 43, 0.7), rgba(8, 10, 18, 0.84))",
  boxShadow: `inset 0 1px 0 rgba(255, 255, 255, 0.05), ${vars.shadow.card}`,
  backdropFilter: "blur(22px)",
  selectors: {
    '&[data-portfolio-mode="photography"][data-tone="landscape"]': {
      background:
        "linear-gradient(to top, #071016, transparent 62%), radial-gradient(ellipse at 65% 80%, rgba(255, 183, 112, 0.48), transparent 22%), linear-gradient(150deg, #111b26 12%, #234152 48%, #b67953 100%)",
    },
    '&[data-portfolio-mode="photography"][data-tone="detail"]': {
      background:
        "radial-gradient(circle at 72% 35%, rgba(139, 232, 245, 0.2), transparent 22%), linear-gradient(120deg, #14101a, #0a1e2b 60%, #27223d)",
    },
  },
  "::after": {
    position: "absolute",
    zIndex: 1,
    inset: 0,
    background:
      "linear-gradient(to top, rgba(5, 6, 11, 0.88), transparent 56%)",
    content: "",
    pointerEvents: "none",
  },
  "@media": {
    [breakpoints.mobile]: { minHeight: 480, gridColumn: "auto" },
  },
});

export const wide = style({
  minHeight: 430,
  gridColumn: "1 / -1",
  "@media": {
    [breakpoints.mobile]: { minHeight: 480, gridColumn: "auto" },
  },
});

export const image = style({
  objectFit: "cover",
  objectPosition: "50% 44%",
  filter: "saturate(0.72) contrast(1.08)",
  transition: `transform 800ms ${vars.motion.easing.expressive}, filter 800ms ease`,
  selectors: {
    [`${root}:hover &`]: {
      transform: "scale(1.035)",
      filter: "saturate(0.95) contrast(1.04)",
    },
  },
});

export const art = style({
  position: "absolute",
  inset: 0,
  overflow: "hidden",
  "::before": {
    position: "absolute",
    top: "15%",
    left: "50%",
    width: 300,
    height: 300,
    transform: "translateX(-50%) rotate(-20deg)",
    border: `1px solid color-mix(in srgb, ${accent} 38%, transparent)`,
    borderRadius: "50%",
    boxShadow: `0 0 90px color-mix(in srgb, ${accent} 13%, transparent)`,
    content: "",
  },
  "::after": {
    position: "absolute",
    top: "28%",
    left: "50%",
    width: 160,
    height: 160,
    transform: "translateX(-50%)",
    border: `1px solid color-mix(in srgb, ${accentSecondary} 42%, transparent)`,
    borderRadius: "50%",
    content: "",
  },
});

export const artPoint = style({
  position: "absolute",
  top: "28%",
  left: "64%",
  width: 10,
  height: 10,
  borderRadius: "50%",
  background: accent,
  boxShadow: `0 0 22px ${accent}`,
});

export const meta = style({
  position: "relative",
  zIndex: 3,
  display: "flex",
  justifyContent: "space-between",
  color: "rgba(202, 211, 231, 0.6)",
  fontSize: "0.61rem",
  letterSpacing: vars.letterSpacing.meta,
  textTransform: "uppercase",
});

export const content = style({
  position: "relative",
  zIndex: 3,
  maxWidth: 560,
});

export const title = style({
  margin: "0 0 15px",
  fontSize: "clamp(2.2rem, 4vw, 4.2rem)",
  fontWeight: vars.fontWeight.regular,
  lineHeight: 0.96,
  letterSpacing: "-0.055em",
});

export const description = style({
  maxWidth: 440,
  margin: 0,
  color: "#a6afc3",
  lineHeight: 1.65,
});
