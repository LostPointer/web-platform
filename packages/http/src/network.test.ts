import { createServer } from 'node:http'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createHttpClient } from './index.js'

const server = createServer((request, response) => {
  if (request.url === '/disconnect') { request.socket.destroy(); return }
  if (request.url === '/slow') return
  if (request.url === '/body') {
    response.writeHead(200, { 'content-type': 'application/json' })
    response.write('{')
    return
  }
  if (request.url === '/invalid') {
    response.writeHead(200, { 'content-type': 'application/json' })
    response.end('{')
    return
  }
  response.writeHead(401, { 'content-type': 'text/html', 'x-request-id': 'upstream' })
  response.end('Unauthorized')
})
let baseURL: string
beforeAll(async () => {
  await new Promise<void>((resolve, reject) => {
    server.once('error', reject)
    server.listen(0, '127.0.0.1', resolve)
  })
  const address = server.address()
  if (!address || typeof address === 'string') throw new Error('Expected TCP listener')
  baseURL = `http://127.0.0.1:${address.port}`
})
afterAll(async () => {
  if (!server.listening) return
  server.closeAllConnections()
  await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve()))
})

describe('real network / Axios fetch adapter', () => {
  it.each(['/slow', '/body'])('times out while waiting for %s', async (path) => {
    const client = createHttpClient({ baseURL, adapter: 'fetch', timeoutMs: 50 })
    await expect(client.get(path)).rejects.toMatchObject({ kind: 'timeout', code: 'timeout' })
  })
  it('cancels a pending request', async () => {
    const controller = new AbortController()
    const request = createHttpClient({ baseURL, adapter: 'fetch' }).get('/slow', { signal: controller.signal })
    const assertion = expect(request).rejects.toMatchObject({ kind: 'aborted' })
    controller.abort()
    await assertion
  })
  it('normalizes a disconnected socket', async () => {
    await expect(createHttpClient({ baseURL, adapter: 'fetch' }).get('/disconnect')).rejects.toMatchObject({ kind: 'network' })
  })
  it('retains text 401 and response request ID', async () => {
    await expect(createHttpClient({ baseURL, adapter: 'fetch' }).get('/unauthorized')).rejects.toMatchObject({ kind: 'api', status: 401, message: 'Unauthorized', requestId: 'upstream' })
  })
  it('rejects a malformed JSON response', async () => {
    await expect(createHttpClient({ baseURL, adapter: 'fetch' }).get('/invalid')).rejects.toMatchObject({ kind: 'invalid_response' })
  })
})
