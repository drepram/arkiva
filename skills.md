````markdown
---
name: archival-editorial-web-design
description: >
  Design and build websites with the character of an independent digital
  archive, editorial catalogue, research collection, or small cultural
  institution. Inspired by the design principles of Artefak Kita,
  archives.design, and Kacabenggala Editions. Use this skill whenever
  designing archive pages, cultural websites, libraries, collections,
  publication indexes, author pages, work pages, exhibitions, or
  text-and-image editorial interfaces.
---

# Archival Editorial Web Design

## Objective

Build websites that feel like a carefully maintained **archive, library,
catalogue, independent publication, or cultural institution**.

The interface should feel:

- archival
- editorial
- scholarly without becoming academic-looking
- independent
- human-curated
- text-forward
- image-conscious
- quiet
- deliberate
- utilitarian where appropriate
- slightly idiosyncratic
- built to last

The website must NOT look like:

- a SaaS landing page
- a startup
- a Web3 product
- a generic portfolio template
- a generic shadcn dashboard
- a corporate marketing website
- an AI-generated "modern website"

The closest conceptual references are:

1. **Artefak Kita**
   - archive as cultural exploration
   - objects are accompanied by context and provenance
   - visual material is treated seriously
   - navigation distinguishes artefacts, editorial material, series,
     contextual writing, and institutional information
   - individual objects feel like archival records rather than products

2. **archives.design**
   - catalogue-first
   - extremely direct information architecture
   - search and taxonomy are first-class interface elements
   - dense information is acceptable when useful
   - metadata is visible instead of hidden
   - the collection itself provides the visual interest

3. **Kacabenggala Editions**
   - restrained editorial presentation
   - books and texts treated as objects worth preserving
   - typography and hierarchy carry the interface
   - minimal framing around content
   - the collection feels like a living shelf rather than a product grid

Use these references for **principles and atmosphere**, not for literal
pixel-by-pixel imitation.

---

# 1. Core Philosophy

## Content is the interface

Do not design an elaborate shell and then insert archival content into it.

Begin with the material:

- title
- creator
- author
- date
- publication
- object type
- collection
- description
- language
- source
- provenance
- scans
- photographs
- editions
- tags
- related material

Then build the hierarchy around that information.

The archive itself should create the visual character.

---

## Treat objects as records, not products

A book, poster, photograph, manuscript, article, document, or historical
artefact is **not an ecommerce product**.

Avoid product-card conventions such as:

- floating cards
- large border radius
- large shadows
- CTA buttons on every item
- price-card composition
- promotional badges
- "Learn More" buttons everywhere

Prefer:

- title as link
- creator
- date
- type
- thumbnail when relevant
- short description where useful
- visible metadata
- simple dividers
- typographic distinction

The whole item may be clickable when appropriate.

---

# 2. Visual Character

The desired visual character is:

> Independent archive + reading room + catalogue + small press.

The site should feel like somebody has spent years **collecting and arranging
material**, not like somebody selected a website template yesterday.

Allow some personality.

Perfect symmetry is not required.

Not every component needs to share the exact same visual treatment.

A little irregularity can make the archive feel human.

However, irregularity must never compromise usability.

---

# 3. Avoid Generic AI Design

Never automatically introduce:

- purple-blue gradients
- gradient text
- glowing backgrounds
- giant rounded rectangles
- glassmorphism
- neon accents
- floating blobs
- floating cards
- excessive shadows
- excessive border radius
- giant centered hero text
- three-column feature sections
- feature cards with icons
- meaningless statistics
- "Trusted by..."
- testimonial carousels
- pill-shaped everything
- enormous CTA buttons
- decorative dashboards
- bento grids merely because they are fashionable
- repeated sections with:
  - eyebrow
  - huge heading
  - paragraph
  - three cards
- stock illustrations
- generic abstract graphics
- unnecessary icons beside ordinary text
- excessive Framer Motion animations

If the page starts looking like a startup landing page, redesign it.

---

# 4. Typography

Typography is one of the primary design systems.

Use type to distinguish:

- archive identity
- page title
- object title
- author / creator
- metadata
- description
- editorial prose
- navigation
- captions
- footnotes
- catalogue numbers

Prefer a small number of deliberate typographic roles.

Do not compensate for weak hierarchy with boxes.

## General rules

- Body text must be highly readable.
- Long-form text should have a deliberate reading width.
- Metadata may be noticeably smaller than prose.
- Large headings should be used sparingly.
- Avoid huge display type simply to fill the viewport.
- Use italics where editorially meaningful.
- Use uppercase labels sparingly.
- Use tabular numerals where dates or catalogue numbers benefit from them.
- Links should remain recognisable as links.

