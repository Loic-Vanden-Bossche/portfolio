import { createGlobalTheme } from "@vanilla-extract/css";

export const vars = createGlobalTheme(":root", {
  color: {
    background: "#05060b",
    surface: "rgba(15, 18, 31, 0.58)",
    line: "rgba(184, 213, 255, 0.15)",
    text: {
      primary: "#f4f7ff",
      muted: "#99a3bc",
    },
    accent: {
      cyan: "#55e6ff",
      blue: "#4b79ff",
      violet: "#9b6cff",
      photography: "#8be8f5",
      photographySecondary: "#ffc07a",
    },
  },
  font: {
    body: "Arial, Helvetica, sans-serif",
    mono: "monospace",
  },
  fontWeight: {
    regular: "400",
    semibold: "600",
    bold: "700",
    heavy: "800",
  },
  letterSpacing: {
    display: "-0.065em",
    displayTight: "-0.075em",
    label: "0.2em",
    meta: "0.14em",
  },
  lineHeight: {
    display: "0.94",
    body: "1.7",
  },
  radius: {
    control: "9px",
    panel: "20px",
    card: "26px",
    pill: "999px",
  },
  shadow: {
    glass: "0 18px 70px rgba(0, 0, 0, 0.36)",
    card: "0 24px 80px rgba(0, 0, 0, 0.28)",
  },
  space: {
    pageSection: "clamp(100px, 13vw, 180px)",
    pageMobile: "14px",
    pageDesktop: "24px",
  },
  layout: {
    content: "min(100% - 48px, 1320px)",
    contentMobile: "min(100% - 28px, 1320px)",
    maxWidth: "1320px",
  },
  motion: {
    duration: {
      fast: "180ms",
      normal: "220ms",
      slow: "700ms",
    },
    easing: {
      standard: "ease",
      expressive: "cubic-bezier(0.2, 0.8, 0.2, 1)",
    },
  },
  zIndex: {
    base: "0",
    content: "1",
    progress: "8",
    floatingControl: "18",
    header: "20",
    transition: "100",
    cursor: "200",
  },
});
