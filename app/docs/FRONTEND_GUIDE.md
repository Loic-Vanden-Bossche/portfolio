# Frontend implementation guide

This document records the portfolio's established implementation decisions. Reuse these patterns when extending the site so future work does not need to rediscover the same setup or browser-specific behavior.

## Visual direction

The portfolio uses a dark editorial glassmorphism system with blue, cyan, and purple light.

- Global tokens and layout rules live in `src/app/globals.css`.
- Use `--background`, `--surface`, `--line`, `--text`, `--muted`, `--cyan`, `--blue`, `--violet`, and `--content` instead of duplicating colors or widths.
- Glass surfaces combine a translucent dark background, a low-opacity cool border, `backdrop-filter`, a subtle inset highlight, and a soft dark shadow.
- Keep typography large and restrained. Gradients are reserved for important display text and atmospheric lighting.
- Preserve readable contrast when placing text over WebGL content.
- The primary responsive breakpoint is `800px`. Mobile uses a narrower content gutter and reduced particle density.
- Respect `prefers-reduced-motion`; smooth scrolling and the WebGL scene are disabled for users requesting reduced motion.

## Server and client boundaries

Keep `src/app/[locale]/page.tsx` as a React Server Component. The portfolio currently reads its localized content from the next-intl message catalogs; database content is intentionally out of scope.

- If database access returns later, keep it on the server through the singleton in `src/lib/prisma.ts` and pass only serializable values into `PortfolioExperience`.
- `src/components/portfolio-experience.tsx` is the client boundary for GSAP and browser behavior.
- `src/components/cosmic-scene.tsx` owns React Three Fiber and Three.js rendering.
- Do not move Prisma imports into either client component.
- Do not mark the page or root layout with `"use client"`.

## Component architecture

`src/components/portfolio-experience.tsx` is intentionally a thin composition root. It owns only the DOM refs required by GSAP, connects the portfolio hooks, and assembles the page regions. Do not move large sections of markup back into it.

- `src/components/portfolio/` contains portfolio-specific UI: header, mode tabs and curtain, hero, work grid, project card, about section, archive note, footer, plus typed mode data.
- `src/components/motion/` contains page-level motion infrastructure. `SmoothScrollProvider` is the single Lenis owner.
- `src/components/ui/` contains presentation components that can be reused outside the portfolio, including `LocaleSwitcher`, `SectionHeading`, and `CustomCursor`.
- `src/hooks/use-portfolio-mode.ts` owns mode state and the curtain transition timeline.
- `src/hooks/use-portfolio-motion.ts` owns entrance, scroll-reveal, and scene-parallax effects.
- `src/hooks/use-photo-essay-motion.ts` owns the image-specific photography timelines and scroll-driven palette changes.
- `src/components/portfolio/portfolio-data.ts` is the source of truth for mode names, projects, skills, and display numbers. Keep data definitions outside render components.

Keep the `"use client"` directive at the `PortfolioExperience` boundary. Components and hooks imported by that boundary are part of its client module graph and do not need redundant directives. Prefer focused prop interfaces, derive translated text inside the component that renders it, and extract a component when a region owns its own semantics, repeated structure, or interaction.

## Portfolio modes

The site is one personal archive with two distinct in-page portfolio modes. Photography is the default; `?mode=development` makes Development the initial mode and provides a stable deep link from photography stories.

- `PortfolioExperience` stores the active `PortfolioMode` locally. Modes share the localized homepage route, while `usePortfolioMode` synchronizes the Development query parameter with `pushState` and listens for `popstate`. Locale changes must preserve the current query and hash.
- The mode control is an accessible `tablist`. Each control uses `role="tab"`, `aria-selected`, and `aria-controls`; the content stage uses `role="tabpanel"` and points back with `aria-labelledby`.
- Each mode owns its hero copy, project collection, skill list, accent treatment, and visual composition. Shared biography and archive copy describes the personal practice without presenting services or availability.
- Photography is the default and uses `public/img/profile.png` as its editorial hero image. Render local images with `next/image`, explicit responsive `sizes`, meaningful translated alt text, and a stable aspect ratio or fill container.
- Keep the mode arrays and message-catalog structures aligned. A new project key must exist in both `messages/en.json` and `messages/fr.json`.

