import { style } from "@vanilla-extract/css";

import { breakpoints } from "@/styles/breakpoints";
import { vars } from "@/styles/theme.css";
import { sectionLabel } from "@/styles/typography.css";

import {
  atmosphereAccent,
  essayAccent,
  essayBackground,
} from "./photo-style-vars.css";
import type { PhotoLayout } from "./portfolio-data";

export const root = style({
  vars: {
    [essayBackground]: "#07120d",
    [essayAccent]: "#c8f06a",
    [atmosphereAccent]: essayAccent,
  },
  position: "relative",
  overflow: "clip",
  overflowAnchor: "none",
  background: "#02050b",
  color: "#f8f6f0",
  "::after": {
    position: "absolute",
    zIndex: 5,
    right: 0,
    bottom: 0,
    left: 0,
    height: "24vh",
    background: `linear-gradient(to bottom, transparent, ${vars.color.background})`,
    content: "",
    pointerEvents: "none",
  },
});

export const progress = style({
  position: "sticky",
  zIndex: vars.zIndex.progress,
  top: "50vh",
  display: "flex",
  width: 12,
  height: 0,
  marginLeft: 26,
  flexDirection: "column",
  gap: 11,
  "@media": {
    [breakpoints.mobile]: { display: "none" },
  },
});

export const progressLink = style({
  display: "grid",
  width: 12,
  height: 8,
  placeItems: "center",
});

export const progressMark = style({
  display: "block",
  width: 4,
  height: 4,
  borderRadius: "50%",
  background: essayAccent,
  opacity: 0.24,
  transformOrigin: "center",
  selectors: {
    [`${progressLink}:first-child &`]: { opacity: 1, transform: "scale(1.8)" },
  },
});

export const intro = style({
  position: "relative",
  zIndex: 2,
  display: "grid",
  width: vars.layout.content,
  minHeight: "95vh",
  marginInline: "auto",
  padding: "clamp(150px, 18vw, 240px) 0 110px",
  alignContent: "center",
  gridTemplateColumns: "minmax(0, 1.3fr) minmax(280px, 0.7fr)",
  gap: 56,
  "@media": {
    [breakpoints.mobile]: {
      width: vars.layout.contentMobile,
      minHeight: "90svh",
      padding: "128px 0 96px",
      gridTemplateColumns: "1fr",
      gap: 32,
    },
  },
});

export const introLabel = style([
  sectionLabel,
  { gridColumn: "1 / -1", color: essayAccent },
]);

export const introTitle = style({
  maxWidth: 960,
  margin: 0,
  fontSize: "clamp(4rem, 8vw, 8.6rem)",
  fontWeight: vars.fontWeight.regular,
  letterSpacing: vars.letterSpacing.displayTight,
  lineHeight: 0.88,
  "@media": {
    [breakpoints.mobile]: { fontSize: "clamp(3.7rem, 16vw, 6rem)" },
  },
});

export const introDescription = style({
  alignSelf: "end",
  maxWidth: 450,
  margin: "0 0 8px",
  color: "rgba(238, 241, 235, 0.62)",
  fontSize: "1.05rem",
  lineHeight: 1.72,
});

export const introDirection = style({
  position: "absolute",
  right: 0,
  bottom: 48,
  color: essayAccent,
  fontSize: "0.58rem",
  letterSpacing: "0.17em",
  textTransform: "uppercase",
  "@media": {
    [breakpoints.mobile]: { position: "static", marginTop: 20 },
  },
});

export const chapter = style({
  position: "relative",
  zIndex: 2,
  minHeight: "104vh",
  isolation: "isolate",
  "@media": {
    [breakpoints.mobile]: { minHeight: "102svh" },
  },
});

export const overlappingChapter = style({
  marginTop: "-9vh",
  "@media": {
    [breakpoints.mobile]: { marginTop: "-3svh" },
  },
});

export const stage = style({
  position: "relative",
  display: "grid",
  minHeight: "92vh",
  padding: "clamp(58px, 7vw, 108px) max(56px, calc((100vw - 1320px) / 2))",
  alignItems: "center",
  "@media": {
    [breakpoints.mobile]: {
      minHeight: "94svh",
      padding: "72px 14px",
      gridTemplateColumns: "1fr",
      gap: 34,
    },
  },
});

