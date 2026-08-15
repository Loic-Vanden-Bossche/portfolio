import { style } from "@vanilla-extract/css";

import { breakpoints } from "@/styles/breakpoints";
import { vars } from "@/styles/theme.css";

export const root = style({
  position: "fixed",
  zIndex: vars.zIndex.header,
  top: 18,
  left: "50%",
  display: "grid",
  width: vars.layout.content,
  minHeight: 68,
  padding: "7px 10px 7px 22px",
  alignItems: "center",
  gridTemplateColumns: "1fr auto",
  transform: "translateX(-50%)",
  border: `1px solid ${vars.color.line}`,
  borderRadius: vars.radius.panel,
  background: "rgba(7,9,16,.72)",
  boxShadow: vars.shadow.glass,
  backdropFilter: "blur(24px) saturate(145%)",
  "@media": {
    [breakpoints.mobile]: {
      top: 10,
      width: vars.layout.contentMobile,
      minHeight: 60,
      padding: "6px 7px 6px 14px",
    },
  },
});

export const identity = style({
  display: "flex",
  alignItems: "center",
  gap: 14,
});
export const brand = style({ fontWeight: 780, letterSpacing: "-.04em" });
export const divider = style({
  width: 1,
  height: 18,
  background: vars.color.line,
});
export const story = style({
  overflow: "hidden",
  color: vars.color.text.muted,
  fontSize: ".65rem",
  letterSpacing: ".1em",
  textOverflow: "ellipsis",
  textTransform: "uppercase",
  whiteSpace: "nowrap",
  "@media": { [breakpoints.mobile]: { display: "none" } },
});
export const actions = style({ display: "flex", alignItems: "center", gap: 4 });
export const development = style({
  padding: "11px 12px",
  color: vars.color.text.muted,
  borderRadius: vars.radius.control,
  fontSize: ".66rem",
  fontWeight: 650,
  letterSpacing: ".09em",
  textTransform: "uppercase",
  selectors: { "&:hover, &:focus-visible": { color: "white" } },
  "@media": { [breakpoints.mobile]: { display: "none" } },
});
