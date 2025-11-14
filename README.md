# UI Guidelines Archive

This document outlines a non-exhaustive list of details that make a good (web) interface. It is a living document, periodically updated based on learnings. Some of these may be subjective, but most apply to all websites.

The [WAI-ARIA](https://www.w3.org/TR/wai-aria-1.1/) spec is deliberately not duplicated in this document. However, some accessibility guidelines may be pointed out. Contributions are welcome. Edit [this file](https://github.com/SujalXplores/ui-guideline-archive/blob/main/README.md) and submit a pull request.

## Interactivity

- Clicking the input label should focus the input field
- Inputs should be wrapped with a `<form>` to submit by pressing Enter
- Inputs should have an appropriate `type` like `password`, `email`, etc
- Inputs should disable `spellcheck` and `autocomplete` attributes most of the time
- Inputs should leverage HTML form validation by using the `required` attribute when appropriate
- Input prefix and suffix decorations, such as icons, should be absolutely positioned on top of the text input with padding, not next to it, and trigger focus on the input
- Toggles should immediately take effect, not require confirmation
- Buttons should be disabled after submission to avoid duplicate network requests
- Interactive elements should disable `user-select` for inner content
- Decorative elements (glows, gradients) should disable `pointer-events` to not hijack events
- Interactive elements in a vertical or horizontal list should have no dead areas between each element, instead, increase their `padding`
- All flows should be keyboard-operable and follow WAI-ARIA Authoring Practices
- Every focusable element should show a visible focus ring; prefer `:focus-visible` and use `:focus-within` for grouped controls
- Manage focus: trap focus in modals/drawers; move and return focus according to pattern
- Interactive hit targets should be ≥24px on desktop and ≥44px on touch; expand the hit area when visuals are smaller
- Respect browser zoom; never disable zoom
- Hydration-safe inputs: inputs must retain focus and value after hydration
- Do not block paste in `<input>` or `<textarea>`
- Loading buttons should show a loading indicator and keep the original label
- Minimize flicker: add a short show-delay (~150–300ms) and minimum visible time (~300–500ms) to spinners/skeletons
- Persist state in the URL so share/refresh/Back/Forward work; deep-link filters, tabs, pagination
- Use ellipsis for actions that open follow-ups and for in-progress states (e.g., “Rename…”, “Loading…”, “Saving…”, “Generating…”) 
- Confirm destructive actions or provide Undo within a safe window
- Prevent double-tap zoom on controls with `touch-action: manipulation`
- Set `-webkit-tap-highlight-color` to match the design
- Tooltip timing: delay the first tooltip in a group; subsequent peers have no delay
- Overscroll behavior: set `overscroll-behavior: contain` in modals/drawers intentionally
- Persist scroll positions; Back/Forward should restore prior scroll
- Autofocus primary input on desktop screens; avoid autofocus on mobile due to keyboard-induced layout shift
- Clean drag interactions: disable text selection and apply `inert` while dragging to prevent simultaneous selection/hover
- Links are links: use `<a>`/`<Link>` for navigation so Cmd/Ctrl+Click and middle-click work; never substitute with `<button>` or `<div>`
- Announce async updates with polite `aria-live` for toasts and inline validation
- Internationalize keyboard shortcuts for non-QWERTY layouts and show platform-specific symbols

## Typography

- Fonts should have `-webkit-font-smoothing: antialiased` applied for better legibility
- Fonts should have `text-rendering: optimizeLegibility` applied for better legibility
- Fonts should be subset based on the content, alphabet or relevant language(s)
- Font weight should not change on hover or selected state to prevent layout shift
- Font weights below 400 should not be used
- Medium sized headings generally look best with a font weight between 500-600
- Adjust values fluidly by using CSS [`clamp()`](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp), e.g. `clamp(48px, 5vw, 72px)` for the `font-size` of a heading
- Where available, tabular figures should be applied with `font-variant-numeric: tabular-nums`, particularly in tables or when layout shifts are undesirable, like in timers
- Prevent text resizing unexpectedly in landscape mode on iOS with `-webkit-text-size-adjust: 100%`


## Layout

- Use optical alignment: adjust by ±1px where perception beats geometry
- Align deliberately to grid, baseline, edge, or optical center; avoid accidental positioning
- Balance contrast in text/icon lockups by tuning weight, size, spacing, or color
- Verify responsive coverage on mobile, laptop, and ultra-wide (simulate ultra-wide at 50% zoom)
- Respect safe areas: account for notches and insets via safe-area variables
- Avoid excessive scrollbars: fix overflow; on macOS set “Always” to test Windows-visible scrollbars
- Prefer flex/grid/intrinsic layout over measuring in JS to avoid layout thrash
- Anchor headings: apply `scroll-margin-top` for in-page links
- Design resilient layouts for user-generated content (short, average, very long)

## Motion

- Switching themes should not trigger transitions and animations on elements [^1]
- Animation duration should not be more than 200ms for interactions to feel immediate
- Animation values should be proportional to the trigger size:
  - Don't animate dialog scale in from 0 → 1, fade opacity and scale from ~0.8
  - Don't scale buttons on press from 1 → 0.8, but ~0.96, ~0.9, or so
- Actions that are frequent and low in novelty should avoid extraneous animations: [^2]
  - Opening a right click menu
  - Deleting or adding items from a list
  - Hovering trivial buttons
- Looping animations should pause when not visible on the screen to offload CPU and GPU usage
- Use `scroll-behavior: smooth` for navigating to in-page anchors, with an appropriate offset
- Respect user motion preferences with the `prefers-reduced-motion` media query. A non-negotiable accessibility requirement. Disables or reduces animations for users with vestibular disorders. Animations should be wrapped in `@media (prefers-reduced-motion: no-preference) {... }` to avoid jank for users who have this setting enabled.
- Prefer CSS animations; if needed use the Web Animations API; avoid main-thread JS-driven animation
- Favor compositor-friendly properties (`transform`, `opacity`); avoid animating layout-affecting properties (`width`, `height`, `top`, `left`)
- Animate only when it clarifies cause and effect or adds deliberate delight
- Choose easing based on what changes (size, distance, trigger)
- Animations should be interruptible by user input
- Input-driven motion: avoid autoplay; trigger animations in response to actions
- Set correct transform origin; anchor motion to the physical start
- Never use `transition: all`; explicitly list properties intended to animate
- For cross-browser SVG transforms, animate a wrapping `<g>` and set `transform-box: fill-box; transform-origin: center;`

## Touch

- Hover states should not be visible on touch press, use `@media (hover: hover)` [^3]
- Font size for inputs should not be smaller than 16px to prevent iOS zooming on focus
- Inputs should not auto focus on touch devices as it will open the keyboard and cover the screen
- Apply `muted` and `playsinline` to `<video />` tags to auto play on iOS
- Disable `touch-action` for custom components that implement pan and zoom gestures to prevent interference from native behavior like zooming and scrolling
- Disable the default iOS tap highlight with `-webkit-tap-highlight-color: rgba(0,0,0,0)`, but always replace it with an appropriate alternative

## Optimizations

- Large `blur()` values for `filter` and `backdrop-filter` may be slow
- Scaling and blurring filled rectangles will cause banding, use radial gradients instead
- Sparingly enable GPU rendering with `transform: translateZ(0)` for unperformant animations
- Toggle `will-change` on unperformant scroll animations for the duration of the animation [^4]
- Auto-playing too many videos on iOS will choke the device, pause or even unmount off-screen videos
- Bypass React's render lifecycle with refs for real-time values that can commit to the DOM directly [^5]
- [Detect and adapt](https://github.com/GoogleChromeLabs/react-adaptive-hooks) to the hardware and network capabilities of the user's device

## Accessibility

- Disabled buttons should not have tooltips, they are not accessible [^6]
- Box shadow should be used for focus rings, not outline which won’t respect radius [^7]
- Focusable elements in a sequential list should be navigable with <kbd>↑</kbd> <kbd>↓</kbd>
- Focusable elements in a sequential list should be deletable with <kbd>⌘</kbd> <kbd>Backspace</kbd>
- To open immediately on press, dropdown menus should trigger on `mousedown`, not `click`
- Use a svg favicon with a style tag that adheres to the system theme based on `prefers-color-scheme`
- Icon only interactive elements should define an explicit `aria-label`
- Tooltips triggered by hover should not contain interactive content
- Images should always be rendered with `<img>` for screen readers and ease of copying from the right click menu
- Illustrations built with HTML should have an explicit `aria-label` instead of announcing the raw DOM tree to people using screen readers
- Gradient text should unset the gradient on `::selection` state
- When using nested menus, use a "prediction cone" to prevent the pointer from accidentally closing the menu when moving across other elements.
- Never use `outline: none` without providing a replacement. `:focus-visible` is the modern standard for showing focus rings only for keyboard navigation, avoiding the "ugly" outline on mouse clicks that developers often complain about.
- Ensure the `lang` attribute on the `<html>` tag is set and dynamically updated if the language changes. This is the most critical attribute for accessibility and internationalization. It tells screen readers which pronunciation rules to use and informs translation tools.
- Announce dynamic content changes (like search results or form errors) to screen readers using ARIA live regions `(aria-live)`. Essential for SPAs where content changes without a page reload. `aria-live="polite"` announces changes when the user is idle, while `aria-live="assertive"` interrupts immediately for critical updates.

## Content

- Prefer inline help and explanations; reserve tooltips as a last resort
- Skeletons should mirror final content exactly to avoid layout shift
- Page `<title>` should reflect the current context accurately
- Avoid dead ends: every screen should offer a next step or recovery path
- Design all states (empty, sparse, dense, error) explicitly
- Use typographic curly quotes (“ ”) instead of straight quotes (" ")
- Avoid widows and orphans; tidy rag and line breaks
- Use tabular numbers for numeric comparisons (`font-variant-numeric: tabular-nums`) where legibility matters
- Don’t rely on color alone; include text labels for status
- Icon meanings should also be conveyed in text for non-sighted users
- Visual layouts may omit text, but accessible names/labels must exist for assistive tech
- Use the single-character ellipsis `…` instead of three periods `...`
- Locale-aware formats for dates, times, numbers, delimiters, and currency
- Detect language via `Accept-Language` and `navigator.languages`; don’t rely on IP/GPS
- Provide accurate accessible names; hide decorative elements with `aria-hidden` and verify the accessibility tree
- For icon-only buttons, provide descriptive `aria-label`
- Prefer native semantics (`<button>`, `<a>`, `<label>`, `<table>`) before ARIA roles
- Maintain heading hierarchy and include a "Skip to content" link
- Make brand resources discoverable from the nav logo via a quick-access link
- Use non-breaking spaces to keep glued terms together (e.g., `10\u00A0MB`, `\u2318\u00A0+\u00A0K`); use `&#x2060;` to join without visible space

## Forms

- When a single text input is focused, pressing Enter submits; in multi-control forms, submit from the last control
- In `<textarea>`, `⌘/Ctrl+Enter` submits; Enter inserts a new line
- Every control should have a `<label>` or programmatic label; clicking the label focuses the control
- Keep submit enabled until submission starts; then disable during the in-flight request, show a spinner, and include an idempotency key
- Don’t block typing (e.g., numeric-only fields); accept input and provide validation feedback instead
- Don’t pre-disable submit; allow incomplete forms to surface validation feedback
- Avoid dead zones on checkboxes and radios; combine label and control into one generous hit target
- Show errors next to their fields; on submit, move focus to the first error
- Set meaningful `autocomplete` and `name` values to enable autofill
- Disable `spellcheck` selectively for emails, codes, usernames, etc.
- Use correct `type` and `inputmode` for better keyboards and validation
- Placeholders should signal emptiness and end with an ellipsis; prefer example values/patterns (e.g., `+1 (123) 456-7890`, `sk-012345679…`)
- Warn before navigation when unsaved changes could be lost
- Ensure password managers and 2FA flows are compatible; allow pasting one-time codes
- Avoid triggering password managers for non-auth fields; use specific `autocomplete` tokens (e.g., `one-time-code`)
- Trim text replacements/expansions to prevent spurious trailing whitespace errors
- On Windows, set explicit `background-color` and `color` on native `<select>` to avoid dark-mode contrast issues

## Design

- Optimistically update data locally and roll back on server error with feedback
- Authentication redirects should happen on the server before the client loads to avoid janky URL changes
- Style the document selection state with `::selection`
- Display feedback relative to its trigger:
  - Show a temporary inline checkmark on a successful copy, not a notification
  - Highlight the relevant input(s) on form error(s)
- Empty states should prompt to create a new item, with optional templates
- Layered shadows: combine ambient and direct light with at least two layers
- Crisp borders: use borders with shadows; semi-transparent borders improve edge clarity
- Nested radii: child radius ≤ parent radius and concentric so curves align
- Hue consistency: tint borders, shadows, and text toward the same hue on non-neutral backgrounds
- Accessible charts: choose color-blind-friendly palettes
- Minimum contrast: prefer APCA over WCAG 2 for perceptual accuracy
- Increase contrast on interaction states: `:hover`, `:active`, and `:focus`
- Match browser UI to page background via `<meta name="theme-color" content="#000000">` (example)
- Set appropriate `color-scheme` on `<html>` (e.g., `color-scheme: dark`) for proper scrollbar/device UI contrast
- Text anti-aliasing and transforms: animate a wrapper instead of the text node; use `translateZ(0)` or `will-change: transform` if artifacts persist
- Avoid gradient banding; prefer masks when banding appears

## Performance
- Use modern image formats like `AVIF` and `WebP` with a fallback using the `<picture>` element. These formats offer significantly better compression than JPEG/PNG. The `<picture>` element allows the browser to choose the first supported format, ensuring backward compatibility.
- Implement font subsetting to only include the characters (glyphs) actually used on the site. Font files can be very large. Subsetting, especially for icon fonts or languages with large character sets, can dramatically reduce file size. Many build tools and font services offer this automatically.
- Optimize resource loading with `preload`, `prefetch`, `dns-prefetch`, and `preconnect`. Preload critical resources like fonts and hero images to ensure they are available as soon as possible. Prefetch resources that might be needed for future navigation, and use dns-prefetch and preconnect for third-party domains to reduce latency.
- Use `font-display: swap` to ensure text is visible immediately using a fallback font while the web font loads. Prevents the "Flash of Invisible Text" (FOIT) and improves perceived performance. The text may reflow when the web font loads (Flash of Unstyled Text - FOUT), but visible content is always better than a blank space.
- Avoid CSS `@import` inside CSS files as it blocks parallel downloads.	
Use multiple `<link>` tags in your HTML instead. `@import` forces a sequential download (the browser must download and parse the first CSS file before it discovers the import and starts downloading the second), which harms performance.
- Test device/browser matrix, including iOS Low Power Mode and macOS Safari
- Measure reliably: disable extensions that add overhead or change runtime behavior
- Track and minimize re-renders; use React DevTools or React Scan to identify hotspots
- Profile under CPU and network throttling to mirror real-world conditions
- Minimize layout work: batch reads/writes; avoid unnecessary reflows/repaints
- Set network latency budgets: complete POST/PATCH/DELETE in ≤ 500 ms when feasible
- Keystroke cost: prefer uncontrolled inputs; ensure controlled loops are cheap
- Large lists: virtualize (e.g., `virtua`) or apply `content-visibility: auto`
- Preload wisely: only above-the-fold images; lazy-load the rest
- Prevent image-caused CLS: set explicit dimensions and reserve space
- Preconnect to origins with `<link rel="preconnect">` (add `crossorigin` when needed)
- Preload critical fonts; subset via `unicode-range`; limit variable axes to what’s required
- Move expensive work off the main thread using Web Workers

[^1]: Switching between dark mode or light mode will trigger transitions on elements that are meant for explicit interactions like hover. We can [disable transitions temporarily](https://paco.me/writing/disable-theme-transitions) to prevent this. For Next.js, use [next-themes](https://github.com/pacocoursey/next-themes) which prevents transitions out of the box.
[^2]: This is a matter of taste but some interactions just feel better with no motion. For example, the native macOS right click menu only animates out, not in, due to the frequent usage of it.
[^3]: Most touch devices on press will temporarily flash the hover state, unless explicitly only defined for pointer devices with [`@media (hover: hover)`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/hover).
[^4]: Use [`will-change`](https://developer.mozilla.org/en-US/docs/Web/CSS/will-change) as a last resort to improve performance. Pre-emptively throwing it on elements for better performance may have the opposite effect.
[^5]: This might be controversial but sometimes it can be beneficial to manipulate the DOM directly. For example, instead of relying on React re-rendering on every wheel event, we can track the delta in a ref and update relevant elements directly in the callback.
[^6]: Disabled buttons do not appear in tab order in the DOM so the tooltip will never be announced for keyboard users and they won't know why the button is disabled.
[^7]: As of 2023, Safari will not take the border radius of an element into account when defining custom outline styles. [Safari 16.4](https://developer.apple.com/documentation/safari-release-notes/safari-16_4-release-notes) has added support for `outline` following the curve of border radius. However, keep in mind that not everyone updates their OS immediately.
