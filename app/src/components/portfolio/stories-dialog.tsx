"use client";

import gsap from "gsap";
import { BookOpen, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useEffectEvent, useRef, useState } from "react";

import { useSmoothScroll } from "@/components/motion/smooth-scroll-provider";

import { PhotoCategoryCard } from "./photo-category-card";
import { photoCategories } from "./photo-library";
import * as styles from "./stories-dialog.css";

export function StoriesDialog() {
  const t = useTranslations("PhotographyArchive.navigation");
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const smoothScroll = useSmoothScroll();
  const [isOpen, setIsOpen] = useState(false);
  const releaseSmoothScroll = useEffectEvent(() => {
    if (!document.documentElement.dataset.storyTransitioning) {
      smoothScroll.current?.start();
    }
  });

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;

    function handleClose() {
      releaseSmoothScroll();
      delete document.documentElement.dataset.storiesDialogOpen;
      setIsOpen(false);
      trigger.current?.focus({ preventScroll: true });
    }

    element.addEventListener("close", handleClose);
    return () => {
      element.removeEventListener("close", handleClose);
      releaseSmoothScroll();
      delete document.documentElement.dataset.storiesDialogOpen;
    };
  }, []);

  useEffect(() => {
    if (!isOpen || !dialog.current) return;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) return;

    const context = gsap.context(() => {
      gsap.from("[data-category-card]", {
        duration: 0.55,
        ease: "power3.out",
        opacity: 0,
        stagger: 0.045,
        y: 28,
      });
      gsap.from("[data-category-icon]", {
        duration: 0.65,
        ease: "back.out(1.6)",
        rotate: -24,
        scale: 0.45,
        stagger: 0.045,
      });
    }, dialog);

    return () => context.revert();
  }, [isOpen]);

  function openDialog() {
    if (!dialog.current || dialog.current.open) return;
    smoothScroll.current?.stop();
    document.documentElement.dataset.storiesDialogOpen = "true";
    dialog.current.showModal();
    setIsOpen(true);
  }

  function closeDialog() {
    const element = dialog.current;
    if (!element?.open) {
      if (!document.documentElement.dataset.storyTransitioning) {
        smoothScroll.current?.start();
      }
      delete document.documentElement.dataset.storiesDialogOpen;
      return;
    }
    element.close();
  }

  return (
    <>
      <button
        aria-haspopup="dialog"
        className={styles.trigger}
        onClick={openDialog}
        ref={trigger}
        type="button"
      >
        <BookOpen aria-hidden="true" size={15} strokeWidth={1.7} />
        {t("stories")}
      </button>

      <dialog
        aria-labelledby="stories-dialog-title"
        className={styles.dialog}
        onCancel={(event) => {
          event.preventDefault();
          closeDialog();
        }}
        onClick={(event) => {
          if (event.target === dialog.current) closeDialog();
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") closeDialog();
        }}
        ref={dialog}
      >
        <div className={styles.inner} data-lenis-prevent>
          <header className={styles.header}>
            <div>
              <p className={styles.eyebrow}>{t("eyebrow")}</p>
              <h2 className={styles.title} id="stories-dialog-title">
                {t("title")}
              </h2>
            </div>
            <button
              aria-label={t("close")}
              className={styles.close}
              onClick={closeDialog}
              type="button"
            >
              <X aria-hidden="true" size={18} />
            </button>
          </header>
          <div className={styles.grid}>
            {photoCategories.map((category) => (
              <PhotoCategoryCard
                beforeNavigate={closeDialog}
                category={category}
                compact
                key={category.slug}
              />
            ))}
          </div>
        </div>
      </dialog>
    </>
  );
}
