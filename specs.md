# Sakar Baxi Portfolio --- Cursor Build Specification

> **Goal:** Build a production-quality, responsive Product Manager
> portfolio that feels like a premium editorial website physically
> constructed from living cloth. The central interaction is a continuous
> thread/wire that **stitches two uneven halves of the entire page
> together as the user scrolls**.
>
> This document is the source of truth. Do not simplify the central
> stitching interaction into a decorative SVG line, card animation,
> shoelace pattern, or ordinary scroll progress indicator.

------------------------------------------------------------------------

## 1. Product Vision

The portfolio should tell a story:

**"A Product Manager takes disconnected people, systems, constraints,
information, and ideas and stitches them into coherent products."**

The interface physically expresses this metaphor.

At initial load, the page should feel slightly unfinished and imperfect:

-   the page is split vertically into two uneven pieces of cloth;
-   the split follows an organic, non-linear seam;
-   content near the seam is subtly displaced or rotated;
-   pairs of small holes/perforations run along both sides of the seam;
-   a loose thread/wire is visible;
-   the cloth has microscopic movement and responds subtly to
    pointer/scroll input.

As the visitor scrolls:

1.  the **loose end** of the thread advances;
2.  it enters the next hole;
3.  the visible thread forms a 3D helical winding around the seam;
4.  the seam progressively closes/tightens;
5.  nearby content settles into its intended alignment;
6.  cloth tension changes subtly around the stitched region.

When scrolling upward, the exact process reverses.

The user should feel as though their scroll gesture is physically sewing
the portfolio together.

------------------------------------------------------------------------

# 2. Experience Principles

Every implementation decision should satisfy these principles.

## 2.1 Minimal

Do not fill the screen with UI.

Use:

-   large whitespace;
-   restrained typography;
-   limited colors;
-   small metadata;
-   intentional asymmetry;
-   a few strong visual moments.

Avoid:

-   glassmorphism everywhere;
-   gradients as decoration;
-   neon;
-   generic SaaS cards;
-   floating blobs;
-   particle fields;
-   excessive badges;
-   dashboards;
-   obvious AI visual language.

------------------------------------------------------------------------

## 2.2 Premium / Apple-level polish

The website should feel expensive because of:

-   typography;
-   spacing;
-   material rendering;
-   motion quality;
-   micro-interactions;
-   restraint;
-   animation timing;
-   excellent responsive behavior.

Animations should have weight.

Nothing should snap abruptly unless intentionally mechanical.

------------------------------------------------------------------------

## 2.3 Zen

The visual atmosphere should be:

-   tactile;
-   warm;
-   calm;
-   editorial;
-   natural;
-   quiet;
-   focused.

Think:

**Japanese textile craft × editorial portfolio × industrial precision.**

------------------------------------------------------------------------

# 3. Core Visual Direction

Use the generated visual reference as the art-direction target.

The page should resemble a large piece of premium linen/canvas fabric.

Recommended light palette:

``` css
--cloth-base: #EEE9DF;
--cloth-highlight: #F8F4EC;
--cloth-shadow: #D8D0C3;

--ink-primary: #20231F;
--ink-secondary: #777269;

--thread: #252A27;
--edge: #B8AE9F;
--hole-metal: #68645D;

--accent: #A97916;
```

Dark theme:

``` css
--cloth-base: #171815;
--cloth-highlight: #22231F;
--cloth-shadow: #10110F;

--ink-primary: #ECE6DB;
--ink-secondary: #9B968D;

--thread: #DED7CA;
--edge: #4D4A43;
--hole-metal: #AAA49A;

--accent: #C79A3B;
```

Do not simply invert colors. Dark mode should feel like dark woven
cloth.

------------------------------------------------------------------------

# 4. Recommended Stack

Use:

``` text
Next.js
TypeScript
React
CSS Modules or Tailwind
Framer Motion
GSAP + ScrollTrigger
SVG
Canvas 2D where useful
requestAnimationFrame
```

Optional:

``` text
Matter.js
```

Do **not** introduce Three.js unless it produces a clearly measurable
improvement.

The primary experience should remain lightweight.

Target:

``` text
60 FPS desktop
55–60 FPS modern mobile
```

------------------------------------------------------------------------

# 5. Application Architecture

Recommended structure:

``` text
src/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── Navigation/
│   ├── Hero/
│   ├── ProjectSection/
│   ├── ThinkingSection/
│   ├── Experience/
│   ├── Footer/
│   └── ThemeToggle/
│
├── stitching/
│   ├── StitchEngine.ts
│   ├── SeamGenerator.ts
│   ├── HoleGenerator.ts
│   ├── HelixGenerator.ts
│   ├── ThreadPhysics.ts
│   ├── ClothPhysics.ts
│   ├── CollisionSystem.ts
│   └── StitchRenderer.ts
│
├── hooks/
│   ├── useScrollPhysics.ts
│   ├── usePointerField.ts
│   └── useReducedMotion.ts
│
├── data/
│   ├── projects.ts
│   ├── experience.ts
│   └── principles.ts
│
└── types/
```

The stitch engine must be independent from portfolio content.

------------------------------------------------------------------------

# 6. Page Geometry

This is critical.

## DO NOT

Create:

``` text
CONTENT | straight thread | CONTENT
```

The seam must wander.

Example:

``` text
LEFT CLOTH                  RIGHT CLOTH

                         ○   ○
                       /
                    ○   ○
                     \
                      \
                        ○   ○
                         \
                          ○   ○
                        /
                    ○   ○
                  /
              ○   ○
```

The page itself is split around this path.

------------------------------------------------------------------------

# 7. Protected Seam Corridor

The stitching path must **never overlap portfolio content**.

Reserve a dynamic corridor around the seam.

Desktop:

``` text
220–320px
```

Tablet:

``` text
130–180px
```

Mobile:

``` text
70–100px
```

Conceptually:

``` text
CONTENT
████████████

               ← protected seam corridor →

                                   ████████████
                                      CONTENT
```

Every component must respect this exclusion zone.

------------------------------------------------------------------------

# 8. Collision Detection

Do not assume CSS columns alone are sufficient.

At layout calculation time:

``` ts
const rect = element.getBoundingClientRect();
```

Expand each content rectangle:

``` ts
collisionPadding = 32–48px
```

The seam generator must reject candidate centerline positions
intersecting expanded rectangles.

Pseudo-code:

``` ts
function isSafe(candidateX, y) {
  return !contentRects.some(rect =>
    y >= rect.top &&
    y <= rect.bottom &&
    candidateX + corridorRadius > rect.left &&
    candidateX - corridorRadius < rect.right
  );
}
```

If unsafe:

1.  try alternate nearby X positions;
2.  prefer center-safe corridor;
3.  interpolate smoothly to the replacement position.

Never introduce sudden seam jumps.

------------------------------------------------------------------------

# 9. Seam Generation

Generate a deterministic organic centerline.

Use seeded randomness so refreshes preserve composition.

Control points approximately every:

``` text
90–140px
```

Candidate horizontal movement:

``` ts
candidateX =
  previousX +
  seededRandom(-viewportWidth * 0.06,
               viewportWidth * 0.06);
```

Clamp:

``` text
35–65% viewport width
```

Smooth using:

-   Catmull-Rom;
-   cubic Bézier;
-   smoothstep interpolation.

No sharp corners.

------------------------------------------------------------------------

# 10. Fabric Split

Create two SVG polygons following the centerline.

Conceptually:

``` text
leftEdge  = seamX - seamGap
rightEdge = seamX + seamGap
```

The resulting SVG shapes are:

``` text
LEFT CLOTH
RIGHT CLOTH
```

They should appear to be two physical pieces of the same textile.

Add extremely subtle shadows along the split.

------------------------------------------------------------------------

# 11. Holes / Perforations

Run holes continuously down **both sides of the seam**.

Hole spacing:

``` text
20–26px desktop
18–24px tablet
16–22px mobile
```

Hole diameter:

``` text
5–8px
```

Avoid oversized metallic eyelets.

They should look like:

-   reinforced punctures;
-   tiny textile apertures;
-   subtle metal/ring edging.

Each row:

``` ts
{
  y,
  leftHole,
  rightHole
}
```

The hole positions derive from the seam.

Never generate hole paths independently.

------------------------------------------------------------------------

# 12. Most Important Rule --- Thread Progress

The loose end of the thread must be the thing performing the stitching.

Incorrect:

``` text
pre-render full helix
↓
reveal path using strokeDashoffset
```

This creates the illusion that arbitrary middle portions enter holes.

Do not do this.

Instead use **stitch events**.

