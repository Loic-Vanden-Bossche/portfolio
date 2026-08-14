# Vanilla Extract migration audit

## Baseline

- Next.js 16.3.0 with the App Router and strict TypeScript using bundler module resolution.
- One application stylesheet: `src/app/globals.css` (2,246 lines before migration); no CSS Modules or other application style files.
- Third-party Lenis CSS is imported separately in the locale layout and remains third-party owned.
- Browser baseline captured in Photography and Development at the default desktop viewport and at 390 × 844. The only warning is the documented upstream `THREE.Clock` deprecation.

## Existing style categories

1. Design tokens: root palette, accent colors, content width, repeated label/display typography, glass lines, shadows, radii, motion durations/easings, and stacking layers.
2. Application globals: box sizing, document backgrounds, scrolling behavior, body typography, link/button reset, selection, and reduced-motion safety.
3. Typography globals: only the body font belongs globally; display and label typography belong to their components or stable shared primitives.
4. Reusable layout: the 1,320px content width and section rhythm are typed tokens, composed by owning components.
5. Component-local: shell, header, tabs, locale switcher, hero, work/cards, about, archive/footer, cursor, return-to-top, atmosphere, and essay.
6. Page/section-local: hero, work, about, archive, and the photography chapter layouts.
7. Animation presentation: cursor morph states, curtain surface, chapter masks, autonomous particle drift, and reduced-motion visibility.
8. Third-party: `lenis/dist/lenis.css` only.
9. Runtime values: mode/essay accents, photo backgrounds, particle positions/timing, GSAP transforms/opacity/clip paths, and WebGL values.
10. Dead after runtime confirmation: the former photography project-grid art selectors were unreachable because Photography renders `PhotoEssay`; they were removed only after checking JSX and animation hooks.

## Runtime coupling

- `usePortfolioMotion` targets semantic `data-animate` values for hero reveals, scroll reveals, and the scene.
- `usePhotoEssayMotion` targets `data-photo-part` values for chapters, frames, images, copy, titles, rules, progress, atmosphere, wire, pollen, clocks, shutters, and pulse rings.
- Generated Vanilla Extract class names are never used as animation APIs.
- Lenis depends on document overflow and scroll behavior but not on application class names.

## Architecture decision

- Use `@vanilla-extract/css` and `@vanilla-extract/next-plugin` for zero-runtime generated presentation.
- Use `@vanilla-extract/dynamic` only for the photography essay's typed runtime custom properties. React style objects need the underlying custom-property names rather than Vanilla Extract's `var(...)` references.
- Do not introduce Recipes: no stable reusable component currently has meaningful visual variants that justify a recipe API.
- Do not introduce Sprinkles: the portfolio is editorial and component-specific; an atomic styling layer would add indirection without reducing repetition.
- Keep runtime custom properties inline and GSAP-owned values imperative.

## Completed migration

- Removed `src/app/globals.css`; no legacy application CSS remains.
- Minimal globals now live in `src/styles/global.css.ts` and cover only the reset, document defaults, selection, and reduced-motion safety.
- Typed theme decisions live in `src/styles/theme.css.ts`; breakpoints, shared typography, and mode variables have focused modules beside it.
- All visual components now import colocated `.css.ts` modules.
- Replaced styling-class animation APIs with `data-animate` and `data-photo-part` behavior hooks.
- Preserved GSAP timelines, ScrollTrigger configuration, Lenis ownership, WebGL behavior, semantic markup, and localization.
- Removed dormant photography project-card selectors that belonged to the pre-essay layout and were unreachable after `PhotoEssay` became the Photography work renderer.
- Two `next/image` fill crops intentionally retain narrowly scoped generated `!important` declarations. Next Image supplies inline fill geometry, so normal class specificity cannot reproduce the established 112% botanical and 122% nightline crops.

## Final style structure

```text
src/styles/
├── breakpoints.ts
├── global.css.ts
├── runtime.css.ts
├── theme.css.ts
└── typography.css.ts

src/components/
├── portfolio-experience.css.ts
├── portfolio/
│   ├── archive-note.css.ts
│   ├── mode-curtain.css.ts
│   ├── photo-atmosphere.css.ts
│   ├── photo-essay.css.ts
│   ├── photo-style-vars.css.ts
│   ├── portfolio-about.css.ts
│   ├── portfolio-footer.css.ts
│   ├── portfolio-header.css.ts
│   ├── portfolio-hero.css.ts
│   ├── portfolio-mode-tabs.css.ts
│   ├── portfolio-work.css.ts
│   └── project-card.css.ts
└── ui/
    ├── custom-cursor.css.ts
    ├── locale-switcher.css.ts
    ├── return-to-top.css.ts
    └── section-heading.css.ts
```
