export type HttpRequestMethods = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE' | 'PATCH'

export type HttpRequestOptions = {
  method: HttpRequestMethods
  headers: Record<string, string>
  body: FormData | string | null
}
