export const breakpoints = {
  compactHeader: "screen and (max-width: 1040px)",
  mobile: "screen and (max-width: 800px)",
  narrowMobile: "screen and (max-width: 430px)",
  coarseOrReducedData:
    "screen and (pointer: coarse), screen and (prefers-reduced-data: reduce)",
  fineMotion:
    "screen and (pointer: fine) and (prefers-reduced-motion: no-preference)",
  reducedMotion: "screen and (prefers-reduced-motion: reduce)",
} as const;