Mode changes use a GSAP full-viewport curtain rather than conditionally fading content alone. The sequence fades and blurs the current stage, reveals the curtain, synchronously swaps React state with `flushSync`, refreshes ScrollTrigger, then reveals the new stage while the curtain exits. Lock the controls with `isSwitching` for the duration so overlapping timelines cannot occur. Users requesting reduced motion receive an immediate state change with no curtain.

Because the photography essay is substantially taller than Development, mode changes reset Lenis to the top with an immediate forced scroll while the curtain is opaque and remove the previous section hash from browser history. `usePortfolioMode` accesses the shared instance through `useSmoothScroll`; do not create a second Lenis instance or call native smooth scrolling from the mode hook.

## Photography essay

Photography mode replaces the generic work grid with `PhotoEssay`. It presents every file in `public/img/sections/` as a chapter in a single editorial journey. The ordering lives in `photoChapters` inside `portfolio-data.ts`; translated titles, captions, and alt text live at `Portfolio.modes.photography.essay` in both message catalogs.

The current story moves from daylight and open land toward built spaces, underground transit, and an otherworldly final image:

| Order | Optimized source    | Editorial title        | Motion language                                                          |
| ----- | ------------------- | ---------------------- | ------------------------------------------------------------------------ |
| 01    | `landscape.webp`    | The Road Opens         | Horizontal mask reveal with opposing image parallax                      |
| 02    | `nature.webp`       | Small Gravity          | Botanical arrival, expanding aura, drifting pollen, and vertical depth   |
| 03    | `animals.webp`      | The Patient Witness    | Right-to-left glide, beak-like rule extension, counter-moving title      |
| 04    | `landscape_2.webp`  | Last Fire on the Ridge | Letterbox mask expansion with gentle alpine parallax                     |
| 05    | `architecture.webp` | Blue Hour Keeps Time   | Stable image arrival with independent clock rings, hand sweep, and index |
| 06    | `urban.webp`        | The City Climbs        | Diagonal polygon arrival with skew correction                            |
| 07    | `shapes.webp`       | Down to the Center     | Circular aperture expansion with counter-rotation                        |
| 08    | `culture.webp`      | Cathedral of Breath    | Paired architectural shutters and gradual illumination                   |
| 09    | `urban_2.webp`      | Night Line             | Vertical platform compression, image travel, and horizontal title motion |
| 10    | `animals_2.webp`    | Electric Afterlife     | Full-viewport slow drift, cool halo, and tightening letter spacing       |

Every chapter must keep a distinct `animation` value and a dedicated branch in `usePhotoEssayMotion`; do not route multiple chapters through the same reveal preset. The variety is intentional, but all timelines share these safeguards:

- Scope selectors with `gsap.context` to the essay root.
- Create animations only inside the no-reduced-motion media query.
- Use the complete scrubbed image-depth choreography on fine-pointer viewports at least 900 pixels wide. Smaller and touch-oriented layouts receive bounded transform/opacity entrances to protect mobile scrolling without stripping motion from ordinary desktops.
- Keep the photographic subject legible throughout the reveal. Avoid destructive dark filters, large initial zooms, and 3D transforms that visibly warp the image.

The essay is paced as one continuous journey rather than a stack of isolated screens. Adjacent chapters overlap slightly above one shared `PhotoAtmosphere`; chapters must remain visually transparent instead of painting individual section backgrounds. The atmosphere uses a sticky viewport, so animating its color repaints at most one screen instead of the entire essay. On small screens, retain only a shallow chapter overlap so copy and touch targets never collide.

- Revert the context and match-media instance on unmount or mode change.
- Prefer transforms, clipping, and opacity so animation does not trigger layout reflow. Do not animate blur, brightness, saturation, large shadows, or other paint-heavy filters on photographic frames.

Each chapter declares `background` and `accent` colors sampled from its photograph. ScrollTrigger crossfades the single viewport-sized atmosphere toward those values, re-clusters its particles with transforms, redirects the SVG wire, and sends a dash pulse through its energy path. Metadata keeps its chapter-local accent while the progress rail receives the active root accent. New chapters must provide both values and should bridge the palette between their neighbors rather than creating a random isolated theme.

