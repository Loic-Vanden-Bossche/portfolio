import { style } from "@vanilla-extract/css";

import { breakpoints } from "@/styles/breakpoints";
import { vars } from "@/styles/theme.css";

export const root = style({
  padding: `${vars.space.pageSection} 0`,
});

export const photoRoot = style({
  width: "100vw",
  marginLeft: "calc(50% - 50vw)",
  padding: 0,
});

export const grid = style({
  display: "grid",
  gridTemplateColumns: "1.15fr 0.85fr",
  gap: 18,
  "@media": {
    [breakpoints.mobile]: { gridTemplateColumns: "1fr" },
  },
});