``` ts
interface StitchEvent {
  index: number;
  hole: Hole;
  enterPosition: Vec2;
  exitPosition?: Vec2;
  completed: boolean;
}
```

The thread head progresses:

``` text
event 0
↓
event 1
↓
event 2
↓
event 3
```

A segment cannot exist until the free end has physically reached its
event.

------------------------------------------------------------------------

# 13. Thread State Machine

Implement:

``` ts
enum StitchState {
  APPROACHING,
  ENTERING,
  HIDDEN,
  EMERGING,
  LOOPING,
  TIGHTENING,
  COMPLETE
}
```

Typical sequence:

``` text
APPROACHING

        thread →
                  ○


ENTERING

                ↘
                 ○


HIDDEN

                 ○

        [nothing rendered]


EMERGING

                 ○
                 ↑
              thread


LOOPING

              ╭────────
             ╱
            ○


TIGHTENING

             ╭──────
            ○
```

Do not show what happens underneath the cloth.

------------------------------------------------------------------------

# 14. Helix --- NOT Criss-Cross Lacing

This distinction is non-negotiable.

Do NOT generate:

``` text
○ \ / ○
   X
○ / \ ○
```

That is corset/shoelace lacing.

Instead, create one continuous filament winding around an imaginary
longitudinal axis.

Mathematical model:

``` text
C(s) = seam centerline

T(s) = normalized tangent
N(s) = perpendicular normal

theta = 2π * s / pitch

P(s) =
  C(s)
  + N(s) * radius * cos(theta)
  + depthProjection * radius * sin(theta)
```

Conceptually:

``` text
       ╭──────╮
──────╯        ╰──────
       imaginary axis
```

The viewer should perceive the filament rotating around the seam.

------------------------------------------------------------------------

# 15. Wider Helix

Make the helix visually generous.

Desktop radius:

``` text
55–90px
```

Tablet:

``` text
35–55px
```

Mobile:

``` text
18–32px
```

Pitch:

``` text
45–75px
```

Tune radius relative to seam corridor width.

The helix should never hit content.

------------------------------------------------------------------------

# 16. Hide Rear Geometry

The user explicitly should **not see the thread behind the fabric**.

When:

``` ts
z < occlusionThreshold
```

do not render that section.

Not:

``` css
opacity: .2
```

Actually omit it.

The visible sequence should therefore look like thread repeatedly
disappearing into and emerging from cloth.

------------------------------------------------------------------------

# 17. Loose End Physics

The loose end is the hero of the interaction.

Length:

``` text
130–220px
```

Model it as a particle chain:

``` ts
interface Particle {
  position: Vec2;
  previousPosition: Vec2;
}
```

Use Verlet integration:

``` ts
velocity =
  position - previousPosition;

previousPosition = position;

position += velocity * damping;
position += gravity * dt * dt;
```

Constraint:

``` ts
distance(particle[i], particle[i + 1])
≈ segmentLength
```

Solve constraints multiple times/frame:

``` text
4–8 iterations
```

This creates:

-   lag;
-   flex;
-   inertia;
-   slight swinging;
-   natural reversal.

------------------------------------------------------------------------

# 18. Scroll Physics

Do not map thread head directly to `scrollY`.

Use:

``` ts
targetProgress =
  scrollY / maxScroll;
```

Then damp:

``` text
F = k(target - current) - cv
```

Suggested initial tuning:

``` ts
springK = 70;
dampingC = 17;
```

The thread should feel attached to scroll but not digitally locked to
it.

------------------------------------------------------------------------

# 19. Reverse Scrolling

Reverse scrolling must physically undo the same state.

Never trigger a separate reverse animation.

State is derived from:

``` ts
currentThreadArcLength
```

Therefore:

``` text
scroll down
→ arc length increases

scroll up
→ arc length decreases
```

Everything follows from this.

That includes:

-   thread geometry;
-   stitch completion;
-   hole state;
-   content tension;
-   cloth deformation.

------------------------------------------------------------------------

# 20. Cloth Rendering

The background must feel alive without looking like an animated
wallpaper.

Use several extremely subtle layers.

## Weave

Two repeating line textures:

``` css
repeating-linear-gradient(
  0deg,
  transparent 0 2px,
  rgba(...) 2px 3px
)
```

plus a perpendicular weave.

------------------------------------------------------------------------

