# Nocturne Cellars Design System

## Scene

A collector enters a cool basalt cellar at dusk. The only warm light comes from candles and a narrow door opening toward the vineyard. The interface should feel dark, tactile, and slow enough to notice.

## Aesthetic Direction

Reference lane: European art-film title sequence meets a contemporary natural-wine label. Photography fills the frame, type appears with restraint, and transitions resemble shutters, dissolves, and strips of exposed film. This is cinematic rather than editorial.

## Color Strategy

Committed, dark and wine-drenched.

- Cellar: `oklch(0.14 0.018 22)`
- Wine: `oklch(0.31 0.105 22)`
- Ember: `oklch(0.62 0.13 34)`
- Ash: `oklch(0.69 0.018 55)`
- Parchment: `oklch(0.93 0.025 75)`
- Basalt line: `oklch(0.31 0.025 28 / 0.55)`

No pure black or white. Warm light should occupy less visual area than the wine and cellar tones.

## Typography

- Display: Italiana, a sharp high-contrast face that recalls film credits and bottle lettering without using a familiar editorial default.
- Text and controls: Manrope, calm and contemporary with good small-screen legibility.
- Display scale: fluid from 3.4rem to 9.5rem, tightly tracked.
- Body measure: maximum 68ch.
- Short labels may use uppercase with moderate tracking, but body copy stays sentence case.

## Layout

- Fixed top navigation over the opening sequence.
- Hero uses a full-viewport photographic frame and large left-biased title.
- The origin story occupies a tall scroll runway with a sticky viewport and three cinematic scenes.
- Content sections alternate between broad image planes, narrow copy columns, and bottle-label-like wine entries.
- Avoid repeated cards. Wines are presented as horizontal chapters with distinct typographic and image composition.

## Motion

- Page load: image settles from 1.07 scale while title lines reveal upward.
- Scroll film: three sticky scenes crossfade, scale, and reveal through inset clip paths.
- Fine grain and vignette remain static or drift subtly using transforms.
- Wine rows reveal through IntersectionObserver.
- Use expo or quint ease-out only.
- Under `prefers-reduced-motion: reduce`, remove sticky cinematic transforms, show all scenes as normal stacked content, and disable smooth scrolling.

## Imagery

- Decisive landscape and cellar photography from verified Unsplash URLs.
- Treatment: deep red-black overlay, warm ash highlights, low saturation, restrained grain.
- Every image receives descriptive alt text where meaningful. Decorative background frames are hidden from assistive technology and paired with visible DOM copy.

## Components

- Wordmark and compact navigation.
- Hero frame with title, provenance, CTA, and scroll cue.
- Sticky cinematic origin sequence.
- Three wine chapters.
- Practice statement with process details.
- Inquiry section and simple accessible form.
- Footer with fictional contact and geographic context.

## Interaction Details

- Links use a fine underline that grows from left to right.
- Buttons feel like printed labels: squared geometry, compact height, no pill shapes.
- Image hover uses a subtle scale and exposure shift.
- Focus rings use parchment and remain clearly visible on dark surfaces.

## Responsive Behavior

- At widths below 760px, navigation simplifies, cinematic sections become stacked frames, and titles reduce without losing drama.
- Touch targets remain at least 44px.
- No horizontal scrolling at 320px.
- Content remains legible if remote images fail because overlays have solid fallback colors.

