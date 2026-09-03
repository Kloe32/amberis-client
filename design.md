# Amberis Website Design Guide

Use this guide whenever you add, edit, or review UI for the Amberis website. The goal is a luxurious, minimal, responsive experience built around amber red, warm beige, cream, and restrained gold details.

Amberis should not feel dark, cold, techy, or like a generic ecommerce template. It should feel warm, refined, personal, and carefully edited.

## Brand Foundation

The primary logo asset is `src/assets/amberisLogo.png`. Use it as the source of the visual language:

- Amber-red gemstone tones
- Warm beige and cream surfaces
- Sharp faceted linework
- Elegant serif luxury character
- Small star or sparkle details used sparingly

Use the logo in the header, hero, footer, and important brand moments. Do not stretch, crop awkwardly, recolor, add heavy effects, place on noisy backgrounds, or crowd it with nearby UI.

Give the logo clear space equal to at least half of its displayed height on all sides. On mobile, use a smaller lockup if the full wordmark becomes too wide.

## Visual Direction

The site should feel:

- Luxurious
- Minimal
- Warm
- Elegant
- Trustworthy
- Personal
- Precise

Design with restraint. Use fewer elements, stronger spacing, careful alignment, and premium typography. Let the product, service, or brand promise carry the page instead of decoration.

Avoid:

- Dark obsidian-heavy pages
- Starter-template copy or default Vite/React assets
- Loud gradients
- Busy backgrounds
- Oversized decorative cards
- Too many shadows
- Generic SaaS styling
- Dense walls of text
- Cheap-looking metallic effects

## Luxury Color System

Use a light luxury palette inspired by amber gemstones, red wine, parchment, and soft gold.

Recommended core colors:

- Amber Red: `#8A1E18` for primary brand actions and emphasis
- Deep Merlot: `#5A1512` for headings, rich accents, and hover states
- Clay Red: `#B64A35` for secondary warmth and small highlights
- Warm Beige: `#EFE1CC` for page backgrounds
- Cream: `#FFF8EC` for clean surfaces
- Soft Sand: `#E4CFB2` for section contrast
- Champagne Gold: `#C6A15B` for fine borders and premium details
- Cocoa Text: `#3D2924` for readable headings
- Taupe Text: `#7B665A` for supporting copy
- Hairline: `rgba(138, 30, 24, 0.16)` or `rgba(198, 161, 91, 0.32)` for borders

When implementing CSS, map this palette to tokens in `src/index.css` instead of scattering raw hex values.

Suggested token direction:

- `--bg`: warm beige
- `--surface`: cream
- `--surface-strong`: soft sand
- `--text`: taupe text
- `--text-h`: cocoa text
- `--border`: amber-red hairline
- `--border-metal`: champagne hairline
- `--accent`: amber red
- `--accent-strong`: deep merlot
- `--accent-warm`: clay red
- `--accent-metal`: champagne gold
- `--shadow`: soft warm shadow with low opacity

Color rules:

- Use beige and cream as the dominant experience.
- Use amber red for primary actions, hero emphasis, links, and brand ownership.
- Use gold only as a fine detail: borders, small dividers, focus rings, and tiny accents.
- Use dark red or cocoa for depth instead of black.
- Avoid cold gray, blue, neon purple, and heavy dark sections.
- If dark mode is added later, keep it warm brown and amber, not black and gold.

## Typography

Luxury minimal design depends on typography. Use the existing font variables, but choose type behavior carefully.

- Hero headings should be elegant, spacious, and specific to Amberis.
- Serif display type works well for brand headings.
- Body text should remain highly readable and calm.
- Use short lines of copy. Aim for 45 to 70 characters per line.
- Use small uppercase eyebrow labels sparingly for collection names, categories, or premium cues.
- Avoid heavy font weights. Prefer 400 to 600.
- Do not use negative letter spacing on small text.

Copy should sound polished and human. Avoid generic lines like "best solution for your needs." Prefer concrete benefit, craft, trust, and experience language.

## Layout And Spacing

Use spacious, responsive layouts with strong alignment.

- Keep the centered app container unless a full redesign intentionally changes it.
- Use full-width sections with constrained inner content.
- Use generous vertical rhythm: luxury pages need breathing room.
- Separate sections with whitespace, beige tonal changes, or 1px warm hairline borders.
- Align content to a consistent grid.
- Use asymmetry carefully: one strong image or brand mark and one strong text block is enough.
- On mobile, prioritize clarity over drama. Stack content, reduce padding, and keep the logo/navigation compact.

Recommended spacing scale:

- `4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`, `72px`, `96px`

Use fewer layout patterns and repeat them consistently.

## Responsive Rules

Design mobile, tablet, and desktop as first-class experiences.

