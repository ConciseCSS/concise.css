/**
 * Removes `//` inline comments. They are only recognised when the stylesheet
 * is parsed with postcss-scss (the CLI does this; see README for plugin use).
 * Regular block comments are kept.
 */

const stripComments = () => ({
  postcssPlugin: 'concise-strip-comments',
  Once (root) {
    root.walkComments(comment => {
      if (comment.raws.inline) comment.remove()
    })
  }
})
stripComments.postcss = true

export default stripComments
