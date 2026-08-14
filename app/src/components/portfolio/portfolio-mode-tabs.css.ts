import { style } from "@vanilla-extract/css";

import { breakpoints } from "@/styles/breakpoints";
import { accent } from "@/styles/runtime.css";
import { vars } from "@/styles/theme.css";

export const root = style({
  display: "flex",
  alignItems: "center",
  gap: 3,
  padding: 4,
  border: `1px solid ${vars.color.line}`,
  borderRadius: 13,
  background: "rgba(255, 255, 255, 0.035)",
  "@media": {
    [breakpoints.mobile]: { justifySelf: "center" },
  },
});

export const tab = style({
  position: "relative",
  minWidth: 142,
  padding: "11px 16px",
  border: 0,
  borderRadius: vars.radius.control,
  color: "#7d879d",
  background: "transparent",
  fontSize: "0.68rem",
  fontWeight: vars.fontWeight.bold,
  letterSpacing: "0.11em",
  textTransform: "uppercase",
  cursor: "pointer",
  transition: `color ${vars.motion.duration.normal} ease, background ${vars.motion.duration.normal} ease, box-shadow ${vars.motion.duration.normal} ease`,
  selectors: {
    "&:hover, &:focus-visible": { color: "white" },
    '&[aria-selected="true"]': {
      color: "#071016",
      background: `linear-gradient(135deg, ${accent}, #e3fbff)`,
      boxShadow: `0 6px 28px color-mix(in srgb, ${accent} 18%, transparent)`,
    },
    "&:disabled": { cursor: "wait" },
  },
  "@media": {
    [breakpoints.compactHeader]: {
      minWidth: 118,
      paddingInline: 11,
    },
    [breakpoints.mobile]: {
      minWidth: "auto",
      padding: "10px 9px",
      fontSize: "0.56rem",
      letterSpacing: "0.07em",
    },
    [breakpoints.narrowMobile]: {
      paddingInline: 7,
      fontSize: "0.52rem",
    },
  },
});

export const index = style({
  marginRight: 9,
  color: "#596176",
  fontSize: "0.55rem",
  selectors: {
    [`${tab}[aria-selected="true"] &`]: { color: "rgba(4, 13, 20, 0.52)" },
  },
  "@media": {
    [breakpoints.mobile]: { display: "none" },
  },
});