- Mobile around `390px`: single column, clear hierarchy, no clipped logo, no crowded nav.
- Tablet around `768px` to `1024px`: balanced two-column layouts only when space allows.
- Desktop around `1280px` to `1440px`: generous margins and controlled content width.
- Wide screens: do not let text lines become too long.

Interactive targets should be at least `44px` tall on touch devices. Text must never overlap, clip, or escape its container.

## UI Components

Buttons:

- Primary buttons use amber red with cream text.
- Hover states move toward deep merlot.
- Secondary buttons use transparent cream/beige surfaces with warm hairline borders.
- Avoid chunky, playful, or overly rounded buttons. Use `4px` to `8px` radius.
- Always include hover, active, disabled, and `:focus-visible` states.

Cards:

- Use cards sparingly.
- Cards should feel like gallery labels, collection tiles, service panels, testimonials, or editorial product notes.
- Use cream surfaces, thin amber/gold borders, and quiet warm shadows.
- Do not nest cards inside cards.

Forms:

- Inputs should be calm, spacious, and high contrast.
- Labels must be clear and visible.
- Use inline validation with precise, helpful messages.
- Keep forms short. Luxury users expect low friction.

Navigation:

- Keep navigation minimal and confident.
- Header should use the logo, a small set of links, and one clear action.
- Avoid crowded menus.
- On mobile, use a clean menu pattern with accessible controls.

Images:

- Use high-quality product, gemstone, craft, client, or brand imagery.
- Avoid generic stock photos.
- Meaningful images need useful `alt` text. Decorative images use `alt=""`.
- Do not hide important product detail behind heavy overlays.

Icons and decorative details:

- Use small line icons only when they clarify meaning.
- Use sparkle/star motifs from the logo very sparingly.
- Avoid decorative orbs, blobs, noisy patterns, and excessive animation.

## Business Theme Rules

Amberis visually suggests a luxury gemstone, jewelry, beauty, or premium lifestyle brand. UI decisions should support that business mood.

- Lead with desire and trust: craftsmanship, quality, exclusivity, care, and refined service.
- Make product or service details easy to inspect. Luxury does not mean vague.
- Use editorial spacing for storytelling sections.
- Use concise proof points: materials, sourcing, process, guarantees, client care, appointments, reviews, or certifications.
- For commerce flows, prioritize product clarity, transparent pricing or inquiry paths, and reassuring service details.
- For appointment or inquiry flows, make the primary action visible without making the page feel pushy.
- Treat testimonials as quiet proof, not loud marketing blocks.
- Use scarcity language carefully. Avoid fake urgency.

Every page section should answer at least one of these:

- What Amberis offers
- Why the offer is premium
- Who it is for
- What makes it trustworthy
- What the visitor should do next

## Content Voice

Write in a tone that is elegant, clear, and warm.

Prefer:

- "Designed with rare attention to detail"
- "Private consultations"
- "Crafted for lasting presence"
- "A refined experience from selection to delivery"

Avoid:

- "Level up"
- "Crush your goals"
- "Best-in-class solution"
- "Click here"
- "Lorem ipsum"

Keep headings short. Let supporting text carry detail.

## Accessibility

Luxury must remain usable.

- Preserve semantic HTML.
- Keep heading order logical.
- Use real buttons for actions and real links for navigation.
- Maintain readable contrast across beige, cream, amber red, and gold surfaces.
- Add clear `:focus-visible` states using champagne gold or amber red depending on contrast.
- Do not rely on color alone to communicate state.
- Make keyboard navigation complete.
- Respect reduced-motion preferences.

## Motion And Interaction

Motion should be subtle and refined.

- Use short transitions: `150ms` to `260ms`.
- Prefer opacity, transform, and border-color changes.
- Avoid bouncing, spinning, or playful effects.
- Hover states should feel like a material response, not a gimmick.
- Major page reveals should be restrained and optional.

## Implementation Notes For Agents

- Read `src/index.css`, `src/App.css`, and the component being changed before adding styles.
- Reuse existing variables first, but update them toward the amber-red and beige palette when redesigning.
- Import the logo from `src/assets/amberisLogo.png` when branding is needed.
- Remove Vite/React demo content from production-facing UI.
- Keep styles close to the component unless a token or utility is reused across the site.
- Add new CSS variables for repeated color, spacing, and surface decisions.
- Do not introduce a dark-first design unless explicitly requested.
- Run `npm run build` after substantial UI changes.

## Responsive QA Checklist

Before finishing UI work, check:

- Desktop around `1440px`
- Laptop around `1280px`
- Tablet around `1024px`
- Mobile around `390px`
- Header/logo sizing
- Primary action visibility
- Long text wrapping
- Form usability
- Hover, focus, active, and disabled states

No content should overlap, clip, feel cramped, or look like a default starter template.
