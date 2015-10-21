# Contributing to Concise

Welcome to Concise! We are not only here to make it as simple as possible to build websites, but also to contribute to the project.

By following this guide to contributing, we can make sure that everything is up to code (pun intended), everything is formatted properly, and we are posting bug reports, feature requests, and questions in the proper area.

Sound good? **Let's move on...**

# Bug reports, feature requests, and questions

** *Thanks to [thoughtbot](http://robots.thoughtbot.com/moving-open-source-project-mailing-lists-to-stack-overflow) for this great way to handling questions for an open source project.*

In lieu of a mailing list, we are going to manage all specific questions through [Stack Overflow](http://stackoverflow.com/).

Members of the Concise team are subscribed to specific tags via [Stack Exchange Filters](http://stackexchange.com/filters) so that if a question is properly tagged, we can respond in a timely manner and help.

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

# Building the Project

Our project is build with NodeJS so if you wish to make changes to the source SASS files and build CSS, follow the instructions below:

1) Install [NodeJS](https://nodejs.org) on your machine.

2) Navigate to the project in the terminal:

```
cd /path/to/directory
```

3) Install the NPM modules:

```
npm install
```

4) You can now run the following commands:

**Build the project:**

```
npm run build
```

**Build the project and watch for changes:**

```
npm run build:watch
```

**Check the stylesheet statistics:**

```
npm run stats
```

# Feature Requests

Do you think that there should be something in Concise that isn't already included? Before you start writing code and implementing a feature, make sure that it is something that fits into the idea and scope of the project. We are a lightweight, bloat-free framework that focuses on removing the unnecessary.

If you are unsure of whether or not your feature would be a good fit for the framework, posting in [GitHub Issues](http://github.com/ConciseCSS/concise.css/issues) and tagging it `info:feedback-needed` or `type:idea` will help us filter your feature request and evaluate the idea.

# Contributing Code

Our contributing guidelines are based on this article: http://endoflineblog.com/gitflow-considered-harmful

1. [Fork us](https://github.com/ConciseCSS/concise.css/fork)
2. Create a new branch (feature, release, hotfix, etc) (`git checkout -b my-feature`)
3. Follow the [coding style guide](#coding-style-guide)
4. Test any and all changes you make or implement.
5. Commit changes (`git commit -am "Commit description here"`)
  - **Note:** If you're referencing a GitHub issue in your commit, please preface the commit with `[ref: #XXX]` where `XXX` is the issue number.
6. Push to your feature branch (`git push origin my-feature`)
7. Create a new [Pull Request](https://help.github.com/articles/creating-a-pull-request)
8. Wait for a response from us (we promise to be semi-prompt)
9. Once Your changes have been merged in, you can delete the branch that you've created. 

# Coding Style Guide

** *Thanks to [Bootstrap](https://github.com/twbs/bootstrap/blob/master/CONTRIBUTING.md) for providing a good outline for coding styles.*

Consistency is great, especially when writing code. Here we have a few simple guidelines to follow if you are going to be contributing to Concise.

## Editorconfig

Concise.CSS project has a `.editorconfig` file, you can install [Editorconfig](http://editorconfig.org/) plugin in your code editor and It will help You to keep your editor configured with our code style.

## HTML

[Follow @mdo's Code Guide](http://codeguide.co/#html)

## CSS

[Follow @mdo's Code Guide](http://codeguide.co/#css)

# License

By contributing to Concise, you agree that your code can be released under the [MIT license](https://github.com/ConciseCSS/concise.css/blob/master/LICENSE)
