import { style } from "@vanilla-extract/css";

import { breakpoints } from "@/styles/breakpoints";
import { accent } from "@/styles/runtime.css";
import { vars } from "@/styles/theme.css";

export const root = style({
  position: "fixed",
  zIndex: vars.zIndex.header,
  top: 18,
  left: "50%",
  display: "grid",
  alignItems: "center",
  width: vars.layout.content,
  minHeight: 70,
  marginInline: "auto",
  padding: "7px 10px 7px 22px",
  transform: "translateX(-50%)",
  border: `1px solid ${vars.color.line}`,
  borderRadius: vars.radius.panel,
  background: "rgba(7, 9, 16, 0.72)",
  boxShadow: vars.shadow.glass,
  gridTemplateColumns: "1fr auto 1fr",
  backdropFilter: "blur(24px) saturate(145%)",
  "@media": {
    [breakpoints.compactHeader]: {
      gridTemplateColumns: "auto 1fr auto",
      gap: 14,
    },
    [breakpoints.mobile]: {
      top: 10,
      width: vars.layout.contentMobile,
      minHeight: 62,
      padding: "6px 7px 6px 14px",
      gap: 8,
    },
  },
});

export const brand = style({
  justifySelf: "start",
  fontSize: "1rem",
  fontWeight: vars.fontWeight.heavy,
  letterSpacing: "-0.04em",
  "@media": {
    [breakpoints.mobile]: { fontSize: "0.9rem" },
  },
});

export const brandAccent = style({ color: accent });

export const navigation = style({
  display: "flex",
  alignItems: "center",
  justifySelf: "end",
  gap: 6,
});

export const navigationLink = style({
  padding: "11px 12px",
  borderRadius: vars.radius.control,
  color: vars.color.text.muted,
  fontSize: "0.66rem",
  fontWeight: vars.fontWeight.semibold,
  letterSpacing: "0.09em",
  textTransform: "uppercase",
  transition: `color ${vars.motion.duration.fast} ease, background ${vars.motion.duration.fast} ease`,
  selectors: {
    "&:hover, &:focus-visible": {
      color: "white",
      background: "rgba(255, 255, 255, 0.06)",
    },
  },
  "@media": {
    [breakpoints.compactHeader]: { display: "none" },
  },
});