Images use `next/image` with `fill`, responsive `sizes`, quality 72, stable CSS containers, lazy loading, and translated alt text. Runtime images come from `public/img/sections/optimized/`; regenerate them with `yarn optimize:photos` after adding or replacing a JPEG master. The optimizer limits the longest edge to 2560 pixels and produces quality-78 WebP masters while preserving the original JPEGs. Preserve each source's natural orientation in its chapter layout. Mobile may crop deliberately with `object-position`, but the subject must remain legible at `390 x 844`.

### Photography performance budget

- Keep the optimized ten-image set near the current 4.4 MB total. Review any individual WebP larger than 1.2 MB.
- Do not apply `content-visibility` to photo chapters. Their layouts differ enough that restoring skipped content above the viewport can change effective scroll geometry and cause jumps while moving upward. The optimized images and restrained paint effects provide the performance budget instead.
- Entrance timelines run once and remain in their settled state. Never reverse them on `onLeaveBack`; the atmosphere may adapt on `onEnterBack`, but reversing chapter masks and copy entrances makes upward scrolling look discontinuous.
- Never apply persistent `will-change` to every photograph; allow the browser and GSAP to promote only active transforms.
- Avoid shadows with blur radii above 100 pixels on animated frames. Coarse pointers and reduced-data users receive simpler shadows, ten atmosphere particles instead of eighteen, and no Electric Afterlife pulse rings.
- Keep the atmosphere wire viewport-sized. Its dash pulse is safe because it never spans the full document; do not replace it with a document-height filtered SVG.
- The Three Fiber backdrop contains only one lightweight particle draw call; do not reintroduce the torus knot or other lit mesh geometry. A demand-driven 30 FPS invalidation loop keeps the particles moving in both modes and pauses updates while the document is hidden.
- Keep `ScrollTrigger.config({limitCallbacks: true, ignoreMobileResize: true})` and normal GSAP lag smoothing. Disabling lag smoothing makes slow frames produce more visible jumps.

The City Climbs reveal must use `gsap.fromTo` with four-point polygons at both ends. Browsers cannot interpolate smoothly from `polygon(...)` to `clip-path: none`; that mismatch caused the image to pop into place. Keep its explicit full-frame destination polygon and coordinate the mask with skew correction, horizontal travel, and an opposing image scale/translation.

Electric Afterlife is a full-viewport finale but must remain in normal document flow. Do not make its stage sticky or taller than the standard chapter rhythm: that creates an apparent scroll stop after Night Line. Preserve motion with the scrubbed image drift, rings, and copy entrance while allowing the whole stage to travel naturally out of the viewport.

## Smooth scrolling

The application uses `lenis` through `src/components/motion/smooth-scroll-provider.tsx`, mounted once inside the locale layout's internationalization provider.

- Run Lenis from the GSAP ticker and convert ticker seconds to Lenis milliseconds with `time * 1000`.
- Subscribe `ScrollTrigger.update` to Lenis's scroll event so every photographic scrub stays synchronized with inertial position.
- Keep `autoRaf` disabled; a second requestAnimationFrame loop would create avoidable drift and work.
- Enable Lenis anchors with a negative header offset, respect reduced motion, and stop residual inertia during internal navigation.
- Import `lenis/dist/lenis.css` from the locale layout and keep native CSS `scroll-behavior` disabled.
- Cleanup must unsubscribe Lenis, remove the GSAP ticker callback, and destroy the Lenis instance.

The photography progress rail is semantic chapter navigation, not decorative dots. Each link targets the translated chapter heading, participates in Lenis anchor scrolling, and exposes a descriptive accessible name.

The discreet return-to-top control reuses the shared Lenis instance and appears only after the visitor has moved beyond the opening viewport. Its progress ring is updated through a passive, requestAnimationFrame-throttled scroll listener and direct DOM refs, avoiding React renders during scrolling. Keep its label localized, respect reduced motion, and remove any chapter hash before returning to the real document top so a refresh cannot reopen the previous chapter.

## Custom cursor

`src/components/ui/custom-cursor.tsx` renders a fast primary point and a slower follower. It is mounted beside page content inside `NextIntlClientProvider` so morph labels remain localized.

