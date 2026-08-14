import { style } from "@vanilla-extract/css";

import { breakpoints } from "@/styles/breakpoints";
import { accent } from "@/styles/runtime.css";
import { vars } from "@/styles/theme.css";

export const root = style({
  display: "flex",
  gap: 2,
  padding: 3,
  border: `1px solid ${vars.color.line}`,
  borderRadius: 10,
  background: "rgba(255, 255, 255, 0.035)",
  "@media": {
    [breakpoints.narrowMobile]: { gap: 0, padding: 2 },
  },
});

export const option = style({
  minWidth: 30,
  padding: "7px 6px",
  border: 0,
  borderRadius: 7,
  color: vars.color.text.muted,
  background: "transparent",
  fontSize: "0.59rem",
  fontWeight: vars.fontWeight.bold,
  letterSpacing: "0.07em",
  cursor: "pointer",
  selectors: {
    "&:hover, &:focus-visible": { color: "white" },
  },
  "@media": {
    [breakpoints.mobile]: { minWidth: 27, paddingInline: 4 },
    [breakpoints.narrowMobile]: { minWidth: 24, fontSize: "0.53rem" },
  },
});

export const active = style({
  color: "#061017",
  background: accent,
});
