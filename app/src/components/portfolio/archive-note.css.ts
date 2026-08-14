import { style } from "@vanilla-extract/css";

import { breakpoints } from "@/styles/breakpoints";
import { accent, accentSecondary } from "@/styles/runtime.css";
import { vars } from "@/styles/theme.css";
import { sectionLabel } from "@/styles/typography.css";

export const root = style({
  display: "grid",
  minHeight: "52vh",
  padding: "clamp(100px, 15vw, 220px) 0",
  placeItems: "center",
  textAlign: "center",
  "@media": {
    [breakpoints.mobile]: { minHeight: "60vh" },
  },
});

export const label = style([sectionLabel, { marginBottom: 28 }]);

export const copy = style({
  maxWidth: 920,
  margin: 0,
  color: "transparent",
  background: `linear-gradient(90deg, white, ${accent} 55%, ${accentSecondary})`,
  backgroundClip: "text",
  fontSize: "clamp(3rem, 7vw, 7.4rem)",
  fontWeight: vars.fontWeight.regular,
  letterSpacing: vars.letterSpacing.display,
  lineHeight: 0.96,
  WebkitBackgroundClip: "text",
});
