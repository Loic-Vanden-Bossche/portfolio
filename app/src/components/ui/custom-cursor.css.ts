import { globalStyle, style } from "@vanilla-extract/css";

import { breakpoints } from "@/styles/breakpoints";
import { vars } from "@/styles/theme.css";

export const enabledDocument = style({});

globalStyle(`${enabledDocument}, ${enabledDocument} *`, {
  "@media": {
    [breakpoints.fineMotion]: { cursor: "none !important" },
  },
});

export const root = style({
  display: "none",
  opacity: 1,
  transition: "opacity 120ms ease",
  "@media": {
    [breakpoints.fineMotion]: {
      position: "fixed",
      zIndex: vars.zIndex.cursor,
      inset: 0,
      display: "block",
      pointerEvents: "none",
    },
  },
});

globalStyle(`${enabledDocument}[data-story-transitioning="true"] ${root}`, {
  opacity: 0,
});

const cursor = style({
  position: "absolute",
  top: 0,
  left: 0,
  display: "grid",
  borderRadius: vars.radius.pill,
  opacity: 0,
  placeItems: "center",
  willChange: "transform, width, height",
  selectors: {
    '&[data-visible="true"]': { opacity: 1 },
  },
});

export const primary = style([
  cursor,
  {
    width: 7,
    height: 7,
    background: "white",
    boxShadow: "0 0 16px rgba(255, 255, 255, 0.68)",
    mixBlendMode: "difference",
    transition: "opacity 160ms ease",
  },
]);

export const follower = style([
  cursor,
  {
    width: 42,
    height: 42,
    border: "1px solid rgba(255, 255, 255, 0.42)",
    background: "rgba(7, 9, 16, 0.04)",
    color: "#061017",
    boxShadow: "0 10px 38px rgba(0, 0, 0, 0.16)",
    fontSize: "0.54rem",
    fontWeight: vars.fontWeight.heavy,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    backdropFilter: "blur(3px)",
    transition:
      "width 280ms cubic-bezier(0.2, 0.8, 0.2, 1), height 280ms cubic-bezier(0.2, 0.8, 0.2, 1), border-color 220ms ease, border-radius 280ms ease, background 220ms ease, color 220ms ease, opacity 160ms ease",
    selectors: {
      '&[data-mode="link"]': {
        width: 66,
        height: 66,
        borderColor: "rgba(139, 232, 245, 0.4)",
        background: "rgba(139, 232, 245, 0.82)",
      },
      '&[data-mode="switch"]': {
        width: 92,
        height: 38,
        borderColor: "rgba(255, 255, 255, 0.36)",
        background: "rgba(244, 247, 255, 0.9)",
      },
      '&[data-mode="view"]': {
        width: 96,
        height: 96,
        borderColor: "rgba(85, 230, 255, 0.44)",
        background:
          "linear-gradient(135deg, rgba(85, 230, 255, 0.88), rgba(178, 148, 255, 0.86))",
        boxShadow:
          "0 16px 60px rgba(46, 126, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.56)",
      },
      '&[data-pressed="true"]': { width: 34, height: 34 },
    },
  },
]);

export const label = style({
  opacity: 0,
  transform: "scale(0.7)",
  transition: "opacity 160ms ease, transform 220ms ease",
  selectors: {
    [`${follower}:not([data-mode="default"]) &`]: {
      opacity: 1,
      transform: "scale(1)",
    },
  },
});
