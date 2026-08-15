import { createVar, style } from "@vanilla-extract/css";

import { breakpoints } from "@/styles/breakpoints";
import { vars } from "@/styles/theme.css";

import {
  storyImageFilter,
  storyImagePosition,
  storyImageScale,
} from "./photo-presentation-vars.css";

export const categoryAccent = createVar();

export const root = style({
  position: "relative",
  display: "grid",
  minHeight: 0,
  aspectRatio: "16 / 10",
  overflow: "hidden",
  padding: 22,
  color: "white",
  border: `1px solid ${vars.color.line}`,
  borderRadius: 24,
  background: "rgba(255, 255, 255, 0.035)",
  isolation: "isolate",
  transition:
    "border-color 220ms ease, transform 420ms cubic-bezier(.2,.8,.2,1)",
  selectors: {
    "&:hover, &:focus-visible": {
      borderColor: categoryAccent,
      transform: "translateY(-6px)",
    },
  },
  "@media": {
    [breakpoints.mobile]: { aspectRatio: "4 / 3", padding: 18 },
    "(prefers-reduced-motion: reduce)": { transition: "none" },
  },
});

export const compact = style({ aspectRatio: "4 / 3", padding: 18 });

export const image = style({
  zIndex: -2,
  objectFit: "cover",
  objectPosition: storyImagePosition,
  opacity: 0.84,
  filter: storyImageFilter,
  transform: `scale(${storyImageScale})`,
  transition: "opacity 400ms ease, transform 700ms cubic-bezier(.2,.8,.2,1)",
  selectors: {
    [`${root}:hover &, ${root}:focus-visible &`]: {
      opacity: 0.98,
      transform: `scale(${storyImageScale}) translateY(-1%)`,
    },
  },
});

export const veil = style({
  position: "absolute",
  zIndex: -1,
  inset: 0,
  background:
    "linear-gradient(180deg, rgba(5,7,12,.04) 28%, rgba(5,7,12,.72) 100%), radial-gradient(circle at 85% 12%, color-mix(in srgb, var(--category-accent) 18%, transparent), transparent 52%)",
});

export const header = style({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
});

export const icon = style({
  display: "grid",
  width: 42,
  height: 42,
  placeItems: "center",
  color: categoryAccent,
  border:
    "1px solid color-mix(in srgb, var(--category-accent) 55%, transparent)",
  borderRadius: 999,
  background: "rgba(5, 7, 12, 0.62)",
});

export const number = style({
  color: "rgba(255,255,255,.5)",
  fontSize: "0.64rem",
  letterSpacing: "0.13em",
});

export const copy = style({ alignSelf: "end" });

export const title = style({
  margin: 0,
  fontSize: "clamp(1.25rem, 2vw, 1.9rem)",
  fontWeight: 560,
  letterSpacing: "-0.04em",
});

export const description = style({
  maxWidth: 380,
  margin: "8px 0 0",
  color: "rgba(255,255,255,.66)",
  fontSize: "0.78rem",
  lineHeight: 1.5,
});