- Enable the cursor only for `(pointer: fine)` and when reduced motion is not requested. Coarse pointers and reduced-motion users retain the platform cursor.
- Use `gsap.quickTo` for pointer coordinates. Never update React state on `pointermove`; React state is reserved for the infrequent morph-mode changes.
- Resolve interaction modes through delegated `pointerover` and `pointerout` listeners using the closest `[data-cursor]`, link, or button. This avoids attaching listeners to every interactive element and automatically supports future content.
- Supported modes are `default`, `link`, `switch`, and `view`. Photo frames explicitly request `view`; tabs request `switch`; ordinary links and buttons receive sensible fallbacks.
- The follower owns morph size, shape, color, and translated label. The primary dot remains small and immediate so pointer precision is never lost.
- Add and remove `html.has-custom-cursor` with the component lifecycle. Cleanup every document listener so Fast Refresh and route changes cannot duplicate cursor behavior.

## Internationalization

The portfolio uses next-intl with locale-prefixed App Router routes. English (`en`) is the default locale and French (`fr`) is the second supported locale.

- `src/i18n/routing.ts` is the source of truth for supported locales and the default locale.
- `src/i18n/request.ts` selects the matching statically imported message catalog on the server. Static imports allow Next.js development HMR to track catalog edits reliably. It uses Next.js 16.3 `next/root-params` so request configuration can resolve the current locale without legacy locale setup in every page.
- `src/i18n/navigation.ts` exports locale-aware navigation helpers. Use these instead of direct `next/navigation` imports when navigation must retain or change the locale.
- `src/proxy.ts` performs locale negotiation and redirects unprefixed routes such as `/` to the appropriate locale-prefixed route.
- `src/app/[locale]/layout.tsx` validates the locale, provides `NextIntlClientProvider`, sets the document language, and generates localized metadata.
- `messages/en.json` and `messages/fr.json` contain all portfolio copy, including visible text, metadata, labels, and accessibility strings. Keep both catalogs structurally identical.
- `PortfolioExperience` owns the interactive language switcher. Locale changes preserve the current path and section hash.

When adding a locale, add it to `routing.locales`, create its complete message catalog, and verify the home route, metadata, language switcher, anchor navigation, desktop layout, and mobile layout. Keep user-facing strings out of components unless they are deliberately locale-independent names or technical identifiers.

Validate all catalog changes with `yarn build`. Do not restart a user-managed development server unless explicitly asked.

## GSAP and ScrollTrigger

`usePortfolioMotion` and `usePhotoEssayMotion` register `ScrollTrigger` inside `useEffect` and scope all selectors with `gsap.context(..., root)`.

- Intro elements use `.hero-reveal` with a staggered `gsap.from` animation.
- Scroll-revealed sections use `.reveal` and individual `ScrollTrigger` instances.
- Mode-dependent ScrollTriggers are recreated whenever the active portfolio mode changes.
- The fixed `.scene` receives scrubbed vertical parallax only in Development mode; Photography keeps its WebGL backdrop static.
- Wrap motion in `gsap.matchMedia()` with `(prefers-reduced-motion: no-preference)`.
- Cleanup must call `media.revert()` and `context.revert()` so Fast Refresh, navigation, and React development behavior do not duplicate triggers.
- Keep animation transforms separate from layout-critical CSS wherever possible.

## React Three Fiber scene

The scene is a normal client import:

```tsx
import { CosmicScene } from "./cosmic-scene";
```

Do not wrap `CosmicScene` in `next/dynamic({ ssr: false })`. Browser testing showed that boundary could leave only a `BAILOUT_TO_CLIENT_SIDE_RENDERING` template in the scene container, preventing the canvas from hydrating even though the production build succeeded.

The current scene contains:

- A deterministic particle field stored at module scope.
- No lit meshes, knot geometry, or scene lights.
- A demand-driven fixed canvas rendered at `dpr={1}` and invalidated at 30 FPS.
- `pointer-events: none` so WebGL never blocks navigation or content interaction.

React render functions must remain pure. Do not call `Math.random()` during rendering or inside `useMemo`. The particle positions use a deterministic seeded generator at module scope to satisfy React's purity lint rule and keep output stable.

The stacking order is intentional:

- Grid overlay, ambient lights, and `.scene`: `z-index: 0`.
- Main content and footer: `z-index: 1`.
- Fixed glass navigation: `z-index: 20`.

Negative scene z-index values place the canvas behind the opaque body background and make the WebGL output invisible.

## Responsive WebGL behavior

