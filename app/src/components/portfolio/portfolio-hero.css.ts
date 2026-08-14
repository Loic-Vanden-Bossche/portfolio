import { style } from "@vanilla-extract/css";

import { breakpoints } from "@/styles/breakpoints";
import { accent, accentSecondary } from "@/styles/runtime.css";
import { vars } from "@/styles/theme.css";
import { displayHeading, sectionLabel } from "@/styles/typography.css";

export const root = style({
  position: "relative",
  display: "grid",
  minHeight: "100svh",
  padding: "142px 0 74px",
  gridTemplateColumns: "minmax(0, 1.12fr) minmax(360px, 0.72fr)",
  alignItems: "center",
  gap: "clamp(48px, 7vw, 110px)",
  "@media": {
    [breakpoints.compactHeader]: {
      gridTemplateColumns: "minmax(0, 1fr) minmax(310px, 0.7fr)",
    },
    [breakpoints.mobile]: {
      minHeight: "auto",
      padding: "128px 0 72px",
      gridTemplateColumns: "1fr",
      gap: 52,
    },
  },
});

export const copy = style({ position: "relative", zIndex: 2 });
export const kicker = sectionLabel;

export const title = style([
  displayHeading,
  {
    maxWidth: 850,
    fontSize: "clamp(4rem, 7.4vw, 8.2rem)",
    lineHeight: 0.86,
    "@media": {
      [breakpoints.mobile]: { fontSize: "clamp(3.6rem, 17vw, 6.2rem)" },
    },
  },
]);

export const titleAccent = style({
  display: "block",
  color: "transparent",
  background: `linear-gradient(100deg, #f7f9ff 2%, ${accent} 46%, ${accentSecondary} 94%)`,
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
});

export const introduction = style({
  maxWidth: 570,
  margin: "42px 0 0",
  color: vars.color.text.muted,
  fontSize: "clamp(1rem, 1.5vw, 1.18rem)",
  lineHeight: vars.lineHeight.body,
  "@media": {
    [breakpoints.mobile]: { marginTop: 30 },
  },
});

export const action = style({
  display: "inline-flex",
  alignItems: "center",
  gap: 24,
  marginTop: 34,
  paddingBottom: 8,
  borderBottom: `1px solid color-mix(in srgb, ${accent} 45%, transparent)`,
  fontSize: "0.7rem",
  fontWeight: vars.fontWeight.bold,
  letterSpacing: vars.letterSpacing.meta,
  textTransform: "uppercase",
});

export const actionArrow = style({
  color: accent,
  fontSize: "1rem",
  transition: `transform ${vars.motion.duration.fast} ease`,
  selectors: {
    [`${action}:hover &, ${action}:focus-visible &`]: {
      transform: "translateY(4px)",
    },
  },
});

export const visual = style({
  position: "relative",
  justifySelf: "end",
  width: "min(100%, 510px)",
  "@media": {
    [breakpoints.mobile]: { justifySelf: "stretch", width: "100%" },
  },
});

const visualFrame = style({
  position: "relative",
  width: "100%",
  minHeight: "min(68vh, 700px)",
  margin: 0,
  overflow: "hidden",
  border: `1px solid ${vars.color.line}`,
  borderRadius: "42% 42% 24px 24px",
  background: "rgba(8, 10, 18, 0.7)",
  boxShadow: `0 38px 110px rgba(0, 0, 0, 0.42), 0 0 80px color-mix(in srgb, ${accentSecondary} 11%, transparent), inset 0 1px 0 rgba(255, 255, 255, 0.08)`,
  "@media": {
    [breakpoints.mobile]: {
      minHeight: "116vw",
      maxHeight: 650,
      borderRadius: "40% 40% 20px 20px",
    },
  },
});

