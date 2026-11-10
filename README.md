<img src="https://keenanpayne.com/images/work/concise-logo.svg" alt="Concise.css logo" width="300">

> :warning: &nbsp; **Notice:** This project is not actively maintained. Reach out to [@keenanpayne](https://twitter.com/KeenanPayne_) or [@jaiheravi](https://twitter.com/jaiheravi) if you would like to chat about it ✌🏻

Concise CSS is a lightweight CSS framework and preprocessor. It gives you a solid foundation without the bloat. It has three parts, and you can use only the ones you need:

- **The preprocessor**: a CLI and a PostCSS plugin that compile `.pcss` files. They add imports, `//` comments, a type scale, named breakpoints and inline media queries on top of modern CSS (nesting, range queries, `rlh` units).
- **The styles**: `core` (base styles for HTML elements), `ui` (a small kit of components) and `utils` (helper classes).
- **Precompiled CSS** for projects that don't need a build step.

Documentation: [concisecss.com](https://concisecss.com)

## Installation

```
npm install -D concise.css
```

Node.js 22.22 or newer is required.

## Quick start

Create a `main.pcss` file:

```scss
@import 'concise.css';          // core + ui + utils

// Your styles
.hero {
  margin-bottom: 2rlh;          // two lines of the vertical rhythm (native CSS)
  font-size: 5;                 // step 5 of the type scale
  padding: 1rlh ?if media (--medium);
}
```

Compile it:

```
npx concise compile main.pcss main.css
```

Add `-w` (`--watch`) to recompile when the file, or any file it imports, changes. To run it from `package.json`:

```json
"scripts": {
  "css": "concise compile src/main.pcss dist/main.css",
  "css:watch": "concise compile src/main.pcss dist/main.css -w"
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
@import 'concise.css/core/settings.pcss';       // a single file
```

Every part imports the settings it needs, and each file is only included once.

### Settings

All settings are custom properties and custom media queries in [`core/settings.pcss`](core/settings.pcss): colors, fonts, spacing, the type ratio and the breakpoints. Override them after importing Concise:

```scss
@import 'concise.css';

@custom-media --medium (width >= 900px);

:root {
  --color-base-primary: rebeccapurple;
  --type-ratio: 1.25;
  line-height: 1.6;
}
```

Colors, fonts, spacing and the type ratio are regular custom properties, so they can also change at runtime, even per component. Only the breakpoints are resolved when compiling. Vertical rhythm uses the native `rlh` unit, so it follows the `line-height` of `:root`.

## The `.pcss` syntax

`.pcss` files are CSS with a few additions. Any valid CSS is valid `.pcss`, and native features such as nesting, media query ranges and the `rlh` unit are left as written.

| Feature | Write | Get |
|---|---|---|
| Imports | `@import 'partials/header';` | Inlines `partials/header.pcss`, `_header.pcss`, `header.css` or `header/index.pcss`. Bare names are looked up next to the file first, then in `node_modules` |
| Line comments | `// note` | Removed from the output |
| Type scale | `font-size: 4` | `calc(pow(var(--type-ratio), 2) * 1rem)`: step 2 is `1rem`, and each step multiplies by `--type-ratio` |
| Named breakpoints | `@media (--medium) {}` | `@media (width >= 768px) {}` |
| Inline queries | `padding: 0 ?if media (--small);` | A `@media` block placed right after the rule |
| Query blocks | `.a { ?if media (--small) { … } }` | Same, for several declarations |

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

Imported `.pcss` files can always use `//` comments. For `//` comments in the file being processed, pass Concise's parser as well (`parser` is a named export, and also `require('concise.css').parser`):

```js
import postcss from 'postcss'
import concise, { parser } from 'concise.css'

const result = await postcss([concise()]).process(css, { from: 'main.pcss', parser })
```

Options, all optional:

```js
concise({
  import: { /* postcss-import options */ }
})
```

## Browser support

The compiled CSS targets current browsers and uses native [nesting](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting), media query range syntax, the `rlh` unit, `pow()` and, in the UI kit, [relative color syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_colors/Relative_colors). No vendor prefixes are added. To support older browsers, add plugins such as `postcss-nested`, `postcss-media-minmax` or `autoprefixer` after `concise()` in your own PostCSS config.

## Upgrading from v4

- **Sass → `.pcss`**: rename your `.scss` files to `.pcss`, then replace Sass features:
  - `getColor(base, primary)` → `var(--color-base-primary)`
  - `$spacing-m` → `var(--spacing-m)`
  - `typeScale(3)` → `font-size: 3`
  - loops and mixins → plain CSS
  - `&-suffix` / `&_suffix` selector concatenation → full class names (native nesting can't build selectors from parts)
- **`lh` unit → `rlh`**: Concise's `lh` unit was the root line height, which is native `rlh`. Replace `1.5lh` with `1.5rlh`. Native `lh` is the element's own line height.
- **Removed options**: `lh`, `typeScale` and `autoprefixer`. Add Autoprefixer to your own PostCSS config if you need it.
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