## Noise

Add a tiny procedural noise texture.

Opacity:

``` text
1–3%
```

------------------------------------------------------------------------

## Pointer illumination

Pointer position controls a broad radial highlight:

``` css
radial-gradient(
  circle at var(--mouse-x) var(--mouse-y),
  rgba(255,255,255,.15),
  transparent 25%
)
```

Movement must be heavily damped.

------------------------------------------------------------------------

# 21. Cloth Microphysics

Create a low-frequency displacement field.

The cloth should move roughly:

``` text
1–4px
```

Not 20px.

Use a few large control nodes.

Each node can have:

``` ts
position
velocity
restPosition
```

Use damped spring dynamics.

This creates almost imperceptible breathing.

------------------------------------------------------------------------

# 22. Thread-Induced Cloth Tension

This is one of the biggest wow-factor opportunities.

As stitching progresses, nearby cloth should react.

For each stitch:

``` ts
tension =
  smoothstep(stitchStart, stitchComplete, progress);
```

Apply small local displacement toward seam.

Maximum:

``` text
2–6px
```

Never distort typography itself.

Instead deform:

-   cloth background;
-   edge geometry;
-   local shadow;
-   seam gap.

------------------------------------------------------------------------

# 23. Seam Closing

Initially:

``` text
seamGap ≈ 80–120px
```

After stitching:

``` text
seamGap ≈ 25–45px
```

But only locally.

Therefore seam width becomes:

``` ts
gap(y) =
  mix(
    openGap,
    closedGap,
    localStitchProgress(y)
  );
```

This makes the page literally close behind the thread.

------------------------------------------------------------------------

# 24. Content Alignment

Content begins subtly misaligned.

Example:

``` ts
{
  x: -45,
  y: 24,
  rotation: -2.8
}
```

As stitching reaches that vertical area:

``` text
translation → 0
rotation → 0
```

Use spring dynamics.

Suggested:

``` ts
k = 36;
c = 10.5;
```

Allow a tiny overshoot.

Do not make elements wildly crooked.

------------------------------------------------------------------------

# 25. Hero

Hero copy:

``` text
PRODUCT MANAGER · BUILDER · SYSTEMS THINKER

I stitch problems,
systems and people
into meaningful products.

I find clarity in complexity and build
products that create impact.
```

Optional handwritten signature treatment:

``` text
Sakar Baxi
```

Do not use a fake handwriting font unless it looks genuinely refined.

------------------------------------------------------------------------

# 26. Navigation

Floating compact navigation.

Desktop:

``` text
S/B                         Work  About  Journal  Contact   ◐
```

Use:

-   translucent cloth;
-   subtle blur;
-   fine border;
-   no large pill UI.

On mobile collapse into:

``` text
S/B                         Menu
```

------------------------------------------------------------------------

# 27. Selected Work

Projects should be editorial case-study previews, not generic SaaS
cards.

Suggested projects:

``` text
Knuud
HyperSync
Echo
Beacon
Ledger
Styfin
```

Each project should support:

``` ts
interface Project {
  name: string;
  thesis: string;
  description: string;
  role: string;
  year: string;
  tags: string[];
  metrics?: string[];
  slug: string;
}
```

------------------------------------------------------------------------

# 28. Case Study Structure

Each case study should tell:

``` text
Context
↓
Problem
↓
Constraints
↓
What I noticed
↓
Hypothesis
↓
Decision
↓
What we built
↓
Trade-offs
↓
Outcome
↓
What I learned
```

Recruiters should see how the PM thinks, not only screenshots.

------------------------------------------------------------------------

# 29. Project Hover Interaction

Do not lift cards 20px.

Instead:

``` text
pointer approaches project
↓
cloth highlight moves slightly
↓
thread tension changes ~1–2px
↓
project title gains subtle emphasis
↓
small textile label reveals metadata
```

Duration:

``` text
250–400ms
```

------------------------------------------------------------------------

# 30. Thinking Section

Title:

``` text
How I Think
```

Principles:

``` text
Understand the system first.

Focus on outcomes, not outputs.

Design for people, not processes.

Measure what matters.

Iterate with clarity and intent.
```

Present these as small sewn labels / textile swatches.

Keep them restrained.

------------------------------------------------------------------------

# 31. Experience Section

Use a horizontal stitched timeline.

Example:

