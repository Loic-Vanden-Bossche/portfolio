export const portfolioModes = ["photography", "development"] as const;

export type PortfolioMode = (typeof portfolioModes)[number];

export type PortfolioProject = {
  index: string;
  key: string;
  tone: string;
};

export type PhotoLayout =
  | "abyss"
  | "botanical"
  | "city"
  | "clock"
  | "horizon"
  | "monument"
  | "nightline"
  | "panorama"
  | "spiral"
  | "witness";

export const developmentProjects = [
  { index: "01", key: "interfaces", tone: "cyan" },
  { index: "02", key: "systems", tone: "violet" },
  { index: "03", key: "experiments", tone: "blue" },
] as const satisfies readonly PortfolioProject[];

export type PhotoChapter = {
  accent: string;
  animation: string;
  background: string;
  file: string;
  index: string;
  key: string;
  layout: PhotoLayout;
};

export const photoChapters = [
  {
    index: "01",
    key: "road",
    file: "optimized/landscape.webp",
    layout: "horizon",
    animation: "horizon",
    background: "#07120d",
    accent: "#c8f06a",
  },
  {
    index: "02",
    key: "butterfly",
    file: "optimized/nature.webp",
    layout: "botanical",
    animation: "focus",
    background: "#172512",
    accent: "#ff5bc8",
  },
  {
    index: "03",
    key: "heron",
    file: "optimized/animals.webp",
    layout: "witness",
    animation: "glide",
    background: "#0b1207",
    accent: "#ffc62e",
  },
  {
    index: "04",
    key: "ridge",
    file: "optimized/landscape_2.webp",
    layout: "panorama",
    animation: "summit",
    background: "#081425",
    accent: "#ff9a45",
  },
  {
    index: "05",
    key: "clocks",
    file: "optimized/architecture.webp",
    layout: "clock",
    animation: "perspective",
    background: "#151126",
    accent: "#ffb777",
  },
  {
    index: "06",
    key: "metro",
    file: "optimized/urban.webp",
    layout: "city",
    animation: "arrival",
    background: "#160e0c",
    accent: "#63e6df",
  },
  {
    index: "07",
    key: "spiral",
    file: "optimized/shapes.webp",
    layout: "spiral",
    animation: "orbit",
    background: "#130f12",
    accent: "#f2a54a",
  },
  {
    index: "08",
    key: "organ",
    file: "optimized/culture.webp",
    layout: "monument",
    animation: "shutters",
    background: "#0d0d0a",
    accent: "#e9d6a7",
  },
  {
    index: "09",
    key: "underground",
    file: "optimized/urban_2.webp",
    layout: "nightline",
    animation: "platform",
    background: "#06161b",
    accent: "#ff6a1a",
  },
  {
    index: "10",
    key: "jellyfish",
    file: "optimized/animals_2.webp",
    layout: "abyss",
    animation: "pulse",
    background: "#020718",
    accent: "#3ba7ff",
  },
] as const satisfies readonly PhotoChapter[];

export const portfolioSkills = {
  photography: ["documentary", "portrait", "editorial", "light"],
  development: ["next", "typescript", "three", "motion"],
} as const satisfies Record<PortfolioMode, readonly string[]>;

export function getModeNumber(mode: PortfolioMode) {
  return `0${portfolioModes.indexOf(mode) + 1}`;
}
