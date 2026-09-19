import { describe, expect, it, vi } from 'vitest'
import { AxiosError, AxiosHeaders, CanceledError, type AxiosAdapter } from 'axios'
import { createHttpClient, HttpError } from './index.js'

function respond(status: number, data: unknown, headers: Record<string, string> = { 'content-type': 'application/json' }): AxiosAdapter {
  return async (config) => {
    const response = { status, data, headers: new AxiosHeaders(headers), statusText: '', config }
    if (status >= 400) throw new AxiosError('HTTP error', 'ERR_BAD_RESPONSE', config, undefined, response)
    return response
  }
}

describe('HTTP foundation', () => {
  it.each([204, 205])('supports empty %s responses', async (status) => {
    expect((await createHttpClient({ adapter: respond(status, '') }).get('/')).data).toBeUndefined()
  })
  it('parses JSON and preserves text', async () => {
    expect((await createHttpClient({ adapter: respond(200, '{"ok":true}') }).get('/')).data).toEqual({ ok: true })
    expect((await createHttpClient({ adapter: respond(200, 'hello', { 'content-type': 'text/plain' }) }).get('/')).data).toBe('hello')
  })
  it('rejects malformed success JSON', async () => {
    await expect(createHttpClient({ adapter: respond(200, '{') }).get('/')).rejects.toMatchObject({ kind: 'invalid_response', code: 'invalid_json', status: 200 })
  })
  it('preserves 401 envelope and request ID', async () => {
    await expect(createHttpClient({ adapter: respond(401, '{"code":"expired","field":"session","message":"Log in"}', { 'content-type': 'application/json', 'x-request-id': 'r' }) }).get('/')).rejects.toMatchObject({ kind: 'api', status: 401, code: 'expired', field: 'session', requestId: 'r', message: 'Log in' })
  })
  it('keeps HTTP errors for invalid JSON and HTML', async () => {
    await expect(createHttpClient({ adapter: respond(500, '{') }).get('/')).rejects.toMatchObject({ kind: 'api', status: 500, code: 'http_error' })
    await expect(createHttpClient({ adapter: respond(502, 'bad gateway', { 'content-type': 'text/html' }) }).get('/')).rejects.toMatchObject({ kind: 'api', message: 'bad gateway' })
  })
  it.each(['ECONNABORTED', 'ETIMEDOUT', 'ERR_NETWORK'])('normalizes %s', async (code) => {
    const client = createHttpClient({ adapter: async () => { throw new AxiosError('failed', code) } })
    await expect(client.get('/')).rejects.toMatchObject({ kind: code === 'ERR_NETWORK' ? 'network' : 'timeout' })
  })
  it('honors pre-aborted and in-flight signals', async () => {
    const controller = new AbortController()
    const adapter = vi.fn<AxiosAdapter>(async (config) => new Promise((_, reject) => {
      config.signal?.addEventListener?.('abort', () => reject(new CanceledError()))
      controller.abort()
    }))
    const client = createHttpClient({ adapter })
    await expect(client.get('/', { signal: controller.signal })).rejects.toMatchObject({ kind: 'aborted' })
    await expect(client.get('/', { signal: controller.signal })).rejects.toMatchObject({ kind: 'aborted' })
    expect(adapter).toHaveBeenCalledTimes(1)
  })
  it('adds credentials/request ID/CSRF while honoring explicit headers and timeout', async () => {
    const token = vi.fn(() => 'csrf')
    const client = createHttpClient({ csrfToken: token, requestId: () => 'r', timeoutMs: 123, adapter: respond(200, '{}') })
    const get = await client.get('/')
    expect(get.config).toMatchObject({ withCredentials: true, timeout: 123 })
    expect(get.config.headers.get('X-Request-Id')).toBe('r')
    expect(token).not.toHaveBeenCalled()
    const post = await client.post('/', {}, { timeout: 456, headers: { 'X-Request-Id': 'explicit' } })
    expect(post.config.timeout).toBe(456)
    expect(post.config.headers.get('X-CSRF-Token')).toBe('csrf')
    expect(post.config.headers.get('X-Request-Id')).toBe('explicit')
  })
  it('lets application recovery handle the original Axios error before normalization', async () => {
    let attempts = 0
    const client = createHttpClient({
      adapter: async (config) => respond(++attempts === 1 ? 401 : 200, '{"ok":true}')(config),
      configure(instance) {
        instance.interceptors.response.use(undefined, async (error: AxiosError) => {
          expect(error).toBeInstanceOf(AxiosError)
          expect(error).not.toBeInstanceOf(HttpError)
          return instance.request(error.config!)
        })
      },
    })
    expect((await client.get('/')).data).toEqual({ ok: true })
    expect(attempts).toBe(2)
  })
})
