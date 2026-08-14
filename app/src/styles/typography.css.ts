import { style } from "@vanilla-extract/css";

import { accent } from "./runtime.css";
import { vars } from "./theme.css";

export const sectionLabel = style({
  margin: "0 0 20px",
  color: accent,
  fontSize: "0.68rem",
  fontWeight: vars.fontWeight.bold,
  letterSpacing: vars.letterSpacing.label,
  textTransform: "uppercase",
});

export const displayHeading = style({
  margin: 0,
  fontWeight: vars.fontWeight.regular,
  letterSpacing: vars.letterSpacing.display,
});
