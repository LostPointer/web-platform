import axios, { AxiosHeaders, type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'

export type HttpErrorKind = 'api' | 'network' | 'timeout' | 'aborted' | 'invalid_response'

export class HttpError extends Error {
  constructor(
    public readonly kind: HttpErrorKind,
    public readonly status: number | undefined,
    public readonly code: string,
    message: string,
    public readonly field?: string,
    public readonly requestId?: string,
    options?: ErrorOptions,
  ) {
    super(message, options)
    this.name = 'HttpError'
  }
}

function decode(response: AxiosResponse): unknown {
  const data: unknown = response.data
  if (response.status === 204 || response.status === 205 || data === '') return undefined
  if (typeof data !== 'string' || !String(response.headers['content-type'] ?? '').toLowerCase().includes('json')) return data
  try { return JSON.parse(data) as unknown } catch (cause) {
    if (response.status < 200 || response.status >= 300) return undefined
    throw new HttpError('invalid_response', response.status, 'invalid_json', 'Invalid JSON response', undefined,
      response.headers['x-request-id'], { cause })
  }
}

/** Normalize only after application recovery (e.g. session refresh) has finished. */
export function normalizeHttpError(cause: unknown): HttpError {
  if (cause instanceof HttpError) return cause
  if (axios.isAxiosError(cause)) {
    const response = cause.response
    if (response) {
      const body: unknown = response.data
      const envelope = body !== null && typeof body === 'object' ? body as Record<string, unknown> : undefined
      const str = (key: string) => typeof envelope?.[key] === 'string' ? envelope[key] as string : undefined
      return new HttpError('api', response.status, str('code') ?? 'http_error',
        str('message') ?? str('error') ?? (typeof body === 'string' && body.trim() ? body.trim() : `HTTP ${response.status}`),
        str('field'), str('requestId') ?? response.headers['x-request-id'], { cause })
    }
    if (cause.code === 'ECONNABORTED' || cause.code === 'ETIMEDOUT') {
      return new HttpError('timeout', undefined, 'timeout', 'Request timed out', undefined, undefined, { cause })
    }
  }
  if (axios.isCancel(cause) || (cause instanceof Error && cause.name === 'AbortError')) {
    return new HttpError('aborted', undefined, 'aborted', 'Request aborted', undefined, undefined, { cause })
  }
  return new HttpError('network', undefined, 'network_error', 'Network request failed', undefined, undefined, { cause })
}

export interface HttpClientOptions {
  baseURL?: string
  timeoutMs?: number
  withCredentials?: boolean
  headers?: AxiosRequestConfig['headers']
  adapter?: AxiosRequestConfig['adapter']
  requestId?: () => string
  csrfToken?: () => string | undefined | null
  /** Register application interceptors here: recovery sees the original Axios error. */
  configure?: (client: AxiosInstance) => void
}

export function createHttpClient(options: HttpClientOptions = {}): AxiosInstance {
  const client = axios.create({
    baseURL: options.baseURL,
    timeout: options.timeoutMs ?? 15_000,
    withCredentials: options.withCredentials ?? true,
    headers: options.headers,
    adapter: options.adapter,
    // Parse explicitly to distinguish malformed JSON from legitimate text responses.
    transformResponse: [(data: unknown) => data],
  })
  client.interceptors.request.use((config) => {
    config.headers = AxiosHeaders.from(config.headers)
    if (!config.headers.has('X-Request-Id')) config.headers.set('X-Request-Id', (options.requestId ?? (() => crypto.randomUUID()))())
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes((config.method ?? 'get').toUpperCase()) && !config.headers.has('X-CSRF-Token')) {
      const token = options.csrfToken?.()
      if (token) config.headers.set('X-CSRF-Token', token)
    }
    return config
  })
  client.interceptors.response.use((response) => {
    response.data = decode(response)
    return response
  }, (error: unknown) => {
    if (axios.isAxiosError(error) && error.response) error.response.data = decode(error.response)
    return Promise.reject(error)
  })
  options.configure?.(client)
  client.interceptors.response.use(undefined, (error: unknown) => Promise.reject(normalizeHttpError(error)))
  return client
}
