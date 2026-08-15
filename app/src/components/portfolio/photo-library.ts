export const photoCategorySlugs = [
  "animals",
  "birds",
  "architecture",
  "street",
  "landscape",
  "portraits",
  "nature-macro",
  "abstract-details",
  "culture-events",
  "still-life",
] as const;

export type PhotoCategorySlug = (typeof photoCategorySlugs)[number];

export type PhotoIconKey =
  | "pawPrint"
  | "bird"
  | "landmark"
  | "route"
  | "mountain"
  | "userRound"
  | "flower"
  | "shapes"
  | "drama"
  | "gallery";

export type PhotoCredit = {
  creator: string;
  license: "CC0" | "Public domain";
  sourceUrl: string;
  title: string;
};

export type PhotoAsset = {
  accent: string;
  background: string;
  categories: readonly PhotoCategorySlug[];
  file: string;
  id: string;
  placeholder?: boolean;
  primaryCategory: PhotoCategorySlug;
  credit?: PhotoCredit;
  exif?: {
    aperture?: string;
    camera?: string;
    capturedAt?: string;
    dimensions: string;
    exposure?: string;
    focalLength?: string;
    iso?: string;
    lens?: string;
  };
};

export type PhotoMotionLanguage =
  | "organic"
  | "glide"
  | "grid"
  | "track"
  | "horizon"
  | "focus"
  | "bloom"
  | "orbit"
  | "resonance"
  | "tableau";

export type PhotoCategory = {
  accent: string;
  background: string;
  icon: PhotoIconKey;
  motion: PhotoMotionLanguage;
  photoIds: readonly string[];
  presentation: {
    filter: string;
    position: string;
    scale: string;
    wash: string;
  };
  slug: PhotoCategorySlug;
};

