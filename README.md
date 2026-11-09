<img src="https://keenanpayne.com/images/work/concise-logo.svg" alt="Concise.css logo" width="300">

> :warning: &nbsp; **Notice:** This project is not actively maintained. Reach out to [@keenanpayne](https://twitter.com/KeenanPayne_) or [@jaiheravi](https://twitter.com/jaiheravi) if you would like to chat about it ✌🏻

Concise CSS is a lightweight CSS framework and preprocessor. It gives you a solid foundation without the bloat. It has three parts, and you can use only the ones you need:

- **The preprocessor**: a CLI and a PostCSS plugin that compile `.ccss` files. They add nesting, imports, `//` comments, an `lh` unit for vertical rhythm, a type scale, named breakpoints and inline media queries.
- **The styles**: `core` (base styles for HTML elements), `ui` (a small kit of components) and `utils` (helper classes).
- **Precompiled CSS** for projects that don't need a build step.

Documentation: [concisecss.com](https://concisecss.com)

## Installation

```
npm install -D concise.css
```

Node.js 22.22 or newer is required.

## Quick start

Create a `main.ccss` file:

```scss
@import 'concise.css';          // core + ui + utils

// Your styles
.hero {
  margin-bottom: 2lh;           // two lines of the vertical rhythm
  font-size: 5;                 // step 5 of the type scale
  padding: 1lh ?if media (--medium);
}
```

Compile it:

```
npx concise compile main.ccss main.css
```

Add `-w` (`--watch`) to recompile when the file, or any file it imports, changes. To run it from `package.json`:

```json
"scripts": {
  "css": "concise compile src/main.ccss dist/main.css",
  "css:watch": "concise compile src/main.ccss dist/main.css -w"
}
```

## Using the styles

Import everything or only the parts you need:

```scss
@import 'concise.css';                          // everything
@import 'concise.css/core';                     // base styles for HTML elements
@import 'concise.css/ui';                       // components: see ui/README.md
@import 'concise.css/utils';                    // helper classes: see utils/README.md
@import 'concise.css/utils/margins-responsive'; // opt-in responsive margin classes
@import 'concise.css/core/settings.ccss';       // a single file
```

Every part imports the settings it needs, and each file is only included once.

### Settings

All settings are custom properties and custom media queries in [`core/settings.ccss`](core/settings.ccss): colors, fonts, spacing, the type ratio and the breakpoints. Override them after importing Concise:

```scss
@import 'concise.css';

@custom-media --medium (width >= 900px);

:root {
  --color-base-primary: rebeccapurple;
  --type-ratio: 1.25;
  line-height: 1.6;
}
```

Colors, fonts and spacing are regular custom properties, so they can also change at runtime. Three things are calculated when compiling, from the last value found in `:root`: the breakpoints, the type scale (`--type-ratio`) and the `lh` unit (`line-height`).

## The `.ccss` syntax

`.ccss` files are CSS with a few additions. Any valid CSS is valid `.ccss`.

| Feature | Write | Get |
|---|---|---|
| Imports | `@import 'partials/header';` | Inlines `partials/header.ccss`, `_header.ccss`, `header.css` or `header/index.ccss`. Bare names are looked up next to the file first, then in `node_modules` |
| Nesting | `.a { &:hover {} .b {} }` | `.a:hover {}` `.a .b {}` |
| Line comments | `// note` | Removed from the output |
| `lh` unit | `margin: 1.5lh` | `rem` based on the root `line-height`, e.g. `2.25rem` |
| Type scale | `font-size: 4` | `1.44rem`: step 2 is `1rem`, and each step multiplies by `--type-ratio` |
| Named breakpoints | `@media (--medium) {}` | `@media (min-width: 768px) {}` |
| Range queries | `@media (480px <= width < 768px)` | `min-width`/`max-width` queries |
| Inline queries | `padding: 0 ?if media (--small);` | A `@media` block placed right after the rule |
| Query blocks | `.a { ?if media (--small) { … } }` | Same, for several declarations |
| Vendor prefixes | | Added by Autoprefixer for your [browserslist](https://github.com/browserslist/browserslist) targets |

Breakpoints defined in the settings: `--extra-small`, `--small`, `--medium`, `--large`, `--extra-large`, `--only-small`, `--only-medium` and `--only-large`.

## Precompiled CSS

Every release ships compiled stylesheets in `dist/`: `concise.css`, `core.css`, `ui.css` and `utils.css`, each with a `.min.css` version. They can be used from a CDN:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/concise.css@5/dist/concise.min.css">
```

## Using the PostCSS plugin

Concise is also a PostCSS plugin, so it works with any tool that runs PostCSS:

```js
// postcss.config.js
import concise from 'concise.css'

export default { plugins: [concise()] }
```

```js
// postcss.config.cjs
module.exports = { plugins: [require('concise.css')()] }
```

Imported `.ccss` files can always use `//` comments. For `//` comments in the file being processed, pass Concise's parser as well (`parser` is a named export, and also `require('concise.css').parser`):

```js
import postcss from 'postcss'
import concise, { parser } from 'concise.css'

const result = await postcss([concise()]).process(css, { from: 'main.ccss', parser })
```

Options, all optional:

```js
concise({
  lh: { rootSelector: ':root', unit: 'lh', lineHeight: 1.5 },          // lineHeight: fallback when :root sets none
  typeScale: { rootSelector: ':root', typeRatio: 1.2, ratioProperty: '--type-ratio' },
  autoprefixer: { /* autoprefixer options */ },                         // or false to skip it
  import: { /* postcss-import options */ }
})
```

## Browser support

The compiled CSS targets current browsers. The UI kit uses [relative color syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_colors/Relative_colors) for the hover and state shades.

## Upgrading from v4

- **Sass → `.ccss`**: rename your `.scss` files, then replace Sass features:
  - `getColor(base, primary)` → `var(--color-base-primary)`
  - `$spacing-m` → `var(--spacing-m)`
  - `typeScale(3)` → `font-size: 3`
  - loops and mixins → plain CSS
- **One package**: `concise-ui`, `concise-utils` and `@concisecss/core` are now part of `concise.css`. Import `concise.css/ui`, `concise.css/utils` and `concise.css/core` instead.
- **The grid** from v4 core is not part of v5. Use CSS grid or flexbox.
- **Responsive margins** are no longer controlled by `$responsive-margins`. Import `concise.css/utils/margins-responsive` instead.

## Development

```
npm install
npm test               # fixtures, plugin, CLI and stylesheet snapshot tests
npm run test:update    # accept stylesheet changes after reviewing the snapshot diff
npm run build          # write dist/
```

To check the styles visually, run `npm run build` and open `playground/core.html` or `playground/ui.html`.

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to contribute.

## Changelog

You can keep up to date with the changes on our [releases page](https://github.com/ConciseCSS/concise.css/releases).

## License

Code released under the [MIT license](LICENSE). Documentation released under [Creative Commons](https://creativecommons.org/licenses/by-sa/4.0/).