export const frame = style({
  position: "relative",
  overflow: "hidden",
  background: "#050505",
  boxShadow: "0 28px 70px rgba(0, 0, 0, 0.32)",
  "@media": {
    [breakpoints.coarseOrReducedData]: {
      boxShadow: "0 18px 44px rgba(0, 0, 0, 0.26)",
    },
  },
});

export const image = style({
  backfaceVisibility: "hidden",
  objectFit: "cover",
});
export const viewerButton = style({
  position: "absolute",
  zIndex: 3,
  inset: 0,
  padding: 0,
  border: 0,
  background: "transparent",
  cursor: "pointer",
  selectors: {
    "&:focus-visible": {
      outline: `2px solid ${essayAccent}`,
      outlineOffset: -5,
    },
  },
});
export const copy = style({
  position: "relative",
  zIndex: 3,
  color: "#f9f8f4",
});

export const meta = style({
  display: "flex",
  alignItems: "center",
  gap: 16,
  marginBottom: 22,
  color: essayAccent,
  fontSize: "0.6rem",
  fontWeight: vars.fontWeight.bold,
  letterSpacing: "0.17em",
  textTransform: "uppercase",
});

export const number = style({
  display: "grid",
  width: 38,
  height: 38,
  border: `1px solid color-mix(in srgb, ${essayAccent} 42%, transparent)`,
  borderRadius: "50%",
  placeItems: "center",
});

export const titleClip = style({ overflow: "hidden" });
export const title = style({
  maxWidth: 980,
  margin: 0,
  fontSize: "clamp(4rem, 8vw, 9rem)",
  fontWeight: vars.fontWeight.regular,
  letterSpacing: vars.letterSpacing.displayTight,
  lineHeight: 0.86,
  "@media": {
    [breakpoints.mobile]: { fontSize: "clamp(3.5rem, 16vw, 6.2rem)" },
  },
});

export const description = style({
  maxWidth: 430,
  margin: "22px 0 0",
  color: "rgba(245, 246, 240, 0.68)",
  lineHeight: vars.lineHeight.body,
});

export const categoryBadge = style({
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  marginTop: 18,
  padding: "9px 12px",
  color: essayAccent,
  border: `1px solid color-mix(in srgb, ${essayAccent} 36%, transparent)`,
  borderRadius: 999,
  background: "rgba(4,6,10,.42)",
  fontSize: ".62rem",
  fontWeight: vars.fontWeight.semibold,
  letterSpacing: ".12em",
  textTransform: "uppercase",
  backdropFilter: "blur(12px)",
  transition: "background 180ms ease, transform 180ms ease",
  selectors: {
    "&:hover, &:focus-visible": {
      background: "rgba(255,255,255,.09)",
      transform: "translateY(-2px)",
    },
  },
});

export const rule = style({
  display: "block",
  width: "min(320px, 70%)",
  height: 1,
  marginTop: 28,
  background: `linear-gradient(90deg, ${essayAccent}, transparent)`,
});

const horizonStage = style({ paddingTop: "5vh", alignContent: "center" });
const horizonFrame = style({
  width: "min(92vw, 1480px)",
  aspectRatio: "16 / 9",
  marginInline: "auto",
  borderRadius: 4,
  "@media": {
    [breakpoints.mobile]: { width: "100%", aspectRatio: "4 / 3" },
  },
});
const horizonCopy = style({
  width: vars.layout.content,
  margin: "-12vh auto 0",
  textShadow: "0 6px 30px rgba(0, 0, 0, 0.62)",
  "@media": {
    [breakpoints.mobile]: { width: "auto", margin: "-7vh 14px 0" },
  },
});
const horizonTitle = style({
  fontSize: "clamp(5rem, 10vw, 11rem)",
  "@media": {
    [breakpoints.mobile]: { fontSize: "clamp(3.5rem, 16vw, 6.2rem)" },
  },
});