The scene is deliberately limited to subtle additive particles. The photography essay adds its own DOM particle atmosphere, but coarse pointers render only the first ten particles and never reintroduce complex WebGL geometry.

When changing scene geometry or camera values, review at least:

- Desktop/default browser viewport.
- `390 x 844` mobile viewport.
- The hero after its entrance animation has fully settled.
- The selected-work section after scrolling so ScrollTrigger has activated.

## Browser review workflow

Use the in-app Browser against `http://localhost:3000`, not `http://127.0.0.1:3000`. Next.js development mode treats `127.0.0.1` as a different origin and can block development chunks or HMR unless `allowedDevOrigins` is configured.

Recommended sequence:

1. Assume the user has already launched `yarn dev`. Do not start, restart, or stop the development server unless explicitly requested.
2. Open `http://localhost:3000` in a fresh browser tab. If it is unavailable, report that state instead of managing the server process.
3. Wait for the page load and at least four seconds for the initial stagger and WebGL initialization before judging the settled hero.
4. Capture the default desktop viewport.
5. Verify the Work and About anchor links from the top of the page.
6. Switch from Photography to Development and capture both the curtain midpoint and the settled destination.
7. Inspect browser warnings and errors.
8. Set the browser viewport to `390 x 844`, reload, wait for animations, and capture both modes. Repeat in French because the longer tab labels are the header's tightest case.
9. Reset the viewport and close temporary tabs.

Avoid relying on a full-page stitched screenshot for ScrollTrigger pages. Offscreen `.reveal` elements may still have their initial opacity because screenshot stitching does not necessarily perform a real scroll, and fixed navigation can repeat in stitched output. Scroll normally and capture key viewports instead.

The latest compatible Three.js release currently emits a `THREE.Clock` deprecation warning through React Three Fiber. It originates upstream and is not an application runtime error. Continue checking release notes during dependency upgrades rather than suppressing the warning locally.

## Code quality tooling

The application uses Yarn Berry through the version pinned in `package.json`. `.yarnrc.yml` keeps the `node-modules` linker for compatibility with Next.js native tooling, Prisma, and Husky. `package.json` and `yarn.lock` are the dependency sources of truth; use Corepack to run the repository-pinned Yarn release. The `postinstall` lifecycle regenerates Prisma Client after dependency installs because Berry does not guarantee that Prisma's dependency-level generation lands in the application module tree.

- ESLint uses the Next.js flat configuration, `eslint-plugin-prettier`, and `eslint-plugin-simple-import-sort`.
- `yarn lint` must pass without warnings after editing JavaScript or TypeScript-compatible files.
- `yarn lint:fix` applies supported code formatting and deterministic import ordering.
- `yarn format:check` validates all Prettier-compatible files.
- `yarn build` validates Next.js compilation and TypeScript.
- Do not hand-sort imports against `simple-import-sort`; run the fixer.

Husky is stored under `app/.husky` because the Git root is one directory above the Yarn project. The `prepare` script installs that nested hook path.

- `pre-commit` runs `yarn --cwd app lint-staged`.
- lint-staged runs ESLint fixes for code and Prettier for supported data, style, and Markdown files.
- `commit-msg` runs Commitlint with the conventional configuration.
- Commit messages should follow Conventional Commits, for example `feat: add project gallery` or `fix: restore webgl canvas`.

## Vanilla Extract styling architecture

Vanilla Extract owns application presentation. React owns state, GSAP owns orchestrated and scroll-linked motion, and Lenis owns smooth scrolling. Do not reintroduce a monolithic stylesheet or use generated Vanilla Extract class names as behavior selectors.

