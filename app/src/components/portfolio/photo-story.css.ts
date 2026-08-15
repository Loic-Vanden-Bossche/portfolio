import { style } from "@vanilla-extract/css";

import { breakpoints } from "@/styles/breakpoints";
import { vars } from "@/styles/theme.css";

import {
  storyHeroWash,
  storyImageFilter,
  storyImagePosition,
  storyImageScale,
} from "./photo-presentation-vars.css";
import { atmosphereAccent, essayBackground } from "./photo-style-vars.css";

export const root = style({
  vars: { [atmosphereAccent]: "#67dafa", [essayBackground]: "#050914" },
  position: "relative",
  minHeight: "100vh",
  overflow: "clip",
  color: "#f7f7f4",
  background: "#050914",
});

export const content = style({ position: "relative", zIndex: 2 });

export const hero = style({
  position: "relative",
  display: "grid",
  width: vars.layout.content,
  minHeight: "108svh",
  margin: "0 auto",
  padding: "150px 0 80px",
  alignItems: "end",
  gridTemplateColumns: "minmax(0,1.25fr) minmax(280px,.75fr)",
  gap: "clamp(30px,6vw,90px)",
  "@media": {
    [breakpoints.mobile]: {
      width: vars.layout.contentMobile,
      padding: "118px 0 54px",
      gridTemplateColumns: "1fr",
      alignContent: "end",
    },
  },
});

export const heroTexture = style({
  position: "absolute",
  zIndex: 0,
  inset: "96px -4% 4%",
  overflow: "hidden",
  opacity: 1,
  border: "1px solid rgba(255,255,255,.12)",
  borderRadius: 28,
  background: "#05070b",
  boxShadow: "0 30px 100px rgba(0,0,0,.38)",
  padding: 0,
  color: "inherit",
  font: "inherit",
  textAlign: "inherit",
  cursor: "pointer",
  selectors: {
    "&::after": {
      position: "absolute",
      zIndex: 1,
      inset: 0,
      background: storyHeroWash,
      content: "",
      pointerEvents: "none",
    },
    "&:focus-visible": {
      outline: "2px solid color-mix(in srgb, currentColor 75%, transparent)",
      outlineOffset: 5,
    },
  },
  "@media": {
    [breakpoints.mobile]: {
      inset: "88px -4vw 3%",
      borderRadius: 22,
    },
  },
});
export const heroIdentity = style({ position: "relative", zIndex: 2 });
export const heroImage = style({
  objectFit: "cover",
  objectPosition: storyImagePosition,
  filter: storyImageFilter,
  transform: `scale(${storyImageScale})`,
});
export const heroIndex = style({
  color: atmosphereAccent,
  fontSize: ".66rem",
  letterSpacing: ".18em",
  textTransform: "uppercase",
});
export const heroIcon = style({
  display: "grid",
  width: 62,
  height: 62,
  marginBottom: 26,
  color: atmosphereAccent,
  border: `1px solid color-mix(in srgb, ${atmosphereAccent} 48%, transparent)`,
  borderRadius: 999,
  placeItems: "center",
  background: "rgba(4,7,12,.42)",
  backdropFilter: "blur(12px)",
});
export const heroTitle = style({
  display: "flex",
  flexWrap: "wrap",
  columnGap: ".18em",
  margin: "14px 0 0",
  fontSize: "clamp(4.5rem,11vw,11rem)",
  fontWeight: 500,
  letterSpacing: "-.075em",
  lineHeight: 0.82,
});
export const heroWordClip = style({
  display: "inline-block",
  overflow: "hidden",
  paddingBottom: ".08em",
});
export const heroWord = style({
  display: "inline-block",
  willChange: "transform, opacity",
});
export const heroIntro = style({
  margin: "0 0 30px",
  color: "rgba(245,246,242,.68)",
  fontSize: "clamp(1rem,1.5vw,1.22rem)",
  lineHeight: 1.7,
});
export const heroCopy = style({
  position: "relative",
  zIndex: 2,
  alignSelf: "end",
  maxWidth: 460,
  padding: "24px 26px",
  border: "1px solid rgba(255,255,255,.1)",
  borderRadius: 20,
  background: "rgba(4,7,12,.38)",
  backdropFilter: "blur(14px)",
  "@media": {
    [breakpoints.mobile]: { padding: "20px", backdropFilter: "blur(10px)" },
  },
});
export const heroPhotoNumber = style({
  color: atmosphereAccent,
  fontSize: ".61rem",
  letterSpacing: ".16em",
  textTransform: "uppercase",
});
export const heroPhotoTitle = style({
  margin: "10px 0 12px",
  fontSize: "clamp(1.8rem,3.5vw,3.5rem)",
  fontWeight: 520,
  letterSpacing: "-.055em",
  lineHeight: 0.96,
});
export const heroNarrative = style({
  margin: 0,
  color: "rgba(245,246,242,.7)",
  lineHeight: 1.65,
});

