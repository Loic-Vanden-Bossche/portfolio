import { globalStyle } from "@vanilla-extract/css";

import { breakpoints } from "./breakpoints";
import { accent } from "./runtime.css";
import { vars } from "./theme.css";

globalStyle("*", {
  boxSizing: "border-box",
});

globalStyle("html", {
  background: vars.color.background,
  scrollBehavior: "auto",
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