- `src/styles/theme.css.ts` defines the typed global theme: semantic colors, fonts, typography rhythm, radii, shadows, layout widths, motion constants, and stacking layers.
- `src/styles/breakpoints.ts` is the source of truth for the existing 1040px, 800px, and 430px boundaries plus pointer, data, and motion capability queries.
- `src/styles/global.css.ts` is limited to document reset/defaults, selection, and reduced-motion safety.
- `src/styles/runtime.css.ts` owns typed mode accent variables shared across otherwise independent components.
- `src/styles/typography.css.ts` contains only the stable display-heading and section-label primitives.
- Substantial visual components own colocated `.css.ts` files. If removing a component makes a style unnecessary, keep that style with the component.
- The photography essay owns its typed runtime variables in `photo-style-vars.css.ts`; `@vanilla-extract/dynamic` assigns chapter and particle values without generating styles during render.
- GSAP targets `data-animate` and `data-photo-part` attributes. Class names are presentation-only and may change when style modules are reorganized.
- Runtime values intentionally remain runtime values: chapter palettes, particle geometry/timing, GSAP transforms, clip paths, opacity, and Three.js values.
- Recipes and Sprinkles are not used. The current components have no stable multi-variant primitive that justifies Recipes, and the editorial layouts would become less readable behind an atomic Sprinkles layer.
- Keep `@vanilla-extract/dynamic` in application dependencies because `assignInlineVars` runs in client-rendered photography components. Keep the compiler and Next plugin in development dependencies.
- Next 16 Turbopack support requires `unstable_turbopack: { mode: "auto" }` in the Vanilla Extract plugin configuration. Preserve plugin composition with next-intl.

The only intentional `!important` rules are the botanical and nightline image-height crops. Next Image's `fill` mode writes inline geometry, so these narrow generated CSS overrides are required to preserve the established art direction.

## Completion checklist

For frontend changes, run from `app/`:

```bash
yarn lint
yarn format:check
yarn build
```

For visual changes, also complete the desktop and mobile browser workflow above. A successful build alone does not prove that dynamically loaded content hydrated or that stacking contexts made the scene visible.

# Photography story archive

The homepage mixed essay remains the broad photographic entry point. Ten stable, locale-aware stories live at `/[locale]/photography/[category]`; their URL slugs stay English: `animals`, `birds`, `architecture`, `street`, `landscape`, `portraits`, `nature-macro`, `abstract-details`, `culture-events`, and `still-life`.

`src/components/portfolio/photo-library.ts` is the source of truth for the taxonomy and asset manifest. A `PhotoAsset` owns file, palette, category, placeholder and credit data. A `PhotoCategory` owns ordering, cover, icon, accent and motion language. Keep prose, alt text and metadata in both `messages/en.json` and `messages/fr.json`; do not duplicate it in components.

The reusable navigation surfaces are `StoriesDialog`, `PhotoCategoryCard`, and `PhotoCategoryIndex`. On the homepage, render `PhotoCategoryIndex` after `PhotoEssay` so category discovery acts as the essay's closing invitation rather than interrupting its opening. The native dialog supplies keyboard focus containment and Escape behaviour; it must stop Lenis while open and read `smoothScroll.current` again when handling close or unmount—never capture its initial value—so every close path reliably restores scrolling. Never delay native navigation for reduced-motion users. The global `html.lenis.lenis-stopped` override must preserve the root's normal `overflow: visible` while Lenis blocks input; neither Lenis' default `overflow: clip` nor a replacement scroll container is acceptable, because changing the root overflow context makes the sticky atmosphere partially or completely leave the viewport according to the current scroll depth. Keep `scrollbar-gutter: stable`, use the shared cyan/violet desktop scrollbar, and mark independently scrollable modal regions with `data-lenis-prevent`. Dialog surfaces and their top-layer backdrops remain translucent enough to retain the exact active page atmosphere underneath throughout opening and closing. Native dialogs occupy the browser's top layer, above the page-level custom cursor, so dialog content explicitly restores the native default/pointer cursors instead of leaving the user without a visible pointer. Story pages always preserve routes back to the homepage, Development (`/?mode=development`), locale controls, adjacent stories and the global footer.

`StoryTransitionProvider` lives inside the localized layout and owns the persistent card-to-hero overlay across route changes. All internal category links use `StoryTransitionLink`, which preserves modifier/middle clicks and delegates ordinary primary clicks through `navigateToStory({category, href, sourceElement, beforeNavigate})`. The provider captures source geometry and the clicked image's resolved `currentSrc` before closing a dialog, stops Lenis, navigates at the covered midpoint, and waits up to 1.8 seconds for the destination priority image to decode before revealing it. This decoded, same-source handoff prevents optimizer source swaps and blank-frame flicker. It must always remove its document transition flag, restart Lenis, kill timelines, and clear timers on completion or unmount. Reduced-motion navigation bypasses the overlay entirely.