``` text
Company
Product Solutions Analyst
2022

──────────●──────────

Company
Product Manager
2023–2024

──────────●──────────

Company
Senior Product Manager
2024–Present
```

Use real employment data when supplied.

Do not invent companies, titles, dates, or metrics.

------------------------------------------------------------------------

# 32. About

The About section should answer:

``` text
What problems does Sakar enjoy solving?

How does he think?

What kind of teams does he work well with?

What makes his PM approach different?
```

Avoid generic:

> "I am a passionate Product Manager..."

------------------------------------------------------------------------

# 33. Resume

Provide:

``` text
View Resume
Download Resume
```

Resume opens in a polished overlay or separate route.

------------------------------------------------------------------------

# 34. Social / Contact

Include:

``` text
LinkedIn
GitHub
Email
Resume
```

Optional:

``` text
Writing
```

Footer CTA:

``` text
Have a messy problem worth untangling?

Let's build something meaningful.
```

------------------------------------------------------------------------

# 35. Theme Transition

Light/dark mode should animate material properties.

Duration:

``` text
450–700ms
```

Transition:

-   cloth;
-   typography;
-   seam shadows;
-   wire;
-   hole rims.

Do not use a sudden color swap.

------------------------------------------------------------------------

# 36. Scroll Progress

Avoid a generic progress bar.

Use a tiny sewing-inspired progress rail.

Example:

``` text
01
◆
│
●
│
●
│
●
04
```

Active marker can travel with the current portfolio section.

------------------------------------------------------------------------

# 37. Microinteractions

Use subtle tactile responses.

Buttons:

``` text
hover → 1px compression
active → 2px compression
```

Text links:

``` text
small thread-like underline draws
```

Theme toggle:

``` text
sun/moon rotates gently
```

Project labels:

``` text
shadow changes as pointer moves
```

------------------------------------------------------------------------

# 38. Sound

Do not autoplay sound.

Optionally implement an opt-in tactile audio mode.

Possible sounds:

-   soft fabric movement;
-   thread pull;
-   tiny metallic aperture tick.

Default:

``` text
OFF
```

------------------------------------------------------------------------

# 39. Performance Rules

Never run expensive React state updates every animation frame.

The animation engine should use:

``` ts
requestAnimationFrame
```

and mutate:

``` text
SVG attributes
CSS custom properties
Canvas
```

directly where appropriate.

React controls application structure, not frame-by-frame simulation.

------------------------------------------------------------------------

# 40. GPU-Friendly Properties

Prefer:

``` text
transform
opacity
```

Avoid repeatedly animating:

``` text
width
height
top
left
box-shadow blur radius
filter blur
```

where possible.

------------------------------------------------------------------------

# 41. SVG Optimization

Do not create thousands of individual React SVG components.

Use one renderer and batch path geometry.

Hole circles can be generated once on layout calculation.

Recalculate only on:

``` text
initial mount
meaningful resize
orientation change
content geometry change
```

------------------------------------------------------------------------

# 42. Adaptive Quality

Create:

``` ts
quality = "high" | "medium" | "low"
```

Reduce on weaker devices:

``` text
particle count
cloth nodes
noise layers
SVG sample density
shadow complexity
```

Do not remove the core stitch behavior.

------------------------------------------------------------------------

# 43. Reduced Motion

Respect:

``` css
@media (prefers-reduced-motion: reduce)
```

Reduced version:

-   thread progression remains;
-   no loose-end swinging;
-   no cloth breathing;
-   no overshoot;
-   minimal content movement.

The narrative must still work.

------------------------------------------------------------------------

# 44. Mobile Behavior

Do not simply scale desktop.

On mobile:

-   narrower helix;
-   smaller seam gap;
-   fewer cloth simulation nodes;
-   single-column content;
-   seam may move closer to one side where necessary;
-   text always gets priority.

Never let the thread cross text.

------------------------------------------------------------------------

# 45. Accessibility

Requirements:

``` text
WCAG AA contrast
keyboard navigation
visible focus states
semantic headings
aria labels
reduced motion
no information encoded only by animation
```

Canvas/SVG stitching is decorative:

``` html
aria-hidden="true"
```

------------------------------------------------------------------------

# 46. SEO

Implement:

``` text
title
description
canonical
OpenGraph
Twitter card
JSON-LD Person schema
```

Suggested title:

``` text
Sakar Baxi — Product Manager & Builder
```

