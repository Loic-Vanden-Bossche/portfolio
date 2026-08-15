import { globalStyle } from "@vanilla-extract/css";

import { breakpoints } from "./breakpoints";
import { accent } from "./runtime.css";
import { vars } from "./theme.css";

globalStyle("*", {
  boxSizing: "border-box",
});

globalStyle("html", {
  background: vars.color.background,
  scrollbarColor: "rgba(118,205,237,.72) rgba(5,6,11,.72)",
  scrollbarGutter: "stable",
  scrollbarWidth: "thin",
  scrollBehavior: "auto",
});

globalStyle("html.lenis:not(.lenis-autoToggle).lenis-stopped", {
  overflow: "visible",
});

globalStyle("html::-webkit-scrollbar", {
  width: 11,
  height: 11,
  "@media": {
    [breakpoints.mobile]: { width: 0, height: 0 },
  },
});

globalStyle("html::-webkit-scrollbar-track", {
  background: "rgba(5,6,11,.72)",
  borderLeft: "1px solid rgba(255,255,255,.035)",
});

globalStyle("html::-webkit-scrollbar-thumb", {
  minHeight: 54,
  border: "3px solid transparent",
  borderRadius: 999,
  background:
    "linear-gradient(180deg,rgba(102,220,244,.82),rgba(151,106,236,.68)) padding-box",
  transition: "background 220ms ease, border-width 220ms ease",
});

globalStyle("html::-webkit-scrollbar-thumb:hover", {
  borderWidth: 2,
  background:
    "linear-gradient(180deg,rgba(139,232,245,.96),rgba(174,132,255,.9)) padding-box",
});

globalStyle("html::-webkit-scrollbar-corner", {
  background: vars.color.background,
});

globalStyle("body", {
  margin: 0,
  overflowX: "hidden",
  background: vars.color.background,
  color: vars.color.text.primary,
  fontFamily: vars.font.body,
  textRendering: "optimizeLegibility",
});

globalStyle("a", {
  color: "inherit",
  textDecoration: "none",
});

globalStyle("button, a", {
  WebkitTapHighlightColor: "transparent",
});

globalStyle("button", {
  font: "inherit",
});

globalStyle("::selection", {
  background: `color-mix(in srgb, ${accent} 30%, transparent)`,
  color: "white",
});

globalStyle("html", {
  "@media": {
    [breakpoints.reducedMotion]: {
      scrollBehavior: "auto",
    },
  },
});

globalStyle("*, *::before, *::after", {
  "@media": {
    [breakpoints.reducedMotion]: {
      scrollBehavior: "auto",
      transitionDuration: "0.01ms !important",
    },
  },
});