A serif/sans-serif relationship may be used when appropriate, but it is not
mandatory.

Typography should feel publishing-oriented rather than application-oriented.

---

# 5. Color

Prefer a restrained palette.

The default experience should usually rely on:

- paper-like or neutral backgrounds
- dark readable text
- muted secondary text
- one or very few accent colors
- colors arising from archival imagery itself

Do not introduce a rainbow design system merely because multiple colors are
available.

Historical images, covers, posters, scans and documents should often provide
the strongest colors on the page.

Never make the interface compete with the archive.

---

# 6. Borders, Radius and Shadows

Prefer structural lines over floating surfaces.

Good:

- thin rules
- hairline borders
- underlines
- section dividers
- table-like organization
- subtle tonal changes

Use border radius only where it serves a reason.

Do NOT automatically place every component in:

```css
border-radius: 16px;
box-shadow: ...;
````

Many archival elements should have:

```css
border-radius: 0;
box-shadow: none;
```

or something similarly restrained.

Images of books, documents and printed matter should usually preserve their
physical rectangular character.

---

# 7. Layout

Favor editorial and catalogue structures.

Useful patterns include:

* index
* shelf
* catalogue
* bibliography
* table
* list
* masonry collection
* image-led archive grid
* chronological list
* alphabetic index
* typographic grid
* split image / metadata page
* narrow reading column
* broad browsing surface

Different sections may legitimately use different layouts.

For example:

* Works → catalogue/list
* Authors → alphabetical index
* Artefacts → image grid
* Essays → editorial list
* Series → grouped collection
* Search → dense results
* Work page → document/detail composition

Do not force everything through one universal card component.

---

# 8. Homepage

The homepage should establish:

1. what this archive is
2. what is held here
3. how to start exploring it

Do not automatically create a conventional marketing hero.

Avoid:

> Preserve the Past. Inspire the Future.

followed by two giant buttons.

Prefer language and composition closer to an institution, publication,
catalogue, or archive.

A homepage may begin simply with:

* archive name
* one-sentence description
* collection
* newest additions
* selected objects
* categories
* recently restored material
* editorial selection

The archive should become visible quickly.

Do not make users scroll through marketing copy before seeing material.

---

# 9. Archive / Collection Pages

Collection browsing is one of the most important experiences.

Users should be able to scan many records efficiently.

Possible visible fields:

* thumbnail
* title
* creator
* year
* category
* language
* collection
* object type
* short description

Do not hide useful information behind hover states.

Support useful discovery mechanisms where the dataset warrants them:

* search
* author
* creator
* year
* decade
* language
* medium
* type
* topic
* series
* collection
* availability

Filters should feel like catalogue tools, not ecommerce facets.

Prefer textual filters and clear lists over enormous rounded dropdown controls.

---

# 10. Item Detail Pages

An archival object page must clearly establish the identity of the object.

A useful order is:

1. object / document / cover / visual
2. title
3. creator or author
4. date
5. short contextual description
6. structured metadata
7. source / provenance
8. access or reading action
9. related material

This order can change when the material requires it.

Metadata should be intentionally designed.

For example:

```text
Year          1962
Author        Sugiarti Siswadi
Language      Indonesian
Type          Short Stories
Collection    Kacabenggala Editions
Source        ...
```

A simple definition-list structure is often more appropriate than cards.

Use semantic HTML such as `<dl>`, `<dt>`, and `<dd>` when suitable.

Do not hide provenance.

Sources matter.

---

# 11. Images and Archival Objects

Treat archival images as documents, not decoration.

Do not:

* aggressively crop covers
* place fake shadows behind every scan
* tilt images for decoration
* place documents inside fake device mockups
* overlay text unnecessarily
* blur imagery behind headings
* obscure the physical edges of artefacts

Prefer displaying the entire object where practical.

Use:

```css
object-fit: contain;
```

when preserving the full artefact matters more than filling a rectangle.

Always preserve aspect ratio.

Allow images of different dimensions to remain different.

A historical archive does not need every object to fit an identical Instagram
tile.

---

# 12. Metadata is Beautiful

Do not treat metadata as visual clutter that must be hidden.

Information such as:

```text
1958
Jakarta
Siti Rukiah
Indonesian
Book
28 pages
First edition
Source: ...
```

can become part of the visual rhythm.

Dense information is acceptable when:

* hierarchy is clear
* spacing is deliberate
* labels are consistent
* information remains readable

The goal is not minimum information.

The goal is **maximum useful information with minimum interface noise**.

---

# 13. Navigation

Navigation should be direct.

Prefer labels such as:

* Works
* Authors
* Collections
* Finds
* Series
* Articles
* About
* Search

rather than invented marketing terminology.

Desktop navigation does not need to be hidden behind a hamburger menu if there
is enough room.

The site's information architecture should be understandable without a
tutorial.

---

# 14. Search

For an archive, search is not an afterthought.

If the collection is sufficiently large:

* search should be easy to find
* results should appear quickly
* titles and metadata should be searchable
* keyboard interaction should work
* filters should combine predictably
* query state should ideally be reflected in the URL

Never require users to navigate five layers of taxonomy merely to locate a
known work.

---

# 15. Editorial Pages

Essays, biographies, introductions, notes, and historical explanations should
feel like reading a publication.

Use:

* comfortable line length
* meaningful paragraph spacing
* good heading rhythm
* footnotes where needed
* captions
* block quotations
* bibliographic references
* strong image placement

Avoid turning an article into alternating full-width marketing sections.

An article is an article.

Let people read it.

---

# 16. Whitespace and Density

Do not assume more whitespace is always more sophisticated.

Archives sometimes benefit from density.

Use density according to purpose:

### Browsing

Can be relatively dense.

### Metadata

Can be compact.

### Reading

Needs breathing room.

### Object presentation

Needs enough room to inspect the object.

### Navigation

Should remain efficient.

The design can shift between compact catalogue density and generous editorial
space.

---

# 17. Responsive Design

Mobile must be intentionally designed.

Do not merely take desktop columns and stack everything vertically.

On smaller screens:

* preserve hierarchy
* keep metadata readable
* avoid tiny thumbnails
* allow horizontal overflow only for genuinely tabular information
* convert large catalogue layouts intelligently
* preserve search and filtering
* keep object images inspectable
* maintain comfortable reading measure

Test at minimum:

* ~375px
* ~768px
* ~1280px
* large desktop

---

# 18. Interaction

Interaction should be calm and predictable.

Good interactions:

* underline movement
* subtle color changes
* image reveal
* straightforward accordion
* search feedback
* filter updates
* gentle page transitions
* useful sticky navigation where justified

Avoid movement merely to demonstrate technical capability.

Never animate every element on scroll.

Do not make text fade into view one paragraph at a time.

The archive should remain usable when animations are disabled.

Respect:

```css
prefers-reduced-motion
```

---

# 19. Accessibility

The restrained visual language does NOT justify poor accessibility.

Always ensure:

* semantic HTML
* correct heading hierarchy
* keyboard navigation
* visible focus states
* sufficient contrast
* descriptive alternative text
* labelled controls
* accessible dialogs
* accessible menus
* correct form labels
* no hover-only information
* logical tab order
* reduced-motion support

Links must look or behave recognisably like links.

Never remove focus outlines without providing an equivalent.

---

# 20. Performance

An archive may eventually contain hundreds or thousands of records.

Design accordingly.

Prioritize:

* server rendering or static generation where appropriate
* efficient image loading
* responsive image sizes
* lazy loading below the fold
* minimal client JavaScript
* pagination or intelligent incremental loading
* query-efficient filtering
* caching
* lightweight typography
* stable layouts

Avoid shipping a large animation framework for trivial effects.

Prefer HTML and CSS over JavaScript when possible.

---

# 21. Component Architecture

Components should follow actual conceptual boundaries.

Good examples:

```text
ArchiveHeader
ArchiveSearch
WorkIndex
WorkRow
AuthorIndex
ArtefactGrid
ArtefactFigure
MetadataList
CollectionFilter
SeriesIndex
ArticleList
Bibliography
SourceCitation
RelatedWorks
ArchiveFooter
```

Avoid abstraction simply for abstraction's sake.

Do not create generic components such as:

```text
FancyCard
GradientSection
FeatureCard
GlassPanel
BentoBox
```

unless the project genuinely requires them.

---

# 22. Content Before Decoration

When content exists, use real content while developing.

Do not populate archival interfaces with:

```text
Lorem ipsum
John Doe
Example Project
Lorem Archive Item
```

Real titles often reveal layout requirements that placeholder content hides.

Test:

* very long Indonesian titles
* multi-part names
* old spelling
* uncertain dates
* missing authors
* multiple authors
* translations
* long metadata values
* several languages
* unusual punctuation

The layout must accommodate the archive rather than forcing the archive to
accommodate the layout.

---

# 23. Historical and Editorial Sensibility

The interface may reference characteristics of:

* catalogues
* bibliographies
* card indexes
* museum labels
* old books
* periodicals
* archival boxes
* library shelves
* scholarly editions
* print typography

But use these references abstractly.

Do NOT make a fake vintage interface.

Avoid:

* fake paper textures
* artificial stains
* faux typewriter fonts everywhere
* ornamental nostalgia
* fake torn edges
* sepia filters

The material is historical.

The interface does not have to cosplay history.

Build a contemporary interface capable of respecting historical material.

---

# 24. Footer

The footer may be information-dense.

Useful sections include:

* Explore
* About
* Contribute
* Contact
* Sources
* Social
* Legal / disclaimer
* project attribution
* year
* archive statement

Do not reduce the footer to:

```text
© 2026 All rights reserved.
```

if useful institutional information belongs there.

The footer can help explain who maintains the archive and why.

---

# 25. Copywriting

Write plainly.

Prefer:

> A living archive of restored Indonesian writing.

over:

> Rediscover timeless stories that shaped generations.

Prefer:

> Browse 248 works by 63 authors.

over:

> Embark on a journey through our extraordinary collection.

Avoid:

* marketing superlatives
* inspirational filler
* startup language
* "unlock"
* "revolutionize"
* "seamless"
* "elevate"
* "discover the power of"
* "where X meets Y"
* "more than just a..."
* unnecessary rhetorical copy

The archive does not need to sell itself.

Its material is the reason to visit.

---

# 26. Design Decision Hierarchy

Whenever unsure, prioritize in this order:

1. legibility
2. archival integrity
3. discoverability
4. content hierarchy
5. accessibility
6. performance
7. visual character
8. animation and decoration

Decoration comes last.

---

# 27. Before Coding

Before implementing a new page, determine:

### Content

What information actually exists?

### Primary object

What is the user looking at: a book, text, author, image, collection, article,
or search result?

### Primary action

What does the user most likely want to do?

Examples:

* inspect
* read
* search
* browse
* download
* identify
* compare
* follow a series
* inspect provenance

### Appropriate representation

Should this be:

* prose
* list
* index
* grid
* table
* metadata record
* image viewer
* reading view

Do not choose a card grid by default.

---

# 28. Implementation Workflow

For every substantial page:

1. Inspect existing project conventions.
2. Inspect real content and data structures.
3. Determine information hierarchy.
4. Implement semantic markup first.
5. Establish typography.
6. Establish layout.
7. Add imagery.
8. Add interaction.
9. Add responsive behavior.
10. Test keyboard navigation.
11. Test real content edge cases.
12. Test desktop and mobile in an actual browser.
13. Check console errors.
14. Check overflow.
15. Check loading behavior.
16. Check accessibility.
17. Check performance.
18. Remove unnecessary decoration.
19. Remove unnecessary dependencies.
20. Review whether the result looks generically AI-generated.
21. If yes, simplify and redesign.

---

# 29. Browser Review

Never declare the visual implementation complete based only on reading the
source code.

Open the actual website.

Inspect it visually.

At minimum verify:

* homepage
* archive/index
* search/filtering
* representative object page
* representative long-form page
* mobile navigation
* footer

Look for:

* awkward wrapping
* excessive empty space
* accidental card-like appearance
* inconsistent spacing
* poor image cropping
* weak hierarchy
* tiny metadata
* giant headings
* unnecessary pills
* inconsistent alignment
* overflowing content
* broken responsive layouts

Fix problems before considering the implementation finished.

---

# 30. Final Aesthetic Test

Before finishing, ask:

### Does this feel like an archive?

Would this interface make sense for:

* a researcher
* a reader
* a student
* somebody looking for a specific historical object
* somebody browsing without knowing what they want

### Does the material dominate the website?

If users notice the UI before they notice the collection, reconsider the
design.

### Could this have been generated from a generic "modern website" prompt?

If yes, remove generic patterns.

### Does it feel maintained by people who care about the material?

If not, introduce more thoughtful hierarchy, metadata, editorial detail, and
context.

---

# North Star

The desired result sits somewhere between:

**archive catalogue × independent publisher × reading room × digital
collection**

It should be contemporary but not fashionable for fashion's sake.

It should be beautiful because the information is organized beautifully.

It should be distinctive without being loud.

It should allow archival material, books, writing, scans, photographs, and
historical objects to remain the protagonists.

When in doubt:

**show the material, show the metadata, reduce the interface.**

```
```

