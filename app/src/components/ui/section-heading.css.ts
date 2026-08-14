import { style } from "@vanilla-extract/css";

import { breakpoints } from "@/styles/breakpoints";
import { vars } from "@/styles/theme.css";
import { displayHeading, sectionLabel } from "@/styles/typography.css";

export const root = style({
  display: "grid",
  alignItems: "end",
  marginBottom: 60,
  gridTemplateColumns: "1.25fr 0.75fr",
  gap: 64,
  "@media": {
    [breakpoints.mobile]: {
      marginBottom: 38,
      gridTemplateColumns: "1fr",
      gap: 30,
    },
  },
});

export const label = sectionLabel;

export const title = style([
  displayHeading,
  {
    fontSize: "clamp(3rem, 6.7vw, 6.7rem)",
    lineHeight: vars.lineHeight.display,
  },
]);

export const introduction = style({
  maxWidth: 450,
  margin: "0 0 6px",
  color: vars.color.text.muted,
  lineHeight: vars.lineHeight.body,
});
