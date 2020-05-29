<p align="center">
  <img src="https://i.imgur.com/ihzCgEr.png">
</p>

## Installing the CLI Locally

To install the Concise CLI in a project just run the following command:

```
npm install -D ConciseCSS/concise.css#dev
```

## Using Packages and Writing Styles

The Concise CLI can be used independently of any styles. In principle, it would will with any other CSS library, framework or any existing project so long as the code is plain CSS or contains only the features that can be compiled with PostCSS. Of course, one can start writing everything from scratch using Concise as well.

The core library contains the very basic styles that one might use, and contains most of the code that was available on Concise v4. This can be installed by running:

```
npm install -D ConciseCSS/core#master
```

You can then include Concise in your project by importing it into your stylesheet:

```
@import '@concisecss/core';
```

The previous line will include all the styles that Concise provides. However, it is also possible to include only the specific files that you would like:

```
@import '@concisecss/core/settings.pcss';
@import '@concisecss/core/base.pcss';
```

Concise will automatically import the files from your `/node_modules` directory.

Once the packages are released and published on NPM they will be able to be installed by their name too: `concise.css` for the CLI and `@concisecss/<package>`  for the other packages, including `core`.

## Compiling

Run the Concise CLI on the main file from the `package.json` scripts:

```
concise compile main.pcss main.css
```

To execute the CLI manually after installing locally (without the `package.json` scripts):

```
npx concise compile main.pcss main.css
```

The flag `-w` will also watch the files for changes.

## Changelog

You can keep up-to-date with the changes that we have made via our [releases page](https://github.com/ConciseCSS/concise.css/releases).

## Elsewhere

[![Like Concise on Facebook](https://i.imgur.com/4dy5UUK.png)](https://facebook.com/ConciseCSS)
[![Follow Concise on Twitter](https://i.imgur.com/4AkKsMx.png)](https://twitter.com/ConciseCSS)

## License

Code released under the [MIT license](https://github.com/ConciseCSS/concise.css/blob/master/LICENSE). Documentation released under [Creative Commons](https://creativecommons.org/licenses/by-sa/4.0/).
