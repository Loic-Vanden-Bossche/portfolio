import { style } from "@vanilla-extract/css";

import { breakpoints } from "@/styles/breakpoints";
import { vars } from "@/styles/theme.css";

export const root = style({
  position: "relative",
  zIndex: vars.zIndex.content,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: vars.layout.content,
  minHeight: 100,
  marginInline: "auto",
  borderTop: `1px solid ${vars.color.line}`,
  color: "#778199",
  fontSize: "0.64rem",
  letterSpacing: "0.11em",
  textTransform: "uppercase",
  "@media": {
    [breakpoints.mobile]: {
      alignItems: "flex-start",
      width: vars.layout.contentMobile,
      padding: "28px 0",
      flexDirection: "column",
      gap: 15,
    },
  },
});

export const paragraph = style({ margin: 0 });