Suggested description:

``` text
Product Manager focused on turning complex systems, integrations and ideas into coherent products.
```

------------------------------------------------------------------------

# 47. Loading Experience

Do not use a percentage loader.

Instead:

``` text
blank cloth
↓
one small loose thread enters
↓
first hole catches
↓
hero fades into view
```

Keep under \~1 second if possible.

------------------------------------------------------------------------

# 48. Easter Egg

Optional desktop interaction:

If the visitor gently drags the loose end sideways:

``` text
wire bends slightly
cloth tension responds
release → spring returns
```

Limit displacement.

It must not break scroll state.

This is a good subtle:

> "How did they do that?"

moment.

------------------------------------------------------------------------

# 49. Additional Wow Factor --- Stitch Memory

After a section has been sewn, leave a microscopic indentation around
the completed seam.

Not an obvious trail.

Just:

``` text
tiny local cloth compression
slightly darker weave
small tension shadow
```

As the user unwinds, it relaxes.

------------------------------------------------------------------------

# 50. Additional Wow Factor --- Cursor Pressure

Pointer movement near cloth should create a tiny virtual pressure field.

Radius:

``` text
120–180px
```

Displacement:

``` text
1–2px
```

Never warp text.

Only affect material shading/background.

------------------------------------------------------------------------

# 51. Additional Wow Factor --- Thread Specular Highlight

The thread/wire should react slightly to its orientation.

For each segment:

``` ts
highlight =
  dot(segmentNormal, lightDirection)
```

Use this to vary a thin highlight stroke.

This will dramatically improve the perception of a cylindrical filament.

Do not use a large gradient stroke.

------------------------------------------------------------------------

# 52. Additional Wow Factor --- Hole Deformation

When the free end enters a hole:

``` text
hole radius +0.5px
↓
rim darkens
↓
cloth around aperture compresses ~1px
↓
returns after thread passes
```

Duration:

``` text
120–180ms
```

Extremely subtle.

------------------------------------------------------------------------

# 53. Motion Language

Every animation belongs to one of three categories.

### Cloth

Slow, soft, damped.

``` text
700ms–10s
```

### Thread

Responsive but weighted.

``` text
100–500ms physical response
```

### Interface

Precise.

``` text
180–350ms
```

Never use the same easing everywhere.

------------------------------------------------------------------------

# 54. Scroll Story

Suggested sequence:

``` text
0–10%
Hero
first thread catch

10–30%
Discovery / philosophy

30–55%
Selected work

55–70%
How I Think

70–88%
Experience

88–100%
About / contact
final stitch
```

The seam should evolve continuously through all sections.

------------------------------------------------------------------------

# 55. Data-Driven Content

Do not hard-code project JSX.

Use:

``` ts
export const projects = [...]
```

Likewise:

``` ts
experience
principles
socialLinks
```

This makes future editing easy.

------------------------------------------------------------------------

# 56. Development Debug Mode

Implement:

``` ts
const DEBUG_STITCHING = false;
```

When true show:

``` text
centerline
collision boxes
protected corridor
hole indices
current stitch event
thread head
local tension values
FPS
```

This will make tuning dramatically easier.

------------------------------------------------------------------------

# 57. FPS Monitor During Development

Measure actual frame rate.

If rolling FPS drops below:

``` text
52 FPS
```

for several seconds:

automatically reduce:

``` text
cloth simulation resolution
thread subdivision count
shadow complexity
```

Do not ship a visually impressive effect that stutters.

------------------------------------------------------------------------

# 58. Implementation Phases

## Phase 1 --- Static design

Build:

-   typography;
-   sections;
-   layout;
-   light/dark themes;
-   responsive content.

No physics yet.

------------------------------------------------------------------------

## Phase 2 --- Seam

Build:

-   deterministic centerline;
-   fabric split;
-   collision corridor;
-   hole generation.

Validate on every breakpoint.

------------------------------------------------------------------------

## Phase 3 --- Stitch engine

Implement:

-   stitch event state machine;
-   hole-to-hole progression;
-   helix projection;
-   loose-end simulation;
-   reverse scroll.

Do not proceed until the loose end always enters the correct next hole.

------------------------------------------------------------------------

## Phase 4 --- Tension

Implement:

-   local seam closing;
-   content alignment;
-   hole compression;
-   local fabric deformation.