const botanicalStage = style({
  gridTemplateColumns: "minmax(0, 0.8fr) minmax(330px, 0.62fr)",
  gap: "clamp(40px, 8vw, 150px)",
  "@media": {
    [breakpoints.mobile]: { gridTemplateColumns: "1fr", gap: 34 },
  },
});
const botanicalFrame = style({
  width: "min(38vw, 550px)",
  aspectRatio: "2 / 3",
  order: 2,
  borderRadius: "48% 48% 12px 12px",
  boxShadow: "0 32px 80px rgba(255, 91, 200, 0.13)",
  "@media": {
    [breakpoints.mobile]: {
      width: "min(84vw, 480px)",
      justifySelf: "center",
      order: "initial",
    },
    [breakpoints.coarseOrReducedData]: {
      boxShadow: "0 18px 44px rgba(0, 0, 0, 0.26)",
    },
  },
});
const botanicalImage = style({ height: "112% !important" as never });
const botanicalCopy = style({
  justifySelf: "end",
  maxWidth: 670,
  textAlign: "right",
  "@media": {
    [breakpoints.mobile]: {
      justifySelf: "stretch",
      maxWidth: "none",
      textAlign: "left",
    },
  },
});
const botanicalMeta = style({
  justifyContent: "flex-end",
  "@media": { [breakpoints.mobile]: { justifyContent: "flex-start" } },
});
const botanicalRule = style({
  marginLeft: "auto",
  background: `linear-gradient(270deg, ${essayAccent}, transparent)`,
  "@media": {
    [breakpoints.mobile]: {
      marginLeft: 0,
      background: `linear-gradient(90deg, ${essayAccent}, transparent)`,
    },
  },
});
const botanicalDescription = style({
  marginLeft: "auto",
  "@media": { [breakpoints.mobile]: { marginLeft: 0 } },
});

const witnessStage = style({ paddingInline: 0 });
const witnessFrame = style({
  width: "78vw",
  aspectRatio: "4 / 3",
  marginLeft: 0,
  borderRadius: "0 40vw 40vw 0",
  "@media": {
    [breakpoints.mobile]: {
      width: "94vw",
      aspectRatio: "3 / 4",
      borderRadius: "0 47vw 47vw 0",
    },
  },
});
const witnessImage = style({
  "@media": { [breakpoints.mobile]: { objectPosition: "48% center" } },
});
const witnessCopy = style({
  position: "absolute",
  right: "max(48px, calc((100vw - 1320px) / 2))",
  bottom: "12vh",
  maxWidth: 760,
  textAlign: "right",
  textShadow: "0 8px 40px #000",
  "@media": {
    [breakpoints.mobile]: {
      position: "relative",
      right: "auto",
      bottom: "auto",
      justifySelf: "stretch",
      width: "auto",
      maxWidth: "none",
      margin: "-15vh 14px 0",
      textAlign: "left",
    },
  },
});
const witnessMeta = style({
  justifyContent: "flex-end",
  "@media": { [breakpoints.mobile]: { justifyContent: "flex-start" } },
});
const witnessLeft = style({
  marginLeft: "auto",
  "@media": { [breakpoints.mobile]: { marginLeft: 0 } },
});

const panoramaStage = style({ paddingInline: 0 });
const panoramaFrame = style({
  width: "100vw",
  height: "76vh",
  borderRadius: 0,
  "@media": { [breakpoints.mobile]: { height: "62vh" } },
});
const panoramaImage = style({
  "@media": { [breakpoints.mobile]: { objectPosition: "58% center" } },
});
const panoramaCopy = style({
  width: vars.layout.content,
  margin: "-18vh auto 0",
  textShadow: "0 8px 42px rgba(0, 0, 0, 0.8)",
  "@media": {
    [breakpoints.mobile]: { width: "auto", margin: "-7vh 14px 0" },
  },
});
const panoramaTitle = style({
  maxWidth: 1180,
  fontSize: "clamp(5rem, 9.5vw, 10.5rem)",
  "@media": {
    [breakpoints.mobile]: { fontSize: "clamp(3.5rem, 16vw, 6.2rem)" },
  },
});

