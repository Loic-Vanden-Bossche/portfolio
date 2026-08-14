import { style } from "@vanilla-extract/css";

import { breakpoints } from "@/styles/breakpoints";
import { accent } from "@/styles/runtime.css";
import { vars } from "@/styles/theme.css";

export const root = style({
  position: "fixed",
  right: "max(18px, calc((100vw - 1480px) / 2))",
  bottom: "max(22px, env(safe-area-inset-bottom))",
  zIndex: vars.zIndex.floatingControl,
  display: "grid",
  width: 48,
  height: 48,
  padding: 0,
  border: "1px solid rgba(190, 218, 255, 0.2)",
  borderRadius: "50%",
  background: "rgba(8, 11, 21, 0.58)",
  color: accent,
  opacity: 0,
  visibility: "hidden",
  placeItems: "center",
  pointerEvents: "none",
  transform: "translateY(12px) scale(0.9)",
  backdropFilter: "blur(14px)",
  transition:
    "opacity 240ms ease, visibility 240ms ease, transform 300ms cubic-bezier(0.2, 0.8, 0.2, 1), border-color 200ms ease, background 200ms ease",
  selectors: {
    '&[data-visible="true"]': {
      opacity: 0.78,
      visibility: "visible",
      pointerEvents: "auto",
      transform: "translateY(0) scale(1)",
    },
    "&:hover, &:focus-visible": {
      borderColor: `color-mix(in srgb, ${accent} 50%, transparent)`,
      background: "rgba(12, 16, 29, 0.82)",
      opacity: 1,
    },
    "&:focus-visible": {
      outline: `2px solid ${accent}`,
      outlineOffset: 4,
    },
  },
  "@media": {
    [breakpoints.mobile]: {
      right: 14,
      bottom: "max(14px, env(safe-area-inset-bottom))",
      width: 44,
      height: 44,
    },
  },
});

export const icon = style({
  width: "100%",
  height: "100%",
  overflow: "visible",
});

const ring = style({ fill: "none", strokeWidth: 1 });
export const track = style([ring, { stroke: "rgba(190, 218, 255, 0.14)" }]);
export const progress = style([
  ring,
  {
    stroke: "currentColor",
    strokeDasharray: 1,
    strokeDashoffset: 1,
    transform: "rotate(-90deg)",
    transformOrigin: "center",
  },
]);

export const arrow = style({
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.3,
  strokeLinecap: "round",
  strokeLinejoin: "round",
});