------------------------------------------------------------------------

## Phase 5 --- Living cloth

Add:

-   weave;
-   noise;
-   pointer lighting;
-   breathing;
-   pressure field.

------------------------------------------------------------------------

## Phase 6 --- Polish

Add:

-   project interactions;
-   theme transitions;
-   navigation;
-   loading sequence;
-   responsive tuning;
-   accessibility;
-   reduced motion.

------------------------------------------------------------------------

## Phase 7 --- Performance

Profile using Chrome DevTools.

Test:

``` text
MacBook
Windows laptop
iPhone
Android
tablet
```

Test both:

``` text
slow scrolling
fast scrolling
rapid direction changes
resize
orientation changes
background tab restoration
```

------------------------------------------------------------------------

# 59. Acceptance Criteria

The build is not complete unless all are true.

### Stitching

-   [ ] The entire page is split along one organic seam.
-   [ ] Holes exist on both sides for the full seam.
-   [ ] Hole spacing is dense.
-   [ ] The seam never crosses content.
-   [ ] Thread never crosses text/components.
-   [ ] The free end is always identifiable.
-   [ ] The free end enters each hole.
-   [ ] No arbitrary middle thread section enters a new hole.
-   [ ] Hidden thread is not rendered.
-   [ ] Visible thread reads as a 3D helix, not X-lacing.
-   [ ] Helix is wide and visually clear.
-   [ ] Reverse scrolling truly unwinds.

### Physics

-   [ ] Loose end has inertia.
-   [ ] Loose end settles after scrolling stops.
-   [ ] Direction changes produce natural lag.
-   [ ] Content alignment is spring-driven.
-   [ ] Cloth locally tightens around completed stitches.
-   [ ] No perpetual motion.

### Material

-   [ ] Background reads as fabric immediately.
-   [ ] Fabric movement is subtle.
-   [ ] Pointer affects material light.
-   [ ] Thread looks cylindrical.
-   [ ] Holes feel physically embedded.
-   [ ] Dark mode still feels like cloth.

### UX

-   [ ] Text remains highly readable.
-   [ ] Animation never blocks navigation.
-   [ ] Mobile remains usable.
-   [ ] Reduced-motion mode works.
-   [ ] Keyboard navigation works.

### Performance

-   [ ] Desktop target ≈60 FPS.
-   [ ] Mobile remains smooth.
-   [ ] No layout thrashing on scroll.
-   [ ] No React render loop tied to animation frame.

------------------------------------------------------------------------

# 60. What Cursor Must NOT Do

Do not simplify this project into:

``` text
Framer Motion cards
+
SVG line with strokeDashoffset
```

Do not create:

``` text
straight vertical timeline
```

Do not create:

``` text
shoelace X pattern
```

Do not:

-   animate a fully pre-existing thread;
-   show thread behind cloth;
-   let thread overlap text;
-   use huge eyelets;
-   overanimate the cloth;
-   add neon;
-   make everything glassy;
-   use generic gradient blobs;
-   introduce Three.js merely for novelty;
-   sacrifice responsiveness for visual complexity.

------------------------------------------------------------------------

# 61. Final Art Direction

The desired feeling is:

> A beautifully typeset Product Manager portfolio has been constructed
> from two imperfect pieces of premium fabric. A single dark filament
> winds through tiny perforations along an organic tear. The visitor's
> scroll physically pulls the loose end through the material. Behind the
> moving tip, the cloth tightens, disconnected content settles into
> alignment, and the portfolio gradually becomes whole.

It should feel handcrafted without feeling rustic.

Technical without looking like a tech demo.

Playful without becoming gimmicky.

Complex underneath, calm on the surface.

That tension is the design.

------------------------------------------------------------------------

# 62. Final Instruction to Cursor

Build the project iteratively.

Do not attempt the entire physics engine in one component.

After each major phase, verify:

``` text
geometry
collision safety
scroll reversibility
FPS
responsive behavior
```

The stitching metaphor is the product.

If a visual shortcut damages the physical illusion, do not use the
shortcut.

Prioritize in this order:

``` text
1. Correct physical illusion
2. Readability
3. Motion quality
4. Performance
5. Visual detail
```

The final experience should make a technically sophisticated visitor
initially notice the craft, then wonder how it works, while a
non-technical recruiter should simply experience a memorable and
exceptionally polished portfolio.