const clockStage = style({
  gridTemplateColumns: "minmax(330px, 0.72fr) minmax(0, 1fr)",
  gap: "clamp(50px, 9vw, 160px)",
  "@media": { [breakpoints.mobile]: { gridTemplateColumns: "1fr", gap: 34 } },
});
const clockFrame = style({
  width: "min(40vw, 560px)",
  aspectRatio: "2 / 3",
  border: "1px solid rgba(255, 183, 119, 0.3)",
  borderRadius: "280px 280px 16px 16px",
  "@media": {
    [breakpoints.mobile]: { width: "min(84vw, 480px)", justifySelf: "center" },
  },
});
const clockCopy = style({ maxWidth: 750 });
const clockTitle = style({
  fontSize: "clamp(4.5rem, 7.6vw, 8rem)",
  "@media": {
    [breakpoints.mobile]: { fontSize: "clamp(3.5rem, 16vw, 6.2rem)" },
  },
});

const cityStage = style({ justifyItems: "end" });
const cityFrame = style({
  width: "min(82vw, 1320px)",
  aspectRatio: "4 / 3",
  borderRadius: "4px 80px 4px 80px",
  "@media": { [breakpoints.mobile]: { width: "100%", aspectRatio: "3 / 4" } },
});
const cityImage = style({
  "@media": { [breakpoints.mobile]: { objectPosition: "63% center" } },
});
const cityCopy = style({
  width: "min(720px, 56vw)",
  margin: "-26vh auto 0 max(0px, calc((100vw - 1320px) / 2))",
  textShadow: "0 8px 40px #160e0c",
  "@media": { [breakpoints.mobile]: { width: "auto", margin: "-13vh 0 0" } },
});

const spiralStage = style({ justifyItems: "center" });
const spiralFrame = style({
  width: "min(78vw, 1180px)",
  aspectRatio: "16 / 9",
  borderRadius: "50%",
  "@media": { [breakpoints.mobile]: { width: "100%", aspectRatio: "1" } },
});
const spiralCopy = style({
  position: "absolute",
  maxWidth: 880,
  textAlign: "center",
  textShadow: "0 8px 45px rgba(0, 0, 0, 0.9)",
  "@media": { [breakpoints.mobile]: { width: "calc(100% - 40px)" } },
});
const spiralCentered = style({ justifyContent: "center" });
const spiralMargin = style({ marginRight: "auto", marginLeft: "auto" });

const monumentStage = style({ paddingInline: 0 });
const monumentFrame = style({
  width: "min(88vw, 1500px)",
  aspectRatio: "3 / 2",
  marginInline: "auto",
  borderRadius: "220px 220px 10px 10px",
  "@media": {
    [breakpoints.mobile]: {
      width: "100%",
      aspectRatio: "3 / 4",
      borderRadius: "48vw 48vw 8px 8px",
    },
  },
});
const monumentImage = style({
  "@media": { [breakpoints.mobile]: { objectPosition: "54% center" } },
});
const monumentCopy = style({
  width: vars.layout.content,
  margin: "-16vh auto 0",
  textShadow: "0 8px 40px #000",
  "@media": {
    [breakpoints.mobile]: { width: "auto", margin: "-7vh 14px 0" },
  },
});

const nightlineStage = style({
  minHeight: "112vh",
  paddingBlock: "10vh",
  gridTemplateColumns: "minmax(0, 1fr) minmax(300px, 0.52fr)",
  gap: 60,
  "@media": {
    [breakpoints.mobile]: {
      minHeight: "116svh",
      gridTemplateColumns: "1fr",
      gap: 34,
    },
  },
});
const nightlineFrame = style({
  width: "min(38vw, 560px)",
  height: "110vh",
  minHeight: 760,
  order: 2,
  borderRadius: "280px 280px 20px 20px",
  boxShadow: "0 0 80px rgba(255, 106, 26, 0.12)",
  "@media": {
    [breakpoints.mobile]: {
      width: "min(84vw, 480px)",
      height: "96svh",
      minHeight: 650,
      justifySelf: "center",
      order: "initial",
    },
    [breakpoints.coarseOrReducedData]: {
      boxShadow: "0 18px 44px rgba(0, 0, 0, 0.26)",
    },
  },
});
const nightlineImage = style({
  height: "122% !important" as never,
  top: "10% !important" as never,
});
const nightlineCopy = style({
  zIndex: 4,
  width: "68vw",
  marginRight: "-25vw",
  "@media": {
    [breakpoints.mobile]: {
      width: "calc(100vw - 28px)",
      margin: "-14vh 0 0",
      order: 2,
    },
  },
});
const nightlineTitle = style({
  whiteSpace: "nowrap",
  fontSize: "clamp(6rem, 12vw, 13rem)",
  "@media": {
    [breakpoints.mobile]: {
      whiteSpace: "normal",
      fontSize: "clamp(4.5rem, 20vw, 7rem)",
    },
  },
});