The overlay's final frame must be visually identical to the destination hero, not merely geometrically aligned. Image position, scale, saturation/contrast, and the restrained wash are category-owned `presentation` data in `photo-library.ts`; preview cards, transition overlay, and hero must all consume those shared variables. Frame border, background, shadow, and computed destination radius also converge before cleanup. Fade the complete overlay only after those values match; changing filters or decorative backgrounds at cleanup creates a visible flash even when both images are decoded.

Transition and hero identities derive from the existing `PhotoCategory.motion` value; do not introduce a second taxonomy. Organic, glide, grid, track, horizon, focus, bloom, orbit, resonance, and tableau each own a distinct clip/transform and lightweight motif. The destination hero splits localized titles into masked words and coordinates the image, icon, counter, introduction, atmosphere wire, and particles. During an animated route entry, the decoded hero image stays at its settled geometry and opacity beneath the overlay; only direct loads animate the image itself. Keep the overlay non-interactive and `aria-hidden`, use only transform/clip-path/opacity during animation, and never add section-specific WebGL or animated filters.

Story motion is coordinated by `use-photo-story-motion.ts`. Each category maps to one motion language: organic pulse, glide, measured grid, lateral track, horizon expansion, focus iris, bloom, orbit, resonance, or layered tableau. Animate only transform, clip-path and opacity. Continue using one `PhotoAtmosphere` per story and update its shared accent/background variables as chapters enter; never introduce separate full-page backgrounds per section. Always scope GSAP selectors and revert matchMedia, contexts and ScrollTriggers on cleanup. Reduced motion, coarse pointers and mobile layouts must remain readable without animation.

Photo originals live anywhere below `public/img/sections/`. `yarn optimize:photos` walks that tree recursively, excludes `optimized/`, and mirrors relative directories below `optimized/` so existing flat URLs remain stable. Public-domain placeholders use a lower encoding budget and should remain near or below 350 KB each. Never hotlink story images.

The first ID in every category's `photoIds` is the single source of truth for category previews, the transition, and the story hero, and it renders only once within the story. Its localized title, narrative, alternative text, placeholder disclosure, and attribution belong in the hero. Narrative chapters render `photoIds.slice(1)` and retain their sequence numbers beginning at `02`; a one-image story therefore moves directly from its hero to adjacent-story navigation without an empty chapter region. Never add a separate preview or cover ID: deriving every surface from the ordered story data is what keeps the handoff coherent.

Every non-personal image must be visibly labelled “Public-domain example / replace with personal work” (localized), link to its source, and be recorded in `docs/PHOTO_SOURCES.md`. Do not remove attribution merely because the underlying license does not require it.

Performance budget: one eager hero texture per story, lazy narrative images through `next/image`, no section-owned WebGL scenes, no filters in scroll-scrubbed tweens, and only one shared atmosphere. Verify scroll down and back up, browser history, reduced motion, and the Stories dialog at desktop and 390 × 844 after changes.

### Photo viewer

The localized layout owns one shared `PhotoViewerProvider`. Story hero/chapter frames and mixed-essay photographs expose semantic buttons using `data-cursor="view"`; category preview cards retain their navigation behavior. The provider owns one native dialog, stops Lenis while open, restores the clicked trigger's focus after closing, and supports the close control, backdrop click, and Escape. Viewer motion must remain independent from the clicked frame's crop, clip path, aspect ratio, filter, and decorative transforms: do not morph or clone source geometry into the modal. Keep the reveal neutral and unified: the translucent backdrop must preserve the active page atmosphere while the stage, contained image, technical panel, and close control enter on one restrained timeline using only opacity, small translations/scales, and a shallow clip-path inset. Closing reverses that same live timeline—even when interrupted during opening—but runs at roughly three times the entrance speed for an approximately 300 ms dismissal without jumping. Reduced-motion users receive an immediate open and close. Keep the modal image clean: technical information belongs in the adjacent glass panel, never over the photograph.

Real camera values are recorded as optional `PhotoAsset.exif` data from the local original files. Preserve camera, lens, focal length, shutter, aperture, ISO, capture time, and dimensions when adding personal work. Do not infer or fabricate missing settings; public-domain or stripped files must display the localized unavailable state. The viewer uses the optimized local asset for delivery and the manifest only for display metadata, so it never parses EXIF or fetches originals in the browser.