export const photoAssets = [
  {
    id: "road",
    file: "optimized/landscape.webp",
    categories: ["landscape", "street"],
    primaryCategory: "landscape",
    background: "#07120d",
    accent: "#c8f06a",
    exif: {
      camera: "Fujifilm X-T50",
      lens: "XF16-50mmF2.8-4.8 R LM WR",
      focalLength: "16 mm · 24 mm equivalent",
      exposure: "1/4000 s",
      aperture: "f/2.8",
      iso: "ISO 1000",
      capturedAt: "2026-06-12T12:14:51",
      dimensions: "7728 × 5152 px",
    },
  },
  {
    id: "butterfly",
    file: "optimized/nature.webp",
    categories: ["nature-macro", "animals"],
    primaryCategory: "nature-macro",
    background: "#172512",
    accent: "#ff5bc8",
    exif: {
      camera: "Fujifilm X-T50",
      lens: "Sigma 100-400mm F5-6.3 DG DN OS Contemporary",
      focalLength: "400 mm · 600 mm equivalent",
      exposure: "1/180 s",
      aperture: "f/6.3",
      iso: "ISO 250",
      capturedAt: "2026-08-02T10:55:33",
      dimensions: "3058 × 4587 px",
    },
  },
  {
    id: "heron",
    file: "optimized/animals.webp",
    categories: ["birds", "animals"],
    primaryCategory: "birds",
    background: "#0b1207",
    accent: "#ffc62e",
    exif: {
      camera: "Fujifilm X-T50",
      lens: "Sigma 100-400mm F5-6.3 DG DN OS Contemporary",
      focalLength: "400 mm · 600 mm equivalent",
      exposure: "1/1000 s",
      aperture: "f/6.3",
      iso: "ISO 500",
      capturedAt: "2026-08-06T18:40:40",
      dimensions: "6864 × 5152 px",
    },
  },
  {
    id: "ridge",
    file: "optimized/landscape_2.webp",
    categories: ["landscape"],
    primaryCategory: "landscape",
    background: "#081425",
    accent: "#ff9a45",
    exif: {
      camera: "Fujifilm X-T50",
      lens: "XF16-50mmF2.8-4.8 R LM WR",
      focalLength: "16 mm · 24 mm equivalent",
      exposure: "1/250 s",
      aperture: "f/5.6",
      iso: "ISO 500",
      capturedAt: "2026-05-23T19:56:48",
      dimensions: "7728 × 5152 px",
    },
  },
  {
    id: "clocks",
    file: "optimized/architecture.webp",
    categories: ["architecture", "abstract-details"],
    primaryCategory: "architecture",
    background: "#151126",
    accent: "#ffb777",
    exif: {
      camera: "Fujifilm X-T50",
      lens: "55 mm",
      focalLength: "55 mm · 83 mm equivalent",
      exposure: "1/60 s",
      aperture: "f/1",
      iso: "ISO 500",
      capturedAt: "2026-01-01T16:47:52",
      dimensions: "5069 × 7603 px",
    },
  },
  {
    id: "metro",
    file: "optimized/urban.webp",
    categories: ["street", "architecture"],
    primaryCategory: "street",
    background: "#160e0c",
    accent: "#63e6df",
    exif: {
      camera: "Fujifilm X-T50",
      lens: "Sigma 100-400mm F5-6.3 DG DN OS Contemporary",
      focalLength: "100 mm · 150 mm equivalent",
      exposure: "1/500 s",
      aperture: "f/5",
      iso: "ISO 125",
      capturedAt: "2026-08-04T19:12:32",
      dimensions: "5233 × 3925 px",
    },
  },
  {
    id: "spiral",
    file: "optimized/shapes.webp",
    categories: ["abstract-details", "architecture"],
    primaryCategory: "abstract-details",
    background: "#130f12",
    accent: "#f2a54a",
    exif: {
      camera: "Fujifilm X-T50",
      lens: "XF16-50mmF2.8-4.8 R LM WR",
      focalLength: "50 mm · 75 mm equivalent",
      exposure: "1/60 s",
      aperture: "f/4.8",
      iso: "ISO 800",
      capturedAt: "2026-07-19T16:11:32",
      dimensions: "7727 × 4347 px",
    },
  },
  {
    id: "organ",
    file: "optimized/culture.webp",
    categories: ["culture-events", "architecture"],
    primaryCategory: "culture-events",
    background: "#0d0d0a",
    accent: "#e9d6a7",
    exif: {
      camera: "Fujifilm X-T50",
      lens: "55 mm",
      focalLength: "55 mm · 83 mm equivalent",
      exposure: "1/1000 s",
      aperture: "f/1",
      iso: "ISO 500",
      capturedAt: "2026-05-09T12:54:23",
      dimensions: "7113 × 4742 px",
    },
  },
  {
    id: "underground",
    file: "optimized/urban_2.webp",
    categories: ["street", "architecture"],
    primaryCategory: "street",
    background: "#06161b",
    accent: "#ff6a1a",
    exif: {
      camera: "Fujifilm X-T50",
      lens: "55 mm",
      focalLength: "55 mm · 83 mm equivalent",
      exposure: "1/125 s",
      aperture: "f/1",
      iso: "ISO 500",
      capturedAt: "2026-01-01T17:22:55",
      dimensions: "4967 × 7450 px",
    },
  },
  {
    id: "jellyfish",
    file: "optimized/animals_2.webp",
    categories: ["animals", "abstract-details"],
    primaryCategory: "animals",
    background: "#020718",
    accent: "#3ba7ff",
    exif: {
      camera: "Fujifilm X-T50",
      lens: "XF16-50mmF2.8-4.8 R LM WR",
      focalLength: "37.4 mm · 56 mm equivalent",
      exposure: "1/125 s",
      aperture: "f/4.1",
      iso: "ISO 3200",
      capturedAt: "2026-07-22T13:09:09",
      dimensions: "6864 × 5152 px",
    },
  },
  {
    id: "frieda-claus",
    file: "optimized/placeholders/portraits/frieda-claus.webp",
    categories: ["portraits"],
    primaryCategory: "portraits",
    background: "#171413",
    accent: "#d7bda7",
    placeholder: true,
    credit: {
      title: "Portrait of Frieda Gertrud Claus",
      creator: "Friedrich Eduard Claus",
      license: "Public domain",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:1927_Portrait-von-Frieda-Gertrud-Claus.jpg",
    },
  },
  {
    id: "jessica-meir",
    file: "optimized/placeholders/portraits/jessica-meir.webp",
    categories: ["portraits"],
    primaryCategory: "portraits",
    background: "#101820",
    accent: "#d5ecff",
    placeholder: true,
    credit: {
      title: "Jessica Meir official portrait in an EMU",
      creator: "Josh Valcarcel / NASA",
      license: "Public domain",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Jessica_Meir_official_portrait_in_an_EMU_(B%26W).jpg",
    },
  },
  {
    id: "ida-harper",
    file: "optimized/placeholders/portraits/ida-harper.webp",
    categories: ["portraits"],
    primaryCategory: "portraits",
    background: "#191512",
    accent: "#ddc3a1",
    placeholder: true,
    credit: {
      title: "Ida Husted Harper",
      creator: "Aimé Dupont; restored by Adam Cuerden",
      license: "Public domain",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Ida_Husted_Harper_photograph_by_Aime_Dupont.jpg",
    },
  },
  {
    id: "nathan-mossell",
    file: "optimized/placeholders/portraits/nathan-mossell.webp",
    categories: ["portraits"],
    primaryCategory: "portraits",
    background: "#151515",
    accent: "#d8d2c8",
    placeholder: true,
    credit: {
      title: "Nathan Francis Mossell, M.D.",
      creator: "H. D. Carns & Co.; restored by Adam Cuerden",
      license: "Public domain",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Nathan_Francis_Mossell_(1856-1946),_M.D._1882,_portrait_photograph_by_H.D._Carns_%26_Co;_Image_ID_27593990.jpg",
    },
  },
  {
    id: "photographer-studio",
    file: "optimized/placeholders/portraits/photographer-studio.webp",
    categories: ["portraits"],
    primaryCategory: "portraits",
    background: "#1a1612",
    accent: "#e6be7c",
    placeholder: true,
    credit: {
      title: "Photographer's studio, 1893",
      creator: "A. H. Wheeler",
      license: "Public domain",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Photographer-studio-1893.jpg",
    },
  },
  {
    id: "fruit-study",
    file: "optimized/placeholders/still-life/fruit-study.webp",
    categories: ["still-life"],
    primaryCategory: "still-life",
    background: "#17100d",
    accent: "#e4a659",
    placeholder: true,
    credit: {
      title: "Still Life with Fruit",
      creator: "Roger Fenton / The Metropolitan Museum of Art",
      license: "CC0",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:-Still_Life_with_Fruit-_MET_DP209008.jpg",
    },
  },
  {
    id: "vase-flowers",
    file: "optimized/placeholders/still-life/vase-flowers.webp",
    categories: ["still-life"],
    primaryCategory: "still-life",
    background: "#17140f",
    accent: "#efcc8d",
    placeholder: true,
    credit: {
      title: "Vase of Flowers",
      creator: "Unknown / The Metropolitan Museum of Art",
      license: "CC0",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:-Vase_of_Flowers-_MET_DP71312.jpg",
    },
  },
  {
    id: "books",
    file: "optimized/placeholders/still-life/books.webp",
    categories: ["still-life"],
    primaryCategory: "still-life",
    background: "#16110e",
    accent: "#cba879",
    placeholder: true,
    credit: {
      title: "Book still photography",
      creator: "Praveenapraviii",
      license: "CC0",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Book_still_photography.jpg",
    },
  },
  {
    id: "barber-tools",
    file: "optimized/placeholders/still-life/barber-tools.webp",
    categories: ["still-life"],
    primaryCategory: "still-life",
    background: "#0d1112",
    accent: "#b5d7d8",
    placeholder: true,
    credit: {
      title: "Barbershop tools in Mashhad",
      creator: "Mostafa Meraji",
      license: "CC0",
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Canon_Photography_Hairstyling_tool_barbershop_from_Iran_Mashhad_city_Mostafa_Meraji_09.jpg",
    },
  },
  {
    id: "ceramics",
    file: "optimized/placeholders/still-life/ceramics.webp",
    categories: ["still-life"],
    primaryCategory: "still-life",
    background: "#171715",
    accent: "#ddd5c1",
    placeholder: true,
    credit: {
      title: "Porcelain Bowl",
      creator: "Adbh266",
      license: "CC0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Porcelain_Bowl.jpg",
    },
  },
] as const satisfies readonly PhotoAsset[];

