import { createReadStream, existsSync, statSync } from 'node:fs'
import { createServer } from 'node:http'
import { extname, join, normalize, resolve, sep } from 'node:path'

const [directory = 'storybook-static', port = '6007'] = process.argv.slice(2)
const root = resolve(directory)
const types = {
  '.css': 'text/css',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
}

if (!existsSync(join(root, 'index.json'))) {
  console.error(`No Storybook build in ${root}. Run \`pnpm build-storybook\` first.`)
  process.exit(1)
}

createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url ?? '/', 'http://localhost').pathname)
  const file = normalize(join(root, pathname === '/' ? 'index.html' : pathname))
  if (!file.startsWith(root + sep) || !existsSync(file) || !statSync(file).isFile()) {
    response.writeHead(404).end('Not found')
    return
  }
  response.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream' })
  createReadStream(file).pipe(response)
}).listen(Number(port), '127.0.0.1')