export const story = style({ position: "relative", paddingBottom: "10vh" });
export const chapter = style({
  position: "relative",
  display: "grid",
  width: vars.layout.content,
  minHeight: "92svh",
  margin: "-3vh auto 0",
  padding: "8vh 0",
  alignItems: "center",
  gridTemplateColumns: "minmax(0,1.2fr) minmax(270px,.55fr)",
  gap: "clamp(28px,6vw,88px)",
  selectors: {
    "&:nth-child(even)": {
      gridTemplateColumns: "minmax(270px,.55fr) minmax(0,1.2fr)",
    },
  },
  "@media": {
    [breakpoints.mobile]: {
      width: vars.layout.contentMobile,
      minHeight: "auto",
      marginTop: 0,
      padding: "9vh 0",
      gridTemplateColumns: "1fr !important",
      gap: 24,
    },
  },
});
export const frame = style({
  position: "relative",
  minHeight: "min(72vh,820px)",
  overflow: "hidden",
  border: `1px solid ${vars.color.line}`,
  borderRadius: 4,
  background: "#050505",
  boxShadow: "0 28px 80px rgba(0,0,0,.28)",
  width: "100%",
  padding: 0,
  color: "inherit",
  font: "inherit",
  textAlign: "inherit",
  cursor: "pointer",
  selectors: {
    [`${chapter}:nth-child(even) &`]: {
      order: 2,
      borderRadius: "42vw 42vw 8px 8px",
    },
    [`${chapter}:nth-child(3n) &`]: { borderRadius: "50%" },
    "&:focus-visible": {
      outline: `2px solid ${atmosphereAccent}`,
      outlineOffset: 5,
    },
  },
  "@media": {
    [breakpoints.mobile]: { minHeight: "62svh", order: "initial !important" },
  },
});
export const image = style({ objectFit: "cover", willChange: "transform" });
export const copy = style({
  position: "relative",
  zIndex: 2,
  selectors: { [`${chapter}:nth-child(even) &`]: { order: 1 } },
  "@media": { [breakpoints.mobile]: { order: "initial !important" } },
});
export const chapterNumber = style({
  color: atmosphereAccent,
  fontSize: ".64rem",
  letterSpacing: ".16em",
  textTransform: "uppercase",
});
export const chapterTitle = style({
  margin: "14px 0",
  fontSize: "clamp(2.8rem,6vw,6.4rem)",
  fontWeight: 520,
  letterSpacing: "-.06em",
  lineHeight: 0.9,
});
export const narrative = style({
  maxWidth: 440,
  margin: 0,
  color: "rgba(245,246,242,.65)",
  lineHeight: 1.7,
});
export const placeholder = style({
  display: "inline-flex",
  marginTop: 22,
  padding: "8px 11px",
  color: atmosphereAccent,
  border: `1px solid color-mix(in srgb, ${atmosphereAccent} 40%, transparent)`,
  borderRadius: 999,
  fontSize: ".58rem",
  letterSpacing: ".11em",
  textTransform: "uppercase",
});
export const credit = style({
  margin: "18px 0 0",
  color: "rgba(255,255,255,.47)",
  fontSize: ".65rem",
  lineHeight: 1.55,
});
export const creditLink = style({
  color: "rgba(255,255,255,.78)",
  textDecoration: "underline",
  textUnderlineOffset: 3,
});

export const pagination = style({
  display: "grid",
  width: vars.layout.content,
  margin: "6vh auto 0",
  gridTemplateColumns: "1fr 1fr",
  gap: 14,
  "@media": {
    [breakpoints.mobile]: {
      width: vars.layout.contentMobile,
      gridTemplateColumns: "1fr",
    },
  },
});
export const paginationLink = style({
  display: "grid",
  minHeight: 180,
  padding: 24,
  alignContent: "space-between",
  color: "white",
  border: `1px solid ${vars.color.line}`,
  borderRadius: 22,
  background: "rgba(255,255,255,.035)",
  transition: "transform 260ms ease, border-color 260ms ease",
  selectors: {
    "&:hover, &:focus-visible": {
      borderColor: atmosphereAccent,
      transform: "translateY(-4px)",
    },
  },
});
export const paginationDirection = style({
  color: atmosphereAccent,
  fontSize: ".62rem",
  letterSpacing: ".14em",
  textTransform: "uppercase",
});
export const paginationTitle = style({
  display: "flex",
  alignItems: "center",
  gap: 10,
  fontSize: "clamp(1.35rem,3vw,2.2rem)",
  letterSpacing: "-.04em",
});
