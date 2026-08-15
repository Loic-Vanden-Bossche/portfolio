"use client";

import { type ComponentProps, type MouseEvent as ReactMouseEvent } from "react";

import type { PhotoCategorySlug } from "@/components/portfolio/photo-library";
import { Link } from "@/i18n/navigation";

import {
  shouldAnimateStoryNavigation,
  useStoryTransition,
} from "./story-transition-provider";

type StoryTransitionLinkProps = Omit<
  ComponentProps<typeof Link>,
  "href" | "onClick"
> & {
  beforeNavigate?: () => void;
  category: PhotoCategorySlug;
  href: `/photography/${PhotoCategorySlug}`;
  onClick?: (event: ReactMouseEvent<HTMLAnchorElement>) => void;
};

export function StoryTransitionLink({
  beforeNavigate,
  category,
  href,
  onClick,
  ...props
}: StoryTransitionLinkProps) {
  const { navigateToStory } = useStoryTransition();

  return (
    <Link
      {...props}
      href={href}
      onClick={(event) => {
        onClick?.(event);
        if (!shouldAnimateStoryNavigation(event)) return;
        event.preventDefault();
        navigateToStory({
          beforeNavigate,
          category,
          href,
          sourceElement: event.currentTarget,
        });
      }}
    />
  );
}
