# [<img src="http://i.imgur.com/ihzCgEr.png">](http://concisecss.com/)

[![Bower version](https://badge.fury.io/bo/concise.svg)](http://badge.fury.io/bo/concise) [![npm version](https://badge.fury.io/js/concise.css.svg)](https://badge.fury.io/js/concise.css)

Concise CSS is a lightweight CSS framework that provides a number of great features without the bloat.

Concise CSS provides a solid foundation to stylize your website. It offers an alternative to frameworks like Bootstrap and Foundation, with the difference that Concise only includes the minimum styles required. That does not mean that the features are limited; is possible to use add-ons on top of the core to extend the functionality as required.

The core of the framework only includes styles for native HTML elements. Components and utilities are provided as optional add-ons, Concise UI and Concise Utils, respectively.

Concise CSS is written using a custom CSS preprocessor, built on top of Sass and some PostCSS plugins; this means that you can still write Sass code as usual, but you can also enjoy of other custom features, like the `lh` unit provided to handle vertical rhythm.

**Browser Compatibility:** Since the core of of Concise CSS only includes general normalization styles, it should work with no problems on IE>9. Add-ons like Concise UI use Flexbox, so they will only work on modern browsers (including IE>11|Edge). If you find a problem with certain browser let us know and we will try to fix it. 

## Installation

There are 3 different options to install Concise CSS in your website, although the recommended way is to use NPM.

### Using our CDN

If you just want to try Concise CSS or of you do not have plans to customize the styles, you can use our CDN, this is the easier way to get started with the framework—and if you like it—is recommended to switch to NPM so that you can customize the styles.


```HTML
<!-- Normal - Latest version -->
<link rel="stylesheet" href="https://cdn.concisecss.com/concise.css">

<!-- Minified - Latest version -->
<link rel="stylesheet" href="https://cdn.concisecss.com/concise.min.css">
```

That is for the latest version, if you want to use a specific one you can do something like the following:

```HTML
<!-- Normal - Specific version -->
<link rel="stylesheet" href="https://cdn.concisecss.com/v4.1/concise.css">

<!-- Minified - Specific version -->
<link rel="stylesheet" href="https://cdn.concisecss.com/v4.1/concise.min.css">
```

### Install with NPM

Execute the following command to install Concise CSS from NPM. If you are new to NPM, you can check their [documentation](https://docs.npmjs.com/).

```
npm install concise.css
```

Then you can include the main file inside your project:

```scss
//
// myStyles.scss
// ---------

// Concise Core
@import "node_modules/concise.css/concise";
```

### Copy the source files

Finally, if you prefer, you can just copy the framework files to your project folder.
You can download the latest version from Github from [this link](https://github.com/ConciseCSS/concise.css/archive/master.zip), and place the files wherever you need them.

## Building the source files

To build the source files, you need to install the Concise CLI globally (locally if you compile the files with an NPM script):

```
npm install -g concise-cli
```

Once it is installed, you can compile source files with the `concisecss compile` command:

```
concisecss compile input.scss output.css
```

**Note**: When compiling the source code with the Concise CLI, Autoprefixer will automatically add the required browser prefixes for the last two browser versions.

### Changelog

You can keep up-to-date with the changes that we have made via our [releases page](https://github.com/ConciseCSS/concise.css/releases).

### Specific Questions

** *Thanks to [thoughtbot](http://robots.thoughtbot.com/moving-open-source-project-mailing-lists-to-stack-overflow) for this great way to handling questions for an open source project.*

In lieu of a mailing list, we are going to manage all specific questions through [Stack Overflow](http://stackoverflow.com/).

Members of the Concise team are subscribed to specific tags via [Stack Exchange Filters](http://stackexchange.com/filters), so that if a question is properly tagged, we can respond in a timely manner and help.

**Which tags?**

Ideally, we would like to keep it to just one tag for Concise questions, but we are subscribed to multiple variants to make sure nothing passes by us. However, for everybody asking a question, please use:

- [Concise](http://stackoverflow.com/questions/tagged/concise)

**Where do I post this?**

There are lots of different things that people will want to post regarding the Concise framework. Here is a rough outline of where you should post any given issue, question or contribution:

- Use [Stack Overflow](http://stackoverflow.com) if you **need help**
- Use [GitHub Issues](http://github.com/ConciseCSS/concise.css/issues) if you **found a bug**
- Use [GitHub Issues](http://github.com/ConciseCSS/concise.css/issues) if you **have an idea**
- Use [GitHub Issues](http://github.com/ConciseCSS/concise.css/issues) if you want to **ask a question**
- Submit a [pull request](https://help.github.com/articles/creating-a-pull-request) if you **want to contribute**

## Contributing

If you wish to contribute to the Concise CSS project, please read through our [contributing guidelines](https://github.com/ConciseCSS/concise.css/blob/master/CONTRIBUTING.md) first and then help however you’d like!

## Versioning

Concise is currently maintained under the [Semantic Versioning guidelines](http://semver.org/).

## Elsewhere

[![Like Concise on Facebook](http://i.imgur.com/4dy5UUK.png)](https://facebook.com/ConciseCSS)
[![Follow Concise on Twitter](http://i.imgur.com/4AkKsMx.png)](https://twitter.com/ConciseCSS)

## License

Code released under the [MIT license](https://github.com/ConciseCSS/concise.css/blob/master/LICENSE). Documentation released under [Creative Commons](http://creativecommons.org/licenses/by-sa/4.0/).
