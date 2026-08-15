import { globalStyle, keyframes, style } from "@vanilla-extract/css";

import { enabledDocument } from "@/components/ui/custom-cursor.css";
import { breakpoints } from "@/styles/breakpoints";
import { vars } from "@/styles/theme.css";

const backdropIn = keyframes({ from: { opacity: 0 }, to: { opacity: 1 } });

export const trigger = style({
  display: "inline-flex",
  alignItems: "center",
  gap: 7,
  padding: "11px 12px",
  color: vars.color.text.muted,
  border: 0,
  borderRadius: vars.radius.control,
  background: "transparent",
  fontSize: "0.66rem",
  fontWeight: vars.fontWeight.semibold,
  letterSpacing: "0.09em",
  textTransform: "uppercase",
  cursor: "pointer",
  transition: "color 180ms ease, background 180ms ease",
  selectors: {
    "&:hover, &:focus-visible": {
      color: "white",
      background: "rgba(255,255,255,.06)",
    },
  },
});

export const dialog = style({
  width: "min(1180px, calc(100vw - 36px))",
  maxWidth: "none",
  maxHeight: "calc(100dvh - 36px)",
  margin: "auto",
  padding: 0,
  overflow: "hidden",
  color: "white",
  border: `1px solid ${vars.color.line}`,
  borderRadius: 30,
  background: "linear-gradient(145deg,rgba(6,8,14,.86),rgba(9,11,19,.78))",
  boxShadow: "0 32px 100px rgba(0,0,0,.72)",
  backdropFilter: "blur(20px) saturate(120%)",
  selectors: {
    "&::backdrop": {
      background: "rgba(1,3,8,.38)",
      backdropFilter: "blur(3px) saturate(108%)",
      animation: `${backdropIn} 260ms ease both`,
    },
  },
  "@media": {
    [breakpoints.mobile]: {
      width: "calc(100vw - 20px)",
      maxHeight: "calc(100dvh - 20px)",
      borderRadius: 22,
    },
  },
});

globalStyle(`${enabledDocument} ${dialog}, ${enabledDocument} ${dialog} *`, {
  cursor: "default !important",
});

globalStyle(
  `${enabledDocument} ${dialog} a, ${enabledDocument} ${dialog} button`,
  { cursor: "pointer !important" },
);

export const inner = style({
  maxHeight: "calc(100dvh - 38px)",
  overflowY: "auto",
  padding: "clamp(20px, 4vw, 48px)",
  overscrollBehavior: "contain",
  scrollbarColor: "rgba(120,214,242,.72) rgba(255,255,255,.035)",
  scrollbarGutter: "stable",
  scrollbarWidth: "thin",
});

globalStyle(`${inner}::-webkit-scrollbar`, { width: 9 });
globalStyle(`${inner}::-webkit-scrollbar-track`, {
  background: "rgba(255,255,255,.035)",
});
globalStyle(`${inner}::-webkit-scrollbar-thumb`, {
  border: "2px solid transparent",
  borderRadius: 999,
  background:
    "linear-gradient(180deg,rgba(119,223,252,.8),rgba(155,108,255,.68)) padding-box",
});
globalStyle(`${inner}::-webkit-scrollbar-thumb:hover`, {
  background:
    "linear-gradient(180deg,rgba(151,235,255,.96),rgba(179,144,255,.9)) padding-box",
});

export const header = style({
  display: "grid",
  gridTemplateColumns: "1fr auto",
  gap: 20,
  alignItems: "start",
  marginBottom: 30,
});

export const eyebrow = style({
  margin: "0 0 8px",
  color: "#77dffc",
  fontSize: ".67rem",
  letterSpacing: ".16em",
  textTransform: "uppercase",
});

export const title = style({
  margin: 0,
  fontSize: "clamp(2rem, 5vw, 4.4rem)",
  fontWeight: 520,
  letterSpacing: "-.055em",
  lineHeight: 0.94,
});

export const close = style({
  display: "grid",
  width: 42,
  height: 42,
  placeItems: "center",
  color: "white",
  border: `1px solid ${vars.color.line}`,
  borderRadius: 999,
  background: "rgba(255,255,255,.04)",
  cursor: "pointer",
});

export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
  gap: 12,
  "@media": {
    "screen and (max-width: 1050px)": {
      gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    },
    [breakpoints.mobile]: { gridTemplateColumns: "1fr 1fr" },
    "screen and (max-width: 440px)": { gridTemplateColumns: "1fr" },
  },
});