const abyssChapter = style({
  minHeight: "104vh",
  "@media": { [breakpoints.mobile]: { minHeight: "102svh" } },
});
const abyssStage = style({
  position: "relative",
  height: "100vh",
  padding: 0,
  "@media": { [breakpoints.mobile]: { height: "100svh" } },
});
const abyssFrame = style({
  position: "absolute",
  inset: 0,
  width: "100vw",
  height: "100vh",
  borderRadius: 0,
  boxShadow: "0 0 100px rgba(70, 131, 255, 0.1)",
  maskImage: "linear-gradient(to bottom, #000 0%, #000 82%, transparent 100%)",
  "::after": {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(circle at 62% 48%, transparent 20%, rgba(2, 7, 24, 0.1) 66%), linear-gradient(to top, rgba(2, 7, 24, 0.48), transparent 44%)",
    content: "",
  },
  "@media": {
    [breakpoints.mobile]: { height: "100svh" },
    [breakpoints.coarseOrReducedData]: {
      boxShadow: "0 18px 44px rgba(0, 0, 0, 0.26)",
    },
  },
});
const abyssImage = style({
  "@media": { [breakpoints.mobile]: { objectPosition: "42% center" } },
});
const abyssCopy = style({
  alignSelf: "end",
  width: vars.layout.content,
  margin: "0 auto 9vh",
  textShadow: "0 10px 50px #020718",
  "@media": {
    [breakpoints.mobile]: { width: "calc(100% - 28px)", marginBottom: "7vh" },
  },
});
const abyssTitle = style({
  fontSize: "clamp(5.5rem, 11vw, 12rem)",
  "@media": {
    [breakpoints.mobile]: { fontSize: "clamp(3.5rem, 16vw, 6.2rem)" },
  },
});

export const chapterLayout: Record<PhotoLayout, string> = {
  abyss: abyssChapter,
  botanical: "",
  city: "",
  clock: "",
  horizon: "",
  monument: "",
  nightline: "",
  panorama: "",
  spiral: "",
  witness: "",
};
export const stageLayout: Record<PhotoLayout, string> = {
  abyss: abyssStage,
  botanical: botanicalStage,
  city: cityStage,
  clock: clockStage,
  horizon: horizonStage,
  monument: monumentStage,
  nightline: nightlineStage,
  panorama: panoramaStage,
  spiral: spiralStage,
  witness: witnessStage,
};
export const frameLayout: Record<PhotoLayout, string> = {
  abyss: abyssFrame,
  botanical: botanicalFrame,
  city: cityFrame,
  clock: clockFrame,
  horizon: horizonFrame,
  monument: monumentFrame,
  nightline: nightlineFrame,
  panorama: panoramaFrame,
  spiral: spiralFrame,
  witness: witnessFrame,
};
export const imageLayout: Record<PhotoLayout, string> = {
  abyss: abyssImage,
  botanical: botanicalImage,
  city: cityImage,
  clock: "",
  horizon: "",
  monument: monumentImage,
  nightline: nightlineImage,
  panorama: panoramaImage,
  spiral: "",
  witness: witnessImage,
};
export const copyLayout: Record<PhotoLayout, string> = {
  abyss: abyssCopy,
  botanical: botanicalCopy,
  city: cityCopy,
  clock: clockCopy,
  horizon: horizonCopy,
  monument: monumentCopy,
  nightline: nightlineCopy,
  panorama: panoramaCopy,
  spiral: spiralCopy,
  witness: witnessCopy,
};
export const metaLayout: Record<PhotoLayout, string> = {
  abyss: "",
  botanical: botanicalMeta,
  city: "",
  clock: "",
  horizon: "",
  monument: "",
  nightline: "",
  panorama: "",
  spiral: spiralCentered,
  witness: witnessMeta,
};
export const titleLayout: Record<PhotoLayout, string> = {
  abyss: abyssTitle,
  botanical: "",
  city: "",
  clock: clockTitle,
  horizon: horizonTitle,
  monument: "",
  nightline: nightlineTitle,
  panorama: panoramaTitle,
  spiral: "",
  witness: "",
};
export const ruleLayout: Record<PhotoLayout, string> = {
  abyss: "",
  botanical: botanicalRule,
  city: "",
  clock: "",
  horizon: "",
  monument: "",
  nightline: "",
  panorama: "",
  spiral: spiralMargin,
  witness: witnessLeft,
};
export const descriptionLayout: Record<PhotoLayout, string> = {
  abyss: "",
  botanical: botanicalDescription,
  city: "",
  clock: "",
  horizon: "",
  monument: "",
  nightline: "",
  panorama: "",
  spiral: spiralMargin,
  witness: witnessLeft,
};