export const portrait = style([
  visualFrame,
  {
    "::after": {
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(to top, rgba(5, 6, 11, 0.8), transparent 25%), linear-gradient(135deg, transparent 50%, rgba(139, 232, 245, 0.08))",
      content: "",
      pointerEvents: "none",
    },
  },
]);

export const portraitImage = style({
  objectFit: "cover",
  filter: "saturate(0.88) contrast(1.05)",
});

export const portraitCaption = style({
  position: "absolute",
  zIndex: 2,
  right: 22,
  bottom: 20,
  left: 22,
  display: "flex",
  justifyContent: "space-between",
  color: "rgba(255, 255, 255, 0.72)",
  fontSize: "0.58rem",
  letterSpacing: vars.letterSpacing.meta,
  textTransform: "uppercase",
});

export const number = style({
  position: "absolute",
  right: -18,
  bottom: 92,
  zIndex: 3,
  padding: "12px 16px",
  border: `1px solid ${vars.color.line}`,
  borderRadius: vars.radius.pill,
  background: "rgba(6, 8, 14, 0.76)",
  color: accent,
  fontSize: "0.6rem",
  letterSpacing: "0.16em",
  backdropFilter: "blur(16px)",
  "@media": {
    [breakpoints.mobile]: { right: 12 },
  },
});

export const codeWindow = style([
  visualFrame,
  {
    display: "flex",
    padding: 22,
    flexDirection: "column",
    borderRadius: 24,
    background:
      "linear-gradient(145deg, rgba(11, 18, 34, 0.82), rgba(9, 7, 20, 0.76))",
    backdropFilter: "blur(20px)",
    "@media": {
      [breakpoints.mobile]: { minHeight: 520, borderRadius: 20 },
    },
  },
]);

export const codeBar = style({
  display: "flex",
  alignItems: "center",
  gap: 7,
  paddingBottom: 18,
  borderBottom: `1px solid ${vars.color.line}`,
});

export const codeDot = style({
  width: 7,
  height: 7,
  borderRadius: "50%",
  background: "#64708a",
  selectors: {
    "&:nth-child(2)": { background: vars.color.accent.violet },
    "&:nth-child(3)": { background: vars.color.accent.cyan },
  },
});

export const codeFile = style({
  margin: "0 0 0 auto",
  color: "#69748b",
  fontSize: "0.58rem",
  letterSpacing: "0.12em",
});

export const codeLines = style({ display: "grid", marginTop: 42, gap: 15 });

export const codeLine = style({
  display: "block",
  width: "72%",
  height: 5,
  borderRadius: 99,
  background: `linear-gradient(90deg, ${vars.color.accent.cyan}, rgba(85, 230, 255, 0.08))`,
  opacity: 0.42,
  selectors: {
    "&:nth-child(2), &:nth-child(5)": {
      width: "46%",
      marginLeft: "13%",
      background: `linear-gradient(90deg, ${vars.color.accent.violet}, transparent)`,
    },
    "&:nth-child(3)": { width: "86%" },
    "&:nth-child(4)": { width: "58%", marginLeft: "22%" },
  },
});

export const codeOrbit = style({
  position: "absolute",
  right: -72,
  bottom: 62,
  width: 320,
  height: 320,
  transform: "rotate(-18deg)",
  border: "1px solid rgba(85, 230, 255, 0.25)",
  borderRadius: "50%",
  boxShadow:
    "0 0 90px rgba(85, 230, 255, 0.11), inset 0 0 60px rgba(155, 108, 255, 0.09)",
  "::after": {
    position: "absolute",
    inset: "24%",
    border: "1px solid rgba(155, 108, 255, 0.34)",
    borderRadius: "50%",
    content: "",
  },
});

export const codeSteps = style({
  position: "absolute",
  bottom: 28,
  left: 26,
  margin: 0,
  color: "#7c87a0",
  fontFamily: vars.font.mono,
  fontSize: "0.66rem",
  letterSpacing: vars.letterSpacing.meta,
  lineHeight: 2,
});
