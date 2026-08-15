import {
  Bird,
  Drama,
  Flower2,
  GalleryHorizontal,
  Landmark,
  type LucideProps,
  Mountain,
  PawPrint,
  Route,
  Shapes,
  UserRound,
} from "lucide-react";

import type { PhotoIconKey } from "./photo-library";

const icons = {
  bird: Bird,
  drama: Drama,
  flower: Flower2,
  gallery: GalleryHorizontal,
  landmark: Landmark,
  mountain: Mountain,
  pawPrint: PawPrint,
  route: Route,
  shapes: Shapes,
  userRound: UserRound,
} satisfies Record<PhotoIconKey, React.ComponentType<LucideProps>>;

type PhotoCategoryIconProps = LucideProps & {
  icon: PhotoIconKey;
};

export function PhotoCategoryIcon({ icon, ...props }: PhotoCategoryIconProps) {
  const Icon = icons[icon];

  return <Icon aria-hidden="true" strokeWidth={1.6} {...props} />;
}