export const photoCategories = [
  {
    slug: "animals",
    icon: "pawPrint",
    accent: "#59c8ff",
    background: "#03101b",
    photoIds: ["jellyfish", "butterfly", "heron"],
    presentation: {
      position: "50% 48%",
      scale: "1.015",
      filter: "saturate(.98) contrast(1.02)",
      wash: "linear-gradient(90deg,rgba(3,5,9,.68) 0%,rgba(3,5,9,.12) 58%,rgba(3,5,9,.22) 100%),linear-gradient(0deg,rgba(3,5,9,.58) 0%,transparent 52%)",
    },
    motion: "organic",
  },
  {
    slug: "birds",
    icon: "bird",
    accent: "#f1cf55",
    background: "#11150b",
    photoIds: ["heron"],
    presentation: {
      position: "54% 48%",
      scale: "1.01",
      filter: "saturate(.96) contrast(1.015)",
      wash: "linear-gradient(90deg,rgba(3,5,9,.7) 0%,rgba(3,5,9,.08) 62%),linear-gradient(0deg,rgba(3,5,9,.5) 0%,transparent 48%)",
    },
    motion: "glide",
  },
  {
    slug: "architecture",
    icon: "landmark",
    accent: "#ffb777",
    background: "#171126",
    photoIds: ["clocks", "spiral", "organ", "metro", "underground"],
    presentation: {
      position: "50% 48%",
      scale: "1.01",
      filter: "saturate(.98) contrast(1.02)",
      wash: "linear-gradient(90deg,rgba(5,4,10,.7) 0%,rgba(5,4,10,.1) 60%),linear-gradient(0deg,rgba(5,4,10,.58) 0%,transparent 50%)",
    },
    motion: "grid",
  },
  {
    slug: "street",
    icon: "route",
    accent: "#65e8df",
    background: "#07171b",
    photoIds: ["metro", "underground", "road"],
    presentation: {
      position: "50% 50%",
      scale: "1.015",
      filter: "saturate(.98) contrast(1.015)",
      wash: "linear-gradient(90deg,rgba(3,7,9,.68) 0%,rgba(3,7,9,.08) 60%),linear-gradient(0deg,rgba(3,7,9,.55) 0%,transparent 50%)",
    },
    motion: "track",
  },
  {
    slug: "landscape",
    icon: "mountain",
    accent: "#d6ef73",
    background: "#07130e",
    photoIds: ["ridge", "road"],
    presentation: {
      position: "50% 52%",
      scale: "1.005",
      filter: "saturate(.98) contrast(1.01)",
      wash: "linear-gradient(90deg,rgba(3,7,6,.66) 0%,rgba(3,7,6,.06) 62%),linear-gradient(0deg,rgba(3,7,6,.48) 0%,transparent 48%)",
    },
    motion: "horizon",
  },
  {
    slug: "portraits",
    icon: "userRound",
    accent: "#e2b99a",
    background: "#171211",
    photoIds: [
      "jessica-meir",
      "frieda-claus",
      "ida-harper",
      "nathan-mossell",
      "photographer-studio",
    ],
    presentation: {
      position: "50% 38%",
      scale: "1",
      filter: "contrast(1.015)",
      wash: "linear-gradient(90deg,rgba(6,5,5,.68) 0%,rgba(6,5,5,.06) 60%),linear-gradient(0deg,rgba(6,5,5,.52) 0%,transparent 50%)",
    },
    motion: "focus",
  },
  {
    slug: "nature-macro",
    icon: "flower",
    accent: "#ff65cb",
    background: "#152311",
    photoIds: ["butterfly"],
    presentation: {
      position: "50% 50%",
      scale: "1.01",
      filter: "saturate(.98) contrast(1.01)",
      wash: "linear-gradient(90deg,rgba(5,8,4,.67) 0%,rgba(5,8,4,.05) 62%),linear-gradient(0deg,rgba(5,8,4,.48) 0%,transparent 48%)",
    },
    motion: "bloom",
  },
  {
    slug: "abstract-details",
    icon: "shapes",
    accent: "#f4a34c",
    background: "#150e13",
    photoIds: ["spiral", "jellyfish", "clocks"],
    presentation: {
      position: "50% 50%",
      scale: "1.005",
      filter: "saturate(.96) contrast(1.02)",
      wash: "linear-gradient(90deg,rgba(7,4,7,.66) 0%,rgba(7,4,7,.06) 60%),linear-gradient(0deg,rgba(7,4,7,.52) 0%,transparent 48%)",
    },
    motion: "orbit",
  },
  {
    slug: "culture-events",
    icon: "drama",
    accent: "#ebd7a4",
    background: "#11100b",
    photoIds: ["organ"],
    presentation: {
      position: "50% 46%",
      scale: "1.005",
      filter: "saturate(.96) contrast(1.015)",
      wash: "linear-gradient(90deg,rgba(6,6,4,.67) 0%,rgba(6,6,4,.06) 62%),linear-gradient(0deg,rgba(6,6,4,.52) 0%,transparent 48%)",
    },
    motion: "resonance",
  },
  {
    slug: "still-life",
    icon: "gallery",
    accent: "#dfb56c",
    background: "#17110d",
    photoIds: [
      "fruit-study",
      "vase-flowers",
      "books",
      "barber-tools",
      "ceramics",
    ],
    presentation: {
      position: "50% 50%",
      scale: "1",
      filter: "saturate(.98) contrast(1.01)",
      wash: "linear-gradient(90deg,rgba(7,5,3,.66) 0%,rgba(7,5,3,.06) 62%),linear-gradient(0deg,rgba(7,5,3,.5) 0%,transparent 48%)",
    },
    motion: "tableau",
  },
] as const satisfies readonly PhotoCategory[];

export function isPhotoCategorySlug(value: string): value is PhotoCategorySlug {
  return photoCategorySlugs.includes(value as PhotoCategorySlug);
}

export function getPhotoAsset(id: string): PhotoAsset | undefined {
  return photoAssets.find((asset) => asset.id === id);
}

export function getPhotoCategory(slug: PhotoCategorySlug): PhotoCategory {
  return photoCategories.find((category) => category.slug === slug)!;
}

export function getPhotoCategoryHero(category: PhotoCategory): PhotoAsset {
  return getPhotoAsset(category.photoIds[0])!;
}
