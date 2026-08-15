import { globalStyle, style } from "@vanilla-extract/css";

import { enabledDocument } from "@/components/ui/custom-cursor.css";
import { breakpoints } from "@/styles/breakpoints";

export const dialog = style({
  width: "100vw",
  maxWidth: "none",
  height: "100dvh",
  maxHeight: "none",
  margin: 0,
  padding: 0,
  overflow: "hidden",
  color: "white",
  border: 0,
  background: "transparent",
  selectors: { "&::backdrop": { background: "transparent" } },
});

globalStyle(`${enabledDocument} ${dialog}, ${enabledDocument} ${dialog} *`, {
  cursor: "default !important",
});

globalStyle(`${enabledDocument} ${dialog} button`, {
  cursor: "pointer !important",
});

export const backdrop = style({
  position: "absolute",
  inset: 0,
  background: "rgba(2,4,8,.38)",
  backdropFilter: "blur(4px) saturate(108%)",
});

export const close = style({
  position: "absolute",
  zIndex: 4,
  top: 22,
  right: 22,
  display: "grid",
  width: 48,
  height: 48,
  color: "white",
  border: "1px solid rgba(255,255,255,.18)",
  borderRadius: 999,
  placeItems: "center",
  background: "rgba(8,11,18,.6)",
  backdropFilter: "blur(14px)",
  transition: "border-color 180ms ease, background 180ms ease",
  selectors: {
    "&:hover, &:focus-visible": {
      borderColor: "rgba(255,255,255,.5)",
      background: "rgba(255,255,255,.12)",
    },
  },
});

export const layout = style({
  position: "relative",
  zIndex: 1,
  display: "grid",
  height: "100%",
  padding: "clamp(16px,2.4vw,38px)",
  gridTemplateColumns: "minmax(0,1fr) minmax(260px,340px)",
  gap: "clamp(14px,2vw,30px)",
  alignItems: "stretch",
  "@media": {
    [breakpoints.mobile]: {
      overflowY: "auto",
      padding: "74px 12px 16px",
      gridTemplateColumns: "1fr",
      gridTemplateRows: "minmax(52svh,68svh) auto",
    },
  },
});

export const stage = style({
  position: "relative",
  isolation: "isolate",
  minWidth: 0,
  minHeight: 0,
  overflow: "hidden",
  border: "1px solid rgba(255,255,255,.12)",
  borderRadius: 24,
  backgroundColor: "#020305",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  boxShadow: "0 32px 100px rgba(0,0,0,.45)",
  willChange: "transform, clip-path, opacity",
  "@media": { [breakpoints.mobile]: { borderRadius: 18 } },
});

export const image = style({
  zIndex: 1,
  objectFit: "contain",
  opacity: 0,
  transformOrigin: "center",
  willChange: "opacity, transform",
});

export const details = style({
  position: "relative",
  display: "flex",
  minHeight: 0,
  padding: "clamp(22px,3vw,34px)",
  flexDirection: "column",
  justifyContent: "space-between",
  overflow: "hidden",
  border: "1px solid rgba(255,255,255,.1)",
  borderRadius: 24,
  background: "rgba(9,12,19,.68)",
  backdropFilter: "blur(20px)",
  willChange: "transform, opacity",
  "@media": {
    [breakpoints.mobile]: { minHeight: 420, borderRadius: 18 },
  },
});

export const eyebrow = style({
  margin: 0,
  color: "rgba(138,225,255,.78)",
  fontSize: ".62rem",
  letterSpacing: ".17em",
  textTransform: "uppercase",
});

export const title = style({
  margin: "12px 0 14px",
  fontSize: "clamp(2.2rem,4vw,4.5rem)",
  fontWeight: 520,
  letterSpacing: "-.06em",
  lineHeight: 0.94,
});

export const hint = style({
  color: "rgba(255,255,255,.42)",
  fontSize: ".64rem",
  letterSpacing: ".1em",
  textTransform: "uppercase",
});

export const metadata = style({
  display: "grid",
  margin: "28px 0 0",
  gridTemplateColumns: "1fr",
  gap: 0,
});

export const datum = style({
  display: "grid",
  margin: 0,
  padding: "11px 0",
  alignItems: "start",
  gridTemplateColumns: "88px minmax(0,1fr)",
  gap: 12,
  borderTop: "1px solid rgba(255,255,255,.075)",
});
export const label = style({
  display: "block",
  margin: 0,
  color: "rgba(255,255,255,.4)",
  fontSize: ".56rem",
  letterSpacing: ".12em",
  textTransform: "uppercase",
});
export const value = style({
  display: "block",
  margin: 0,
  color: "rgba(255,255,255,.88)",
  fontSize: ".75rem",
  lineHeight: 1.4,
});
export const unavailable = style({
  margin: "28px 0 0",
  color: "rgba(255,255,255,.54)",
  fontSize: ".8rem",
  lineHeight: 1.6,
});

export const trigger = style({
  padding: 0,
  color: "inherit",
  border: 0,
  font: "inherit",
  textAlign: "inherit",
  cursor: "pointer",
});
