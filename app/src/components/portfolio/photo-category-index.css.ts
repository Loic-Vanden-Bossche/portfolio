import { style } from "@vanilla-extract/css";

import { breakpoints } from "@/styles/breakpoints";
import { vars } from "@/styles/theme.css";

export const root = style({
  position: "relative",
  zIndex: 2,
  width: vars.layout.content,
  margin: "0 auto clamp(40px, 7vw, 96px)",
  paddingTop: "clamp(56px, 9vw, 120px)",
  "@media": {
    [breakpoints.mobile]: { width: vars.layout.contentMobile },
  },
});

export const heading = style({
  display: "grid",
  gridTemplateColumns: "1fr minmax(260px, 520px)",
  gap: 30,
  alignItems: "end",
  marginBottom: 30,
  "@media": {
    [breakpoints.mobile]: { gridTemplateColumns: "1fr", gap: 14 },
  },
});

export const eyebrow = style({
  margin: "0 0 10px",
  color: "#72def8",
  fontSize: ".68rem",
  letterSpacing: ".17em",
  textTransform: "uppercase",
});

export const title = style({
  maxWidth: 720,
  margin: 0,
  fontSize: "clamp(2.4rem, 6vw, 6rem)",
  fontWeight: 520,
  letterSpacing: "-.065em",
  lineHeight: 0.9,
});

export const introduction = style({
  margin: 0,
  color: vars.color.text.muted,
  fontSize: "clamp(.88rem, 1.4vw, 1.05rem)",
  lineHeight: 1.65,
});

export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: 14,
  "@media": {
    "screen and (max-width: 980px)": {
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    },
    [breakpoints.mobile]: { gridTemplateColumns: "1fr" },
  },
});
