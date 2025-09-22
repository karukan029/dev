// app/routes/about/index.ts
import { Hono } from 'hono'
import { readFileSync } from 'node:fs'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'

const app = new Hono()

app.get('/:path', async (c) => {
  const path = c.req.param('path')
  if (!path) {
    return c.json({ error: 'Path parameter is required' }, 400)
  }

  const file = await readFileSync(`contents/${path}.md`, { encoding: 'utf8' })
  const html = await unified().use(
    remarkParse
  ).use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(file)
  console.log(html)

  return c.json({
    'contents': html,
  })
})

export default app