<img src="https://keenanpayne.com/images/work/concise-logo.svg" alt="Concise.css logo" width="300">

# Concise Utils

**Utility classes for Concise CSS**

> :warning: &nbsp; **Notice:** This project is not actively maintained. Reach out to [@keenanpayne](https://twitter.com/KeenanPayne_) or [@jaiheravi](https://twitter.com/jaiheravi) if you would like to chat about it ✌🏻

## Content

1. Introduction
2. Installation
3. Utilities
  1. Borders
  2. Colors
  3. Columns
  4. Hide/Show
  5. Display
  6. Margins
  7. Paddings
  8. Position
  9. Type Scale
  10. Typography
4. License

## Introduction

Concise Utils is one of the official add-ons for Concise CSS. It provides helper classes that you can use in your markup for fast prototyping or context-dependent styles.

Helper classes are prefixed with an underscore (`_`) to distinguish them from components or elements.

## Installation

### With NPM

```
npm install concise-utils
```

```scss
@import 'node_modules/concise-utils/concise-utils'
```

### Using the CDN

```HTML
<!-- Normal - Latest version -->
<link rel="stylesheet" href="https://cdn.concisecss.com/concise-utils/concise-utils.css">

<!-- Minified - Latest version -->
<link rel="stylesheet" href="https://cdn.concisecss.com/concise-utils/concise-utils.min.css">
```

That is for the latest version, if you want to use a specific one you can do something like the following:

```HTML
<!-- Normal - Specific version -->
<link rel="stylesheet" href="https://cdn.concisecss.com/concise-utils/v1.0.0/concise.css">

<!-- Minified - Specific version -->
<link rel="stylesheet" href="https://cdn.concisecss.com/concise-utils/v1.0.0/concise.min.css">
```

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

##### 4px border

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

The classes for text colors are prefixed with `_c-` and `_bg-` for backrounds.

The color follows the same schema in the $colors map. For example, you can use the color obtained with `getColor(base, primary)` in HTML as `_c-base-primary` for text or `_bg-base-primary` for backgrounds.

#### Text Colors

```html
<!-- Equivalent to getColor(base, primary) -->
<div class="_c-base-primary">…</div>

<!-- Equivalent to getColor(base, selection) -->
<div class="_c-base-selection">…</div>

<!-- Equivalent to getColor(base, lines) -->
<div class="_c-base-lines">…</div>

<!-- Equivalent to getColor(text, primary) -->
<div class="_c-text-primary">…</div>

<!-- Equivalent to getColor(text, secondary) -->
<div class="_c-text-secondary">…</div>

<!-- Equivalent to getColor(text, heading) -->
<div class="_c-text-heading">…</div>

<!-- Equivalent to getColor(text, ui) -->
<div class="_c-text-ui">…</div>

<!-- Equivalent to getColor(background, dark) -->
<div class="_c-background-dark">…</div>

<!-- Equivalent to getColor(background, light) -->
<div class="_c-background-light">…</div>

<!-- Equivalent to getColor(background, body) -->
<div class="_c-background-body">…</div>

<!-- Equivalent to getColor(state, muted) -->
<div class="_c-state-muted">…</div>

<!-- Equivalent to getColor(state, primary) -->
<div class="_c-state-primary">…</div>

<!-- Equivalent to getColor(state, success) -->
<div class="_c-state-success">…</div>

<!-- Equivalent to getColor(state, warning) -->
<div class="_c-state-warning">…</div>

<!-- Equivalent to getColor(state, error) -->
<div class="_c-state-error">…</div>

<!-- Equivalent to getColor(blue, darker) -->
<div class="_c-blue-darker">…</div>

<!-- Equivalent to getColor(blue, dark) -->
<div class="_c-blue-dark">…</div>

<!-- Equivalent to getColor(blue, base) -->
<div class="_c-blue-base">…</div>

<!-- Equivalent to getColor(blue, light) -->
<div class="_c-blue-light">…</div>

<!-- Equivalent to getColor(blue, lighter) -->
<div class="_c-blue-lighter">…</div>

<!-- Equivalent to getColor(green, darker) -->
<div class="_c-green-darker">…</div>

<!-- Equivalent to getColor(green, dark) -->
<div class="_c-green-dark">…</div>

<!-- Equivalent to getColor(green, base) -->
<div class="_c-green-base">…</div>

<!-- Equivalent to getColor(green, light) -->
<div class="_c-green-light">…</div>

<!-- Equivalent to getColor(green, lighter) -->
<div class="_c-green-lighter">…</div>

<!-- Equivalent to getColor(red, darker) -->
<div class="_c-red-darker">…</div>

<!-- Equivalent to getColor(red, dark) -->
<div class="_c-red-dark">…</div>

<!-- Equivalent to getColor(red, base) -->
<div class="_c-red-base">…</div>

<!-- Equivalent to getColor(red, light) -->
<div class="_c-red-light">…</div>

<!-- Equivalent to getColor(red, lighter) -->
<div class="_c-red-lighter">…</div>

<!-- Equivalent to getColor(gray, darker) -->
<div class="_c-gray-darker">…</div>

<!-- Equivalent to getColor(gray, dark) -->
<div class="_c-gray-dark">…</div>

<!-- Equivalent to getColor(gray, base) -->
<div class="_c-gray-base">…</div>

<!-- Equivalent to getColor(gray, light) -->
<div class="_c-gray-light">…</div>

<!-- Equivalent to getColor(gray, lighter) -->
<div class="_c-gray-lighter">…</div>
```

#### Background Colors

```html
<!-- Equivalent to getColor(base, primary) -->
<div class="_bg-base-primary">…</div>

<!-- Equivalent to getColor(base, selection) -->
<div class="_bg-base-selection">…</div>

<!-- Equivalent to getColor(base, lines) -->
<div class="_bg-base-lines">…</div>

<!-- Equivalent to getColor(text, primary) -->
<div class="_bg-text-primary">…</div>

<!-- Equivalent to getColor(text, secondary) -->
<div class="_bg-text-secondary">…</div>

<!-- Equivalent to getColor(text, heading) -->
<div class="_bg-text-heading">…</div>

<!-- Equivalent to getColor(text, ui) -->
<div class="_bg-text-ui">…</div>

<!-- Equivalent to getColor(background, dark) -->
<div class="_bg-background-dark">…</div>

<!-- Equivalent to getColor(background, light) -->
<div class="_bg-background-light">…</div>

<!-- Equivalent to getColor(background, body) -->
<div class="_bg-background-body">…</div>

<!-- Equivalent to getColor(state, muted) -->
<div class="_bg-state-muted">…</div>

<!-- Equivalent to getColor(state, primary) -->
<div class="_bg-state-primary">…</div>

<!-- Equivalent to getColor(state, success) -->
<div class="_bg-state-success">…</div>

<!-- Equivalent to getColor(state, warning) -->
<div class="_bg-state-warning">…</div>

<!-- Equivalent to getColor(state, error) -->
<div class="_bg-state-error">…</div>

<!-- Equivalent to getColor(blue, darker) -->
<div class="_bg-blue-darker">…</div>

<!-- Equivalent to getColor(blue, dark) -->
<div class="_bg-blue-dark">…</div>

<!-- Equivalent to getColor(blue, base) -->
<div class="_bg-blue-base">…</div>

<!-- Equivalent to getColor(blue, light) -->
<div class="_bg-blue-light">…</div>

<!-- Equivalent to getColor(blue, lighter) -->
<div class="_bg-blue-lighter">…</div>

<!-- Equivalent to getColor(green, darker) -->
<div class="_bg-green-darker">…</div>

<!-- Equivalent to getColor(green, dark) -->
<div class="_bg-green-dark">…</div>

<!-- Equivalent to getColor(green, base) -->
<div class="_bg-green-base">…</div>

<!-- Equivalent to getColor(green, light) -->
<div class="_bg-green-light">…</div>

<!-- Equivalent to getColor(green, lighter) -->
<div class="_bg-green-lighter">…</div>

<!-- Equivalent to getColor(red, darker) -->
<div class="_bg-red-darker">…</div>

<!-- Equivalent to getColor(red, dark) -->
<div class="_bg-red-dark">…</div>

<!-- Equivalent to getColor(red, base) -->
<div class="_bg-red-base">…</div>

<!-- Equivalent to getColor(red, light) -->
<div class="_bg-red-light">…</div>

<!-- Equivalent to getColor(red, lighter) -->
<div class="_bg-red-lighter">…</div>

<!-- Equivalent to getColor(gray, darker) -->
<div class="_bg-gray-darker">…</div>

<!-- Equivalent to getColor(gray, dark) -->
<div class="_bg-gray-dark">…</div>

<!-- Equivalent to getColor(gray, base) -->
<div class="_bg-gray-base">…</div>

<!-- Equivalent to getColor(gray, light) -->
<div class="_bg-gray-light">…</div>

<!-- Equivalent to getColor(gray, lighter) -->
<div class="_bg-gray-lighter">…</div>
```

## Columns

Is possible to split the content into several columns, up to 12 by default, using the column utilities.

Those classes use the #[a(href='https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Columns/Using_multi-column_layoutsare different') Multicolumn layout], so they are distinct from the grid included in the core of Concise CSS.

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

You can set the space between the columns, by default it will have the value of the #[code $gutter] variable.

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

#### Margins

As with the borders, you have predefined classes to reset or add margins. They will use the value in the spacing variables defined in the [settings file](http://concisecss.com/documentation/core#settings).

These variables can be especially useful to keep your CSS clean, by adding margins in your markup depending of the context without having to create extra styles, or a component/element variant.

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

The first ten sizes in the primary type scale are available to use in HTML; those are built using the `typeScale()` function and are updated depending on your settings.

```html
<!-- Equivalent to typeScale(1) -->
<div class="_ts1">…</div>

<!-- Equivalent to typeScale(2) -->
<div class="_ts2">…</div>

<!-- Equivalent to typeScale(3) -->
<div class="_ts3">…</div>

<!-- Equivalent to typeScale(4) -->
<div class="_ts4">…</div>

<!-- Equivalent to typeScale(5) -->
<div class="_ts5">…</div>

<!-- Equivalent to typeScale(6) -->
<div class="_ts6">…</div>

<!-- Equivalent to typeScale(7) -->
<div class="_ts7">…</div>

<!-- Equivalent to typeScale(8) -->
<div class="_ts8">…</div>

<!-- Equivalent to typeScale(9) -->
<div class="_ts9">…</div>

<!-- Equivalent to typeScale(10) -->
<div class="_ts10">…</div>
```

### Typography

Lastly, Concise Utils offers a variety of helper classes for typography that you can use when prototyping your website or to add styles depending on the context.

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

<!-- Equivalent to letter-spacing: $letter-spacing -->
<div class="_letter-spacing">…</div>
```

#### Font families

```html
<!-- Equivalent to font-family: inherit -->
<div class="_font-family-inherit">…</div>

<!-- Equivalent to font-family: $font-primary -->
<div class="_font-primary">…</div>

<!-- Equivalent to font-family: $font-secondary -->
<div class="_font-secondary">…</div>

<!-- Equivalent to font-family: $font-mono -->
<div class="_font-mono">…</div>

<!-- Equivalent to font-family: $font-print-primary -->
<div class="_font-print">…</div>

<!-- Equivalent to font-family: $font-print-secondary -->
<div class="_font-print-secondary">…</div>
```

## License

MIT - James Kolce
