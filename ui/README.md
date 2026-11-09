# Concise UI

A basic user interface kit for Concise CSS: a few components and element variants to help you build websites quicker.

```scss
@import 'concise.css/ui';
```

Or use the precompiled `dist/ui.css` / `dist/ui.min.css`. Concise UI imports the [settings](../core/settings.ccss) it needs, so it can be used with or without `concise.css/core`. Colors follow the `--color-*` settings, including when they change at runtime.

Components follow the [RSCSS](https://rscss.io) convention:
- components have two-word class names (`.alert-box`);
- elements inside them have one-word class names (`> .close`);
- variants start with a dash (`.-success`).

**State variants:** several components accept `-muted`, `-success`, `-warning` and `-error`, which use the `--color-state-*` colors.

## Components

### Alert box

```html
<section class="alert-box -warning">
  <p>Something needs your attention.</p>
  <a class="close" href="#">&times;</a>
</section>
```

Variants: the state variants.

### Breadcrumb nav

```html
<ul class="breadcrumb-nav">
  <li class="item"><a href="#">Home</a></li>
  <li class="item"><a href="#">Level 1</a></li>
  <li class="item -active">Current page</li>
</ul>
```

### Button group

```html
<ul class="button-group">
  <li><a class="item" href="#">1</a></li>
  <li><a class="item -active" href="#">2</a></li>
  <li><a class="item" href="#">3</a></li>
</ul>
```

### Card box

```html
<div class="card-box">
  <div class="header">Header</div>
  <img class="image" src="photo.jpg" alt="">
  <div class="card-content">
    <h3 class="title">Card title</h3>
    <p>Card text.</p>
  </div>
  <div class="footer">Footer</div>
</div>
```

`.header`, `.image` and `.footer` are optional.

### Dropdown button

Opens on focus (click or keyboard). Add `-hover` to also open it on hover, and `-top` to open it above the button.

```html
<div class="dropdown-button -hover" tabindex="0">
  Options
  <ul class="dropdown-content">
    <li class="item"><a href="#">First</a></li>
    <li class="item"><a href="#">Second</a></li>
  </ul>
</div>
```

`.dropdown-content` can also contain a `.text` block instead of items.

### Progress bar

```html
<div class="progress-bar -striped -animated">
  <span class="progress" style="width: 60%">60%</span>
</div>
```

Variants: `-striped` (combine with `-animated`), `-small`, `-large`, and `-stacked` for several `.progress` segments side by side.

## Elements

### Buttons

```html
<button class="-success">Save</button>
<button class="-bordered -error">Delete</button>

<button class="-prefix"><span class="prefix">$</span> Pay</button>
<button class="-affix">Download <span class="affix">2 MB</span></button>
```

Variants: the state variants, `-bordered` (combines with a state variant), `-prefix` and `-affix`.

### Tag box

```html
<span class="tag-box -success">New</span>
<span class="tag-box -pill">Pill</span>
```

Variants: the state variants, and `-pill` for fully rounded corners. Tags inside headings scale with the heading.

### Spinner

```html
<div class="spinner"></div>
```

To see every component, build the project (`npm run build`) and open [`playground/ui.html`](../playground/ui.html).
