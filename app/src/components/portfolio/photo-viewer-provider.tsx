"use client";

import gsap from "gsap";
import { X } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffectEvent,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { flushSync } from "react-dom";

import { useSmoothScroll } from "@/components/motion/smooth-scroll-provider";

import type { PhotoAsset } from "./photo-library";
import * as styles from "./photo-viewer.css";

type PhotoViewerRequest = {
  asset: PhotoAsset;
  sourceElement: HTMLElement;
};

type ActivePhoto = PhotoViewerRequest;

type PhotoViewerContextValue = {
  openPhoto: (request: PhotoViewerRequest) => void;
};

const PhotoViewerContext = createContext<PhotoViewerContextValue | null>(null);

export function usePhotoViewer() {
  const context = useContext(PhotoViewerContext);
  if (!context) {
    throw new Error("usePhotoViewer must be used within PhotoViewerProvider");
  }
  return context;
}

export function PhotoViewerProvider({ children }: { children: ReactNode }) {
  const t = useTranslations("PhotographyArchive");
  const locale = useLocale();
  const smoothScroll = useSmoothScroll();
  const dialog = useRef<HTMLDialogElement>(null);
  const backdrop = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const fullImage = useRef<HTMLImageElement>(null);
  const details = useRef<HTMLElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const closing = useRef(false);
  const [active, setActive] = useState<ActivePhoto | null>(null);

  function finishClose() {
    timeline.current?.kill();
    timeline.current = null;
    dialog.current?.close();
    smoothScroll.current?.start();
    delete document.documentElement.dataset.photoViewerOpen;
    const source = active?.sourceElement;
    setActive(null);
    closing.current = false;
    source?.focus({ preventScroll: true });
  }

  const finishCloseEvent = useEffectEvent(finishClose);

  function closePhoto() {
    if (!active || closing.current) return;
    closing.current = true;
    if (!stage.current || !timeline.current) {
      finishClose();
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      finishClose();
      return;
    }

    timeline.current.timeScale(2.8).reverse();
  }

  function openPhoto({ asset, sourceElement }: PhotoViewerRequest) {
    if (active) return;
    flushSync(() => setActive({ asset, sourceElement }));
  }

  useLayoutEffect(() => {
    if (!active || !dialog.current || !stage.current) return;
    const currentDialog = dialog.current;
    const currentStage = stage.current;
    currentDialog.showModal();
    smoothScroll.current?.stop();
    document.documentElement.dataset.photoViewerOpen = "true";

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) {
      gsap.set(
        [
          backdrop.current,
          currentStage,
          details.current,
          fullImage.current,
          closeButton.current,
        ],
        { clearProps: "all" },
      );
      gsap.set(fullImage.current, { opacity: 1, scale: 1 });
      return;
    }

    timeline.current = gsap
      .timeline({
        defaults: { ease: "power2.inOut", overwrite: "auto" },
        onReverseComplete: finishCloseEvent,
        paused: true,
      })
      .fromTo(
        backdrop.current,
        { opacity: 0 },
        { duration: 0.52, opacity: 1 },
        0,
      )
      .fromTo(
        currentStage,
        {
          clipPath: "inset(2.5% 2% 2.5% 2% round 30px)",
          opacity: 0,
          scale: 0.975,
          y: 12,
        },
        {
          clipPath: "inset(0% 0% 0% 0% round 24px)",
          duration: 0.72,
          opacity: 1,
          scale: 1,
          y: 0,
        },
        0.04,
      )
      .fromTo(
        fullImage.current,
        { opacity: 0, scale: 1.025 },
        { duration: 0.76, opacity: 1, scale: 1 },
        0.08,
      )
      .fromTo(
        details.current,
        { opacity: 0, x: 16 },
        { duration: 0.62, opacity: 1, x: 0 },
        0.12,
      )
      .fromTo(
        closeButton.current,
        { opacity: 0, scale: 0.92 },
        { duration: 0.44, opacity: 1, scale: 1 },
        0.22,
      )
      .play(0);

    return () => {
      timeline.current?.kill();
    };
  }, [active, smoothScroll]);

  const exif = active?.asset.exif;
  const metadata = active
    ? [
        ["camera", exif?.camera],
        ["lens", exif?.lens],
        ["focalLength", exif?.focalLength],
        ["exposure", exif?.exposure],
        ["aperture", exif?.aperture],
        ["iso", exif?.iso],
        [
          "capturedAt",
          exif?.capturedAt
            ? new Intl.DateTimeFormat(locale, {
                dateStyle: "medium",
                timeStyle: "short",
              }).format(new Date(exif.capturedAt))
            : undefined,
        ],
        ["dimensions", exif?.dimensions],
      ].filter((entry): entry is [string, string] => Boolean(entry[1]))
    : [];

  return (
    <PhotoViewerContext.Provider value={{ openPhoto }}>
      {children}
      {active ? (
        <dialog
          aria-labelledby="photo-viewer-title"
          className={styles.dialog}
          onCancel={(event) => {
            event.preventDefault();
            closePhoto();
          }}
          onClick={(event) => {
            if (event.target === dialog.current) closePhoto();
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              event.preventDefault();
              closePhoto();
            }
          }}
          ref={dialog}
        >
          <div
            className={styles.backdrop}
            onClick={closePhoto}
            ref={backdrop}
          />
          <button
            aria-label={t("viewer.close")}
            autoFocus
            className={styles.close}
            onClick={closePhoto}
            ref={closeButton}
            type="button"
          >
            <X aria-hidden="true" size={20} />
          </button>
          <div className={styles.layout} data-lenis-prevent>
            <div
              className={styles.stage}
              data-photo-viewer-stage=""
              ref={stage}
            >
              <Image
                alt={t(`images.${active.asset.id}.alt`)}
                className={styles.image}
                fill
                priority
                quality={72}
                ref={fullImage}
                sizes="(max-width: 720px) 100vw, 78vw"
                src={`/img/sections/${active.asset.file}`}
              />
            </div>
            <aside className={styles.details} ref={details}>
              <div>
                <p className={styles.eyebrow}>{t("viewer.technical")}</p>
                <h2 className={styles.title} id="photo-viewer-title">
                  {t(`images.${active.asset.id}.title`)}
                </h2>
                {metadata.length ? (
                  <dl className={styles.metadata}>
                    {metadata.map(([label, value]) => (
                      <div className={styles.datum} key={label}>
                        <dt className={styles.label}>{t(`viewer.${label}`)}</dt>
                        <dd className={styles.value}>{value}</dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className={styles.unavailable}>
                    {t("viewer.unavailable")}
                  </p>
                )}
              </div>
              <span className={styles.hint}>{t("viewer.hint")}</span>
            </aside>
          </div>
        </dialog>
      ) : null}
    </PhotoViewerContext.Provider>
  );
}
