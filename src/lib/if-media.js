/**
 * `?if media` queries inside rules, in two forms:
 *
 *   .a { margin: 0 ?if media (--small); }          inline, per declaration
 *   .a { ?if media (--small) { margin: 0; } }      block, for several declarations
 *
 * Both become `@media <query> { .a { … } }` placed right after the rule, so the
 * original order (and therefore specificity) is kept. Declarations that share a
 * query end up in the same @media block.
 *
 * Inside nested rules the @media block stays nested next to the rule, which
 * native CSS nesting resolves against the parent selectors.
 *
 * Port of postcss-if-media@1 (PostCSS 7) to the PostCSS 8 plugin API.
 */

// {1: value} ?if media {2: query}   (`? media` is accepted as a short form)
const INLINE = /^([\s\S]*?)\s+\?(?:if)?\s+media\s+([\s\S]+)$/
// ?if media {1: query}
const BLOCK = /^\?(?:if)?\s+media\s+([\s\S]+)$/
// Something that looks like an attempt at a query, used to warn about typos
const LOOKS_LIKE_QUERY = /\?\s*(?:if\b|media\b)/

const ifMedia = () => ({
  postcssPlugin: 'concise-if-media',
  Once (root, { result, postcss }) {
    root.walkRules(rule => {
      if (BLOCK.test(rule.selector)) {
        // A block reached directly means it has no parent rule to apply to
        if (rule.parent?.type !== 'rule') rule.warn(result, `\`${rule.selector}\` must be nested inside a rule`)
        return
      }

      unwrapBlocks(rule, result)

      const groups = collectInlineQueries(rule, result)
      let previous = rule

      for (const { query, nodes } of groups.values()) {
        const media = postcss.atRule({ name: 'media', params: query, source: rule.source })
        const copy = postcss.rule({ selector: rule.selector, source: rule.source })

        media.append(copy)
        copy.append(nodes.map(node => node.remove()))
        previous.after(media)
        previous = media
      }

      // A rule whose declarations all had queries is left empty: drop it
      if (groups.size > 0 && rule.nodes.length === 0) rule.remove()
    })
  }
})
ifMedia.postcss = true

export default ifMedia

// Turns `?if media q { a: b }` into inline `a: b ?if media q` in the parent rule
function unwrapBlocks (rule, result) {
  for (const node of [...rule.nodes]) {
    if (node.type !== 'rule') continue

    const match = node.selector.match(BLOCK)
    if (!match) {
      if (node.selector.trimStart().startsWith('?')) node.warn(result, `Malformed \`?if media\` query: ${node.selector}`)
      continue
    }

    let previous = node
    for (const child of [...node.nodes]) {
      if (child.type === 'decl') child.value += ` ?if media ${match[1]}`
      else if (child.type === 'comment') child.text += ` ?if media ${match[1]}`
      else throw child.error('Only declarations and comments are allowed inside an `?if media` block')

      previous.after(child)
      previous = child
    }
    node.remove()
  }
}

// Strips the inline queries and groups the nodes by (whitespace-insensitive) query
function collectInlineQueries (rule, result) {
  const groups = new Map()

  for (const node of rule.nodes) {
    if (node.type !== 'decl' && node.type !== 'comment') continue

    const field = node.type === 'decl' ? 'value' : 'text'
    const match = node[field].match(INLINE)

    if (!match) {
      if (LOOKS_LIKE_QUERY.test(node[field])) node.warn(result, `Malformed \`?if media\` query: ${node}`)
      continue
    }

    node[field] = match[1]
    const key = match[2].replace(/\s+/g, '')
    if (!groups.has(key)) groups.set(key, { query: match[2].trim(), nodes: [] })
    groups.get(key).nodes.push(node)
  }

  return groups
}
