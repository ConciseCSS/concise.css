# Concise Utils

**Utility classes for Concise CSS**

Helper classes that you can use in your markup for fast prototyping or context-dependent styles. They are prefixed with an underscore (`_`) to tell them apart from components and elements.

```css
@import 'concise.css/utils';
@import 'concise.css/utils/margins-responsive'; /* optional, see Responsive margins */
```

Or use the precompiled `dist/utils.css` / `dist/utils.min.css`. Concise Utils imports the [settings](../core/settings.pcss) it needs, so it can be used with or without `concise.css/core`.

## Contents

1. [Borders](#borders)
2. [Colors](#colors)
3. [Columns](#columns)
4. [Hide/Show](#hideshow)
5. [Display](#display)
6. [Margins](#margins)
7. [Responsive margins](#responsive-margins)
8. [Paddings](#paddings)
9. [Position](#position)
10. [Type Scale](#type-scale)
11. [Typography](#typography)

## Utilities

### Borders

There are several classes available to delete or add borders to elements. Those classes begin with a `b`, the initial letter of the side where the class works (optional) and the size of the border from `0 to `4`.

Classes that work on all the sides are composed only of the letter `b` and the width, for example, `_b1`.

#### Reset

```html
<!-- Reset all the borders -->
<div class="_b0">…</div>

<!-- Reset top border -->
<div class="_bt0">…</div>

<!-- Reset right border -->
<div class="_br0">…</div>

<!-- Reset bottom border -->
<div class="_bb0">…</div>

<!-- Reset left border -->
<div class="_bl0">…</div>
```

#### 1px border

```html
<!-- All the borders -->
<div class="_b1">…</div>

<!-- Top border -->
<div class="_bt1">…</div>

<!-- Right border -->
<div class="_br1">…</div>

<!-- Bottom border -->
<div class="_bb1">…</div>

<!-- Left border -->
<div class="_bl1">…</div>
```

#### 2px border

```html
<!-- All the borders -->
<div class="_b2">…</div>

<!-- Top border -->
<div class="_bt2">…</div>

<!-- Right border -->
<div class="_br2">…</div>

<!-- Bottom border -->
<div class="_bb2">…</div>

<!-- Left border -->
<div class="_bl2">…</div>
```

#### 3px border

```html
<!-- All the borders -->
<div class="_b3">…</div>

<!-- Top border -->
<div class="_bt3">…</div>

<!-- Right border -->
<div class="_br3">…</div>

<!-- Bottom border -->
<div class="_bb3">…</div>

<!-- Left border -->
<div class="_bl3">…</div>
```

#### 4px border

```html
<!-- All the borders -->
<div class="_b4">…</div>

<!-- Top border -->
<div class="_bt4">…</div>

<!-- Right border -->
<div class="_br4">…</div>

<!-- Bottom border -->
<div class="_bb4">…</div>

<!-- Left border -->
<div class="_bl4">…</div>
```

### Colors

All the colors in the color palette are available as classes to be used directly within your HTML.

The classes for text colors are prefixed with `_c-`, and the ones for backgrounds with `_bg-`.

Each class uses the matching `--color-*` setting. For example, `var(--color-base-primary)` is available as `_c-base-primary` for text and `_bg-base-primary` for backgrounds.

#### Text Colors

```html
<!-- color: var(--color-base-primary) -->
<div class="_c-base-primary">…</div>

<!-- color: var(--color-base-selection) -->
<div class="_c-base-selection">…</div>

<!-- color: var(--color-base-lines) -->
<div class="_c-base-lines">…</div>

<!-- color: var(--color-text-primary) -->
<div class="_c-text-primary">…</div>

<!-- color: var(--color-text-secondary) -->
<div class="_c-text-secondary">…</div>

<!-- color: var(--color-text-heading) -->
<div class="_c-text-heading">…</div>

<!-- color: var(--color-text-inverted) -->
<div class="_c-text-inverted">…</div>

<!-- color: var(--color-background-dark) -->
<div class="_c-background-dark">…</div>

<!-- color: var(--color-background-light) -->
<div class="_c-background-light">…</div>

<!-- color: var(--color-background-body) -->
<div class="_c-background-body">…</div>

<!-- color: var(--color-state-muted) -->
<div class="_c-state-muted">…</div>

<!-- color: var(--color-state-success) -->
<div class="_c-state-success">…</div>

<!-- color: var(--color-state-warning) -->
<div class="_c-state-warning">…</div>

<!-- color: var(--color-state-error) -->
<div class="_c-state-error">…</div>

<!-- color: var(--color-blue-darker) -->
<div class="_c-blue-darker">…</div>

<!-- color: var(--color-blue-dark) -->
<div class="_c-blue-dark">…</div>

<!-- color: var(--color-blue-base) -->
<div class="_c-blue-base">…</div>

<!-- color: var(--color-blue-light) -->
<div class="_c-blue-light">…</div>

<!-- color: var(--color-blue-lighter) -->
<div class="_c-blue-lighter">…</div>

<!-- color: var(--color-green-darker) -->
<div class="_c-green-darker">…</div>

<!-- color: var(--color-green-dark) -->
<div class="_c-green-dark">…</div>

<!-- color: var(--color-green-base) -->
<div class="_c-green-base">…</div>

<!-- color: var(--color-green-light) -->
<div class="_c-green-light">…</div>

<!-- color: var(--color-green-lighter) -->
<div class="_c-green-lighter">…</div>

<!-- color: var(--color-red-darker) -->
<div class="_c-red-darker">…</div>

<!-- color: var(--color-red-dark) -->
<div class="_c-red-dark">…</div>

<!-- color: var(--color-red-base) -->
<div class="_c-red-base">…</div>

<!-- color: var(--color-red-light) -->
<div class="_c-red-light">…</div>

<!-- color: var(--color-red-lighter) -->
<div class="_c-red-lighter">…</div>

<!-- color: var(--color-gray-darker) -->
<div class="_c-gray-darker">…</div>

<!-- color: var(--color-gray-dark) -->
<div class="_c-gray-dark">…</div>

<!-- color: var(--color-gray-base) -->
<div class="_c-gray-base">…</div>

<!-- color: var(--color-gray-light) -->
<div class="_c-gray-light">…</div>

<!-- color: var(--color-gray-lighter) -->
<div class="_c-gray-lighter">…</div>
```

#### Background Colors

```html
<!-- background-color: var(--color-base-primary) -->
<div class="_bg-base-primary">…</div>

<!-- background-color: var(--color-base-selection) -->
<div class="_bg-base-selection">…</div>

<!-- background-color: var(--color-base-lines) -->
<div class="_bg-base-lines">…</div>

<!-- background-color: var(--color-text-primary) -->
<div class="_bg-text-primary">…</div>

<!-- background-color: var(--color-text-secondary) -->
<div class="_bg-text-secondary">…</div>

<!-- background-color: var(--color-text-heading) -->
<div class="_bg-text-heading">…</div>

<!-- background-color: var(--color-text-inverted) -->
<div class="_bg-text-inverted">…</div>

<!-- background-color: var(--color-background-dark) -->
<div class="_bg-background-dark">…</div>

<!-- background-color: var(--color-background-light) -->
<div class="_bg-background-light">…</div>

<!-- background-color: var(--color-background-body) -->
<div class="_bg-background-body">…</div>

<!-- background-color: var(--color-state-muted) -->
<div class="_bg-state-muted">…</div>

<!-- background-color: var(--color-state-success) -->
<div class="_bg-state-success">…</div>

<!-- background-color: var(--color-state-warning) -->
<div class="_bg-state-warning">…</div>

<!-- background-color: var(--color-state-error) -->
<div class="_bg-state-error">…</div>

<!-- background-color: var(--color-blue-darker) -->
<div class="_bg-blue-darker">…</div>

<!-- background-color: var(--color-blue-dark) -->
<div class="_bg-blue-dark">…</div>

<!-- background-color: var(--color-blue-base) -->
<div class="_bg-blue-base">…</div>

<!-- background-color: var(--color-blue-light) -->
<div class="_bg-blue-light">…</div>

<!-- background-color: var(--color-blue-lighter) -->
<div class="_bg-blue-lighter">…</div>

<!-- background-color: var(--color-green-darker) -->
<div class="_bg-green-darker">…</div>

<!-- background-color: var(--color-green-dark) -->
<div class="_bg-green-dark">…</div>

<!-- background-color: var(--color-green-base) -->
<div class="_bg-green-base">…</div>

<!-- background-color: var(--color-green-light) -->
<div class="_bg-green-light">…</div>

<!-- background-color: var(--color-green-lighter) -->
<div class="_bg-green-lighter">…</div>

<!-- background-color: var(--color-red-darker) -->
<div class="_bg-red-darker">…</div>

<!-- background-color: var(--color-red-dark) -->
<div class="_bg-red-dark">…</div>

<!-- background-color: var(--color-red-base) -->
<div class="_bg-red-base">…</div>

<!-- background-color: var(--color-red-light) -->
<div class="_bg-red-light">…</div>

<!-- background-color: var(--color-red-lighter) -->
<div class="_bg-red-lighter">…</div>

<!-- background-color: var(--color-gray-darker) -->
<div class="_bg-gray-darker">…</div>

<!-- background-color: var(--color-gray-dark) -->
<div class="_bg-gray-dark">…</div>

<!-- background-color: var(--color-gray-base) -->
<div class="_bg-gray-base">…</div>

<!-- background-color: var(--color-gray-light) -->
<div class="_bg-gray-light">…</div>

<!-- background-color: var(--color-gray-lighter) -->
<div class="_bg-gray-lighter">…</div>
```

### Columns

It is possible to split the content into several columns, up to 12, using the column utilities.

Those classes use the [multi-column layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_multicol_layout).

Also, there is a class to build masonry-type layouts with pure CSS quickly.

#### Columns

```HTML
<div class="_cols-1">…</div>
<div class="_cols-2">…</div>
…
<div class="_cols-11">…</div>
<div class="_cols-12">…</div>
```

#### Gap between columns

You can set the space between the columns; it uses the `--gutter` setting.

```HTML
<div class="_col-gap">…</div>
```

#### Masonry layout

```HTML
<div class="_masonry">…</div>
```

### Hide/Show

You can hide or show elements depending on certain key points, like the device size, resolution, or media (printing or screen).

#### Show elements

```html
<!-- Show only on extra small devices -->
<div class="_show-xs">…</div>

<!-- Show only on small devices -->
<div class="_show-s">…</div>

<!-- Show only on medium devices -->
<div class="_show-m">…</div>

<!-- Show only on large devices -->
<div class="_show-l">…</div>

<!-- Show only on extra large devices -->
<div class="_show-xl">…</div>

<!-- Show only on print -->
<div class="_show-print">…</div>

<!-- Show only on high density (retina) devices -->
<div class="_show-hd">…</div>
```

#### Hide elements

```html
<!-- Hide only on extra small devices -->
<div class="_hide-xs">…</div>

<!-- Hide only on small devices -->
<div class="_hide-s">…</div>

<!-- Hide only on medium devices -->
<div class="_hide-m">…</div>

<!-- Hide only on large devices -->
<div class="_hide-l">…</div>

<!-- Hide only on extra large devices -->
<div class="_hide-xl">…</div>

<!-- Hide only on print -->
<div class="_hide-print">…</div>

<!-- Hide only on high density (retina) devices -->
<div class="_hide-hd">…</div>
```

### Display

The `display` properties are also exposed via HTML classes so you can use them in your markup quickly.

```html
<!-- Equivalent to display: inline-block -->
<div class="_inline-block">…</div>

<!-- Equivalent to display: block -->
<div class="_block">…</div>

<!-- Equivalent to display: inline -->
<div class="_inline">…</div>

<!-- Equivalent to display: flex -->
<div class="_flex">…</div>
```

### Margins

As with the borders, you have predefined classes to reset or add margins. They use the `--spacing-*` values defined in the [settings](../core/settings.pcss).

These classes can be especially useful to keep your CSS clean, by adding margins in your markup depending of the context without having to create extra styles, or a component/element variant.

#### Reset margins

```html
<!-- Reset all margins -->
<div class="_m0">…</div>

<!-- Reset top margin -->
<div class="_mt0">…</div>

<!-- Reset right margin -->
<div class="_mr0">…</div>

<!-- Reset bottom margin -->
<div class="_mb0">…</div>

<!-- Reset left margin -->
<div class="_ml0">…</div>
```

#### Margins on all sides

```html
<!-- Extra small margin on all sides -->
<div class="_mxs">…</div>

<!-- Small margin on all sides -->
<div class="_ms">…</div>

<!-- Medium margin on all sides -->
<div class="_mm">…</div>

<!-- Large margin on all sides -->
<div class="_ml">…</div>

<!-- Extra large margin on all sides -->
<div class="_mxl">…</div>
```

#### Extra small margins

```html
<!-- Extra small top margin -->
<div class="_mtxs">…</div>

<!-- Extra small right margin -->
<div class="_mrxs">…</div>

<!-- Extra small bottom margin -->
<div class="_mbxs">…</div>

<!-- Extra small left margin -->
<div class="_mlxs">…</div>
```

#### Small margins

```html
<!-- Small top margin -->
<div class="_mts">…</div>

<!-- Small right margin -->
<div class="_mrs">…</div>

<!-- Small bottom margin -->
<div class="_mbs">…</div>

<!-- Small left margin -->
<div class="_mls">…</div>
```

#### Medium margins

```html
<!-- Medium top margin -->
<div class="_mtm">…</div>

<!-- Medium right margin -->
<div class="_mrm">…</div>

<!-- Medium bottom margin -->
<div class="_mbm">…</div>

<!-- Medium left margin -->
<div class="_mlm">…</div>
```

#### Large margins

```html
<!-- Large top margin -->
<div class="_mtl">…</div>

<!-- Large right margin -->
<div class="_mrl">…</div>

<!-- Large bottom margin -->
<div class="_mbl">…</div>

<!-- Large left margin -->
<div class="_mll">…</div>
```

#### Extra large margins

```html
<!-- Extra large top margin -->
<div class="_mtxl">…</div>

<!-- Extra large right margin -->
<div class="_mrxl">…</div>

<!-- Extra large bottom margin -->
<div class="_mbxl">…</div>

<!-- Extra large left margin -->
<div class="_mlxl">…</div>
```

### Responsive margins

An opt-in set of margin classes with numbered sizes and breakpoint suffixes. Import it separately:

```css
@import 'concise.css/utils/margins-responsive';
```

Class names are `_` + side + size + optional breakpoint:

- **Sides:** `m` (all), `mt`, `mr`, `mb`, `ml`, `mv` (top and bottom), `mh` (left and right)
- **Sizes:** `0` (none), `1` (`--spacing-xs`), `2` (`--spacing-s`), `3` (`--spacing-m`), `4` (`--spacing-l`), `5` (`--spacing-xl`)
- **Breakpoints:** `-s`, `-m`, `-l`, `-xl` apply from that breakpoint up (`--small`, `--medium`, `--large`, `--extra-large`)

```html
<!-- Small vertical margin, large from medium screens up -->
<div class="_mv2 _mv4-m">…</div>

<!-- No left margin on small screens, medium from large screens up -->
<div class="_ml0 _ml3-l">…</div>
```

### Paddings

The same classes used for margins are also available for paddings with a slightly different syntax, a `p` instead of an `m`.

#### Reset paddings

```html
<!-- Reset all paddings -->
<div class="_p0">…</div>

<!-- Reset top padding -->
<div class="_pt0">…</div>

<!-- Reset right padding -->
<div class="_pr0">…</div>

<!-- Reset bottom padding -->
<div class="_pb0">…</div>

<!-- Reset left padding -->
<div class="_pl0">…</div>
```

#### Paddings on all sides

```html
<!-- Extra small padding on all sides -->
<div class="_pxs">…</div>

<!-- Small padding on all sides -->
<div class="_ps">…</div>

<!-- Medium padding on all sides -->
<div class="_pm">…</div>

<!-- Large padding on all sides -->
<div class="_pl">…</div>

<!-- Extra large padding on all sides -->
<div class="_pxl">…</div>
```

#### Extra small paddings

```html
<!-- Extra small top padding -->
<div class="_ptxs">…</div>

<!-- Extra small right padding -->
<div class="_prxs">…</div>

<!-- Extra small bottom padding -->
<div class="_pbxs">…</div>

<!-- Extra small left padding -->
<div class="_plxs">…</div>
```

#### Small paddings

```html
<!-- Small top padding -->
<div class="_pts">…</div>

<!-- Small right padding -->
<div class="_prs">…</div>

<!-- Small bottom padding -->
<div class="_pbs">…</div>

<!-- Small left padding -->
<div class="_pls">…</div>
```

#### Medium paddings

```html
<!-- Medium top padding -->
<div class="_ptm">…</div>

<!-- Medium right padding -->
<div class="_prm">…</div>

<!-- Medium bottom padding -->
<div class="_pbm">…</div>

<!-- Medium left padding -->
<div class="_plm">…</div>
```

#### Large paddings

```html
<!-- Large top padding -->
<div class="_ptl">…</div>

<!-- Large right padding -->
<div class="_prl">…</div>

<!-- Large bottom padding -->
<div class="_pbl">…</div>

<!-- Large left padding -->
<div class="_pll">…</div>
```

#### Extra large paddings

```html
<!-- Extra large top padding -->
<div class="_ptxl">…</div>

<!-- Extra large right padding -->
<div class="_prxl">…</div>

<!-- Extra large bottom padding -->
<div class="_pbxl">…</div>

<!-- Extra large left padding -->
<div class="_plxl">…</div>
```

### Position

Concise Utils also exposes all the values of the `position` property so you can use them directly in your HTML.

```html
<!-- Equivalent to position: absolute -->
<div class="_abs">…</div>

<!-- Equivalent to position: relative -->
<div class="_rel">…</div>

<!-- Equivalent to position: static -->
<div class="_sta">…</div>

<!-- Equivalent to position: fixed -->
<div class="_fix">…</div>
```

### Type Scale

The first ten sizes of the type scale are available to use in HTML. They follow the `--type-ratio` setting: size 2 is `1rem`, and each step up multiplies it by the ratio.

```html
<!-- Equivalent to font-size: 1 in .pcss -->
<div class="_ts1">…</div>

<!-- Equivalent to font-size: 2 in .pcss -->
<div class="_ts2">…</div>

<!-- Equivalent to font-size: 3 in .pcss -->
<div class="_ts3">…</div>

<!-- Equivalent to font-size: 4 in .pcss -->
<div class="_ts4">…</div>

<!-- Equivalent to font-size: 5 in .pcss -->
<div class="_ts5">…</div>

<!-- Equivalent to font-size: 6 in .pcss -->
<div class="_ts6">…</div>

<!-- Equivalent to font-size: 7 in .pcss -->
<div class="_ts7">…</div>

<!-- Equivalent to font-size: 8 in .pcss -->
<div class="_ts8">…</div>

<!-- Equivalent to font-size: 9 in .pcss -->
<div class="_ts9">…</div>

<!-- Equivalent to font-size: 10 in .pcss -->
<div class="_ts10">…</div>
```

### Typography

Lastly, there are a variety of helper classes for typography that you can use when prototyping your website or to add styles depending on the context.

```html
<!-- Equivalent to font-weight: bold -->
<div class="_bold">…</div>

<!-- Equivalent to text-transform: uppercase -->
<div class="_caps">…</div>

<!-- Equivalent to font-size: inherit -->
<div class="_font-size-inherit">…</div>

<!-- Equivalent to font-style: italic -->
<div class="_italic">…</div>

<!-- Equivalent to text-decoration: none -->
<div class="_no-decoration">…</div>

<!-- Equivalent to font-weight: normal -->
<div class="_regular">…</div>

<!-- Equivalent to font-feature-settings: "smcp" 1, "c2sc" 1 -->
<div class="_small-caps">…</div>

<!-- Equivalent to text-align: center -->
<div class="_text-center">…</div>

<!-- Equivalent to text-align: left -->
<div class="_text-left">…</div>

<!-- Equivalent to text-align: right -->
<div class="_text-right">…</div>

<!-- Equivalent to text-decoration: underline -->
<div class="_underline">…</div>

<!-- Equivalent to letter-spacing: var(--letter-spacing) -->
<div class="_letter-spacing">…</div>
```

#### Font families

```html
<!-- Equivalent to font-family: inherit -->
<div class="_font-family-inherit">…</div>

<!-- Equivalent to font-family: var(--font-primary) -->
<div class="_font-primary">…</div>

<!-- Equivalent to font-family: var(--font-secondary) -->
<div class="_font-secondary">…</div>

<!-- Equivalent to font-family: var(--font-mono) -->
<div class="_font-mono">…</div>

<!-- Equivalent to font-family: var(--font-print-primary) -->
<div class="_font-print">…</div>

<!-- Equivalent to font-family: var(--font-print-secondary) -->
<div class="_font-print-secondary">…</div>
```

## License

MIT, see [LICENSE](../LICENSE).