export const botanicalAtmosphere = style({
  position: "absolute",
  zIndex: 2,
  inset: 0,
  overflow: "hidden",
  pointerEvents: "none",
});
export const botanicalAura = style({
  position: "absolute",
  top: "20%",
  left: "42%",
  width: "48%",
  aspectRatio: "1",
  border: `1px solid color-mix(in srgb, ${essayAccent} 62%, transparent)`,
  borderRadius: "46% 54% 52% 48%",
  boxShadow: "inset 0 0 0 12px rgba(255, 255, 255, 0.025)",
  rotate: "12deg",
});
export const pollen = style({
  position: "absolute",
  width: 7,
  height: 7,
  borderRadius: "50%",
  background: essayAccent,
  boxShadow: `0 0 10px color-mix(in srgb, ${essayAccent} 70%, transparent)`,
  selectors: {
    "&:nth-child(2)": { top: "30%", left: "28%" },
    "&:nth-child(3)": { top: "41%", left: "72%", width: 4, height: 4 },
    "&:nth-child(4)": { top: "58%", left: "48%", width: 5, height: 5 },
    "&:nth-child(5)": { top: "68%", left: "80%" },
    "&:nth-child(6)": { top: "76%", left: "23%", width: 4, height: 4 },
  },
});

export const timeOrbit = style({
  position: "absolute",
  zIndex: 2,
  top: "20%",
  left: "19%",
  width: "clamp(110px, 13vw, 190px)",
  aspectRatio: "1",
  pointerEvents: "none",
  translate: "-50% -50%",
});
const timeElement = style({ position: "absolute", display: "block" });
export const timeRing = style([timeElement, { borderRadius: "50%" }]);
export const timeRingOuter = style({
  inset: 0,
  border: "1px dashed rgba(255, 210, 164, 0.84)",
});
export const timeRingInner = style({
  inset: "17%",
  border: `1px solid color-mix(in srgb, ${essayAccent} 72%, transparent)`,
});
export const timeHand = style([
  timeElement,
  {
    bottom: "50%",
    left: "50%",
    width: 1,
    height: "38%",
    background: `linear-gradient(to top, ${essayAccent}, white)`,
    transformOrigin: "50% 100%",
    translate: "-50% 0",
    rotate: "32deg",
  },
]);
export const timeCenter = style([
  timeElement,
  {
    top: "50%",
    left: "50%",
    width: 9,
    height: 9,
    border: "2px solid #fff5e9",
    borderRadius: "50%",
    background: essayAccent,
    translate: "-50% -50%",
  },
]);

export const shutters = style({
  position: "absolute",
  zIndex: 2,
  inset: 0,
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  pointerEvents: "none",
});
export const shutter = style({
  background: "#0d0d0a",
  selectors: {
    "&:first-child": { borderRight: "1px solid rgba(233, 214, 167, 0.24)" },
  },
});

export const pulseRings = style({
  position: "absolute",
  zIndex: 2,
  top: "48%",
  left: "58%",
  width: "min(58vw, 760px)",
  aspectRatio: "1",
  pointerEvents: "none",
  translate: "-50% -50%",
  "@media": { [breakpoints.coarseOrReducedData]: { display: "none" } },
});
export const pulseRing = style({
  position: "absolute",
  inset: 0,
  border: "1px solid rgba(123, 225, 255, 0.78)",
  borderRadius: "50%",
  transformOrigin: "center",
});
