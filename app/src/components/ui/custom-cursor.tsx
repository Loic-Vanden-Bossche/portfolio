"use client";

import gsap from "gsap";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

import * as styles from "./custom-cursor.css";

type CursorMode = "default" | "link" | "switch" | "view";

function resolveCursorMode(target: EventTarget | null): CursorMode {
  if (!(target instanceof Element)) return "default";

  const interactive = target.closest<HTMLElement>("[data-cursor], a, button");
  const requestedMode = interactive?.dataset.cursor;

  if (
    requestedMode === "link" ||
    requestedMode === "switch" ||
    requestedMode === "view"
  ) {
    return requestedMode;
  }

  if (interactive?.matches("button")) return "switch";
  if (interactive?.matches("a")) return "link";
  return "default";
}

export function CustomCursor() {
  const primary = useRef<HTMLSpanElement>(null);
  const follower = useRef<HTMLSpanElement>(null);
  const [mode, setMode] = useState<CursorMode>("default");
  const t = useTranslations("Portfolio.cursor");

  useEffect(() => {
    const supportsCursor = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (
      !supportsCursor ||
      reducedMotion ||
      !primary.current ||
      !follower.current
    ) {
      return;
    }

    const rootElement = document.documentElement;
    const primaryCursor = primary.current;
    const followerCursor = follower.current;
    const movePrimaryX = gsap.quickTo(primaryCursor, "x", {
      duration: 0.08,
      ease: "power3.out",
    });
    const movePrimaryY = gsap.quickTo(primaryCursor, "y", {
      duration: 0.08,
      ease: "power3.out",
    });
    const moveFollowerX = gsap.quickTo(followerCursor, "x", {
      duration: 0.42,
      ease: "power3.out",
    });
    const moveFollowerY = gsap.quickTo(followerCursor, "y", {
      duration: 0.42,
      ease: "power3.out",
    });

    gsap.set([primaryCursor, followerCursor], {
      xPercent: -50,
      yPercent: -50,
    });
    rootElement.classList.add(styles.enabledDocument);

    function handlePointerMove(event: PointerEvent) {
      movePrimaryX(event.clientX);
      movePrimaryY(event.clientY);
      moveFollowerX(event.clientX);
      moveFollowerY(event.clientY);
      primaryCursor.dataset.visible = "true";
      followerCursor.dataset.visible = "true";
    }

    function handlePointerOver(event: PointerEvent) {
      setMode(resolveCursorMode(event.target));
    }

    function handlePointerOut(event: PointerEvent) {
      setMode(resolveCursorMode(event.relatedTarget));
    }

    function handlePointerDown() {
      followerCursor.dataset.pressed = "true";
    }

    function handlePointerUp() {
      delete followerCursor.dataset.pressed;
    }

    function handlePointerLeave() {
      primaryCursor.dataset.visible = "false";
      followerCursor.dataset.visible = "false";
    }

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    document.addEventListener("pointerover", handlePointerOver);
    document.addEventListener("pointerout", handlePointerOut);
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("pointerup", handlePointerUp);
    document.documentElement.addEventListener(
      "pointerleave",
      handlePointerLeave,
    );

    return () => {
      rootElement.classList.remove(styles.enabledDocument);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOut);
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("pointerup", handlePointerUp);
      document.documentElement.removeEventListener(
        "pointerleave",
        handlePointerLeave,
      );
    };
  }, []);

  return (
    <div className={styles.root} aria-hidden="true">
      <span className={styles.primary} ref={primary} />
      <span className={styles.follower} data-mode={mode} ref={follower}>
        <span className={styles.label}>
          {mode === "default" ? "" : t(mode)}
        </span>
      </span>
    </div>
  );
}
