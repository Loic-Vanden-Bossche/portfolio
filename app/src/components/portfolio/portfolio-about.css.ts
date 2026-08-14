import { style } from "@vanilla-extract/css";

import { breakpoints } from "@/styles/breakpoints";
import { vars } from "@/styles/theme.css";
import { displayHeading, sectionLabel } from "@/styles/typography.css";

export const root = style({ padding: `${vars.space.pageSection} 0` });

export const card = style({
  position: "relative",
  display: "grid",
  padding: "clamp(34px, 6vw, 78px)",
  overflow: "hidden",
  border: `1px solid ${vars.color.line}`,
  borderRadius: 30,
  background:
    "linear-gradient(135deg, rgba(17, 25, 46, 0.74), rgba(17, 12, 31, 0.64))",
  boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.06)",
  gridTemplateColumns: "0.24fr 1.76fr",
  gap: 44,
  backdropFilter: "blur(24px)",
  "@media": {
    [breakpoints.mobile]: { gridTemplateColumns: "1fr", gap: 24 },
  },
});

export const mark = style({
  color: "#626c82",
  fontSize: "0.6rem",
  letterSpacing: "0.15em",
  writingMode: "vertical-rl",
  "@media": {
    [breakpoints.mobile]: { writingMode: "initial" },
  },
});

export const label = sectionLabel;

export const title = style([
  displayHeading,
  {
    maxWidth: 1050,
    fontSize: "clamp(3rem, 6.7vw, 6.7rem)",
    lineHeight: vars.lineHeight.display,
  },
]);

export const copy = style({
  display: "grid",
  marginTop: 70,
  gridColumn: 2,
  gridTemplateColumns: "0.8fr 1.2fr",
  gap: 80,
  "@media": {
    [breakpoints.mobile]: {
      marginTop: 18,
      gridColumn: 1,
      gridTemplateColumns: "1fr",
      gap: 30,
    },
  },
});

export const description = style({
  margin: 0,
  color: vars.color.text.muted,
  fontSize: "1.08rem",
  lineHeight: 1.75,
});

export const skills = style({
  display: "flex",
  alignContent: "flex-start",
  flexWrap: "wrap",
  gap: 10,
});

export const skill = style({
  padding: "11px 15px",
  border: `1px solid ${vars.color.line}`,
  borderRadius: vars.radius.pill,
  background: "rgba(255, 255, 255, 0.035)",
  color: "#b8c1d5",
  fontSize: "0.72rem",
});
