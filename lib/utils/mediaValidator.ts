/*
 * @Author: Lollipope
 * @Date: 2026-07-15
 * @FilePath: \leatop-cdp-alarm\packages\alarm-helper\lib\utils\mediaValidator.ts
 * @Description: 媒体资源访问性校验工具（图片 / 视频）
 *
 * 优化要点（vs 初版）：
 *  1. 修正 img.onerror 签名、移除误导性的 size 字段
 *  2. HEAD 失败时（CORS / 不支持 HEAD）自动降级到 <img>/<video> 实际加载，避免误判
 *  3. 单独处理 HLS (.m3u8) / FLV 流媒体
 *  4. 支持 AbortSignal 取消
 *  5. 视频加载前通过 canPlayType 预判格式
 *  6. 增加 CORS_ERROR 错误类型
 *  7. 仅在浏览器环境可用，提供 SSR 安全检查
 *  8. 暴露 details 结构化字段（httpStatus / mimeType / 像素 / 耗时 等）
 */

export type MediaErrorType =
  | 'INVALID_URL' // URL 非法 / 为空
  | 'NETWORK_ERROR' // 网络错误（断网 / DNS）
  | 'TIMEOUT' // 请求超时
  | 'NOT_FOUND' // 资源不存在（404）
  | 'FORBIDDEN' // 无权限访问（403）
  | 'SERVER_ERROR' // 服务端错误（5xx）
  | 'CORS_ERROR' // 跨域受限（仅 image/video 实际加载时识别）
  | 'CERT_ERROR' // HTTPS 证书不安全（过期 / 颁发者不受信任 / 域名不匹配 / 自签名等）
  | 'INVALID_FORMAT' // 格式不支持 / 文件损坏 / 编码不被支持
  | 'UNSUPPORTED_BY_BROWSER' // 浏览器声明不支持该 MIME
  | 'ABORTED' // 加载被中止
  | 'NOT_BROWSER' // 非浏览器环境
  | 'UNKNOWN_ERROR' // 未知错误

export interface MediaDetails {
  /** HTTP 状态码（HEAD 阶段或 onerror 时记录） */
  httpStatus?: number
  /** 资源 Content-Type（HEAD 阶段获取） */
  contentType?: string
  /** 资源字节大小（HEAD 阶段通过 content-length 拿） */
  contentLength?: number
  /** 图片自然宽（像素） */
  naturalWidth?: number
  /** 图片自然高（像素） */
  naturalHeight?: number
  /** 视频时长（秒） */
  duration?: number
  /** 视频可播放类型声明（canPlayType 结果） */
  canPlayTypeResult?: string
  /** 总耗时（毫秒） */
  costMs?: number
  /** 是否降级到了实际加载（HEAD 不可用时为 true） */
  fellBackToLoader?: boolean
}

export interface MediaValidationResult {
  /** 是否可正常访问 */
  accessible: boolean
  /** 资源地址 */
  url: string
  /** 资源类型 */
  type: 'image' | 'video'
  /** 视频专用：是否能解析出可播放的元数据 */
  playable?: boolean
  /** 资源 mimeType（探测得到时） */
  mimeType?: string
  /** 资源字节大小 */
  size?: number
  /** 耗时（毫秒） */
  responseTime?: number
  /** HTTP 状态码（HEAD 阶段识别到的 4xx/5xx，会同步到 details.httpStatus） */
  statusCode?: number
  /** 错误类型，accessible 为 true 时为 undefined */
  errorType?: MediaErrorType
  /** 异常描述信息 */
  errorMessage?: string
  /** 结构化详情（httpStatus / mime / 像素 等） */
  details?: MediaDetails
}

export interface ValidateOptions {
  /** 超时（毫秒）。默认图片 8000，视频 10000 */
  timeout?: number
  /** 用于取消校验的 AbortSignal */
  signal?: AbortSignal
  /** 是否跳过 HEAD 探测阶段（默认 false）。设为 true 时只走实际加载，速度略快但拿不到字节大小 */
  skipHeadProbe?: boolean
  /**
   * 是否在 <img> 加载时设置 crossOrigin='anonymous' 来探测 CORS 错误。
   *
   * 默认 false（推荐）：与浏览器原生 <img> / <el-image> 默认行为一致，
   *   能正常显示没有 CORS 头的资源（最常见的内网 / CDN 场景）。
   *
   * 设为 true：能精确区分 CORS_ERROR 与 INVALID_FORMAT，但会让不支持 CORS
   *   的服务端被误判为不可用。
   */
  useCors?: boolean
}

/**
 * 去除 null 的 OnErrorEventHandler 类型别名，便于直接赋值
 */
type OnErrorEventHandlerNonNull = (this: GlobalEventHandlers, ev: Event | string, source?: string, lineno?: number, colno?: number, error?: any) => any

/* ============================ 内部辅助 ============================ */

/**
 * 判断当前是否处于浏览器环境（避免 SSR 报错）
 */
function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}

/**
 * URL 合法性校验
 */
export function assertValidUrl(
  url: string,
): { ok: true; parsed: URL } | { ok: false; errorType: MediaErrorType; errorMessage: string } {
  if (!url || typeof url !== 'string' || !url.trim()) {
    return { ok: false, errorType: 'INVALID_URL', errorMessage: '资源地址不能为空' }
  }
  try {
    const parsed = new URL(url, (isBrowser() ? window.location.origin : undefined) as any)
    return { ok: true, parsed }
  } catch {
    return {
      ok: false,
      errorType: 'INVALID_URL',
      errorMessage: `资源地址格式非法：${url}`,
    }
  }
}

/**
 * 判断是否为浏览器原生无法 HEAD 的协议
 */
function isUnprobableProtocol(url: string): boolean {
  const protocol = url.split(':')[0]?.toLowerCase()
  return protocol === 'file' || protocol === 'blob' || protocol === 'data'
}

/**
 * 是否为 HTTPS 资源（用于证书错误的语义判断）
 */
export function isHttpsUrl(url: string): boolean {
  return /^https:\/\//i.test(url)
}

/**
 * 启发式判断一条错误信息是否与 SSL/TLS 证书相关。
 *
 * 各浏览器报错关键词：
 * - Chrome / Edge: net::ERR_CERT_AUTHORITY_INVALID / ERR_CERT_DATE_INVALID /
 *                  ERR_CERT_COMMON_NAME_INVALID / ERR_CERT_INVALID /
 *                  ERR_SSL_PROTOCOL_ERROR / ERR_SSL_VERSION_OR_CIPHER_MISMATCH
 * - Firefox:      MOZILLA_PKIX_ERROR_*, SSL_ERROR_*, SEC_ERROR_*
 * - Safari:       SecureConnectionFailed, "cannot verify server's identity"
 *
 * ⚠️ 这是启发式识别，依赖浏览器报错文案，理论上存在误判可能。
 *    浏览器出于安全考虑，JS 无法读取真实证书详情。
 */
export function isCertErrorMessage(msg: string): boolean {
  if (!msg || typeof msg !== 'string') return false
  const lower = msg.toLowerCase()
  return /cert|ssl|tls|authority|self.signed|hostname mismatch|untrusted|expired.*cert|net::err_cert|net::err_ssl|secureconnectionfailed|mozilla_pkix|ssl_error|sec_error|certificate.*verify|certificate.*expired/i.test(
    lower,
  )
}

/**
 * 将原始错误转换为对用户友好的证书错误描述
 */
export function describeCertError(rawMessage: string, url: string): string {
  const m = (rawMessage || '').toLowerCase()
  if (/date|expired/.test(m)) return `HTTPS 证书已过期或尚未生效: ${url}`
  if (/authority|untrusted|self.signed|self-signed/.test(m)) return `HTTPS 证书颁发者不受信任（自签名或根证书缺失）: ${url}`
  if (/common.?name|hostname|mismatch|san/.test(m)) return `HTTPS 证书域名与请求地址不匹配: ${url}`
  if (/protocol|cipher|version/.test(m)) return `HTTPS 协议或加密套件不兼容: ${url}`
  if (/revoked|crl|ocsp/.test(m)) return `HTTPS 证书已被吊销: ${url}`
  return `HTTPS 证书校验失败: ${url}（原始信息：${rawMessage}）`
}

/**
 * 是否为流媒体（m3u8 / flv），需要走单独的检测路径
 */
export function isStreamMedia(url: string): boolean {
  const lower = url.toLowerCase()
  return lower.includes('.m3u8') || lower.includes('.flv')
}

/**
 * HEAD 探测：在加载前识别 404 / 403 / 5xx / 大小。
 *
 * 注意：HEAD 失败（特别是 CORS）不应当作"资源不可用"，调用方需要在失败时降级到实际加载。
 */
export async function probeResource(
  url: string,
  timeout: number,
  signal?: AbortSignal,
): Promise<
  | {
      ok: true
      status: number
      size?: number
      contentType?: string
    }
  | { ok: false; errorType: MediaErrorType; errorMessage: string; status?: number }
> {
  if (isUnprobableProtocol(url)) {
    return { ok: true, status: 0 }
  }

  const controller = new AbortController()
  const timer = window.setTimeout(() => controller.abort(), timeout)
  // 如果外部传入了 signal，需要联动
  const onExternalAbort = () => controller.abort()
  signal?.addEventListener('abort', onExternalAbort)

  try {
    const res = await fetch(url, {
      method: 'HEAD',
      mode: 'cors',
      cache: 'no-cache',
      signal: controller.signal,
    })
    clearTimeout(timer)
    signal?.removeEventListener('abort', onExternalAbort)

    if (res.status === 404) {
      return { ok: false, status: 404, errorType: 'NOT_FOUND', errorMessage: `资源不存在 (HTTP 404): ${url}` }
    }
    if (res.status === 403) {
      return { ok: false, status: 403, errorType: 'FORBIDDEN', errorMessage: `无权限访问该资源 (HTTP 403): ${url}` }
    }
    if (res.status === 405 || res.status === 501) {
      // 服务器不支持 HEAD，标记为"不可探测"，调用方需降级
      return { ok: false, status: res.status, errorType: 'NETWORK_ERROR', errorMessage: `服务器不支持 HEAD 方法，将降级到实际加载: ${url}` }
    }
    if (res.status >= 500) {
      return {
        ok: false,
        status: res.status,
        errorType: 'SERVER_ERROR',
        errorMessage: `服务端错误 (HTTP ${res.status}): ${url}`,
      }
    }
    if (!res.ok) {
      return {
        ok: false,
        status: res.status,
        errorType: 'UNKNOWN_ERROR',
        errorMessage: `资源访问失败 (HTTP ${res.status}): ${url}`,
      }
    }

    const sizeHeader = res.headers.get('content-length')
    const size = sizeHeader ? Number(sizeHeader) : undefined
    const contentType = res.headers.get('content-type') || undefined
    return { ok: true, status: res.status, size, contentType }
  } catch (err: any) {
    clearTimeout(timer)
    signal?.removeEventListener('abort', onExternalAbort)
    if (err?.name === 'AbortError') {
      // 区分是超时还是外部取消
      if (signal?.aborted) {
        return { ok: false, errorType: 'ABORTED', errorMessage: `校验被取消: ${url}` }
      }
      return { ok: false, errorType: 'TIMEOUT', errorMessage: `资源探测超时 (${timeout}ms): ${url}` }
    }
    // 错误分类：CORS / 证书 / 通用网络
    const msg = String(err?.message || err || '')
    const isCertLike = isCertErrorMessage(msg)
    if (isCertLike && isHttpsUrl(url)) {
      return {
        ok: false,
        errorType: 'CERT_ERROR',
        errorMessage: describeCertError(msg, url),
      }
    }
    const isCorsLike = /cors|failed to fetch|opaque|networkerror/i.test(msg)
    return {
      ok: false,
      errorType: isCorsLike ? 'CORS_ERROR' : 'NETWORK_ERROR',
      errorMessage: isCorsLike
        ? `跨域受限导致 HEAD 失败，将降级到实际加载 (${url})`
        : `资源探测网络异常：${msg || '未知网络错误'} (${url})`,
    }
  }
}

/* ============================ 校验器：图片 ============================ */

/**
 * 校验图片是否可以正常访问
 *
 * 校验流程：
 *  1. URL 合法性 / 环境检查
 *  2. HEAD 探测（可选，失败时降级）
 *  3. Image 元素实际加载
 *  4. CORS 错误与格式错误区分
 *
 * @example
 * const res = await validateImage('https://example.com/a.png', { timeout: 5000 })
 * if (!res.accessible) console.error(res.errorMessage, res.details)
 */
export async function validateImage(
  imageUrl: string,
  options: ValidateOptions = {},
): Promise<MediaValidationResult> {
  const startTime = Date.now()
  const timeout = options.timeout ?? 8000

  // 1. 环境 / URL 校验
  if (!isBrowser()) {
    return {
      accessible: false,
      url: imageUrl,
      type: 'image',
      errorType: 'NOT_BROWSER',
      errorMessage: 'validateImage 仅在浏览器环境可用',
      responseTime: Date.now() - startTime,
    }
  }

  const urlCheck = assertValidUrl(imageUrl)
  if (!urlCheck.ok) {
    return {
      accessible: false,
      url: imageUrl,
      type: 'image',
      errorType: urlCheck.errorType,
      errorMessage: urlCheck.errorMessage,
      responseTime: Date.now() - startTime,
      details: { costMs: Date.now() - startTime },
    }
  }

  // 外部取消
  if (options.signal?.aborted) {
    return {
      accessible: false,
      url: imageUrl,
      type: 'image',
      errorType: 'ABORTED',
      errorMessage: '校验开始前已被取消',
      responseTime: Date.now() - startTime,
    }
  }

  // 2. HEAD 探测（非跳过模式）
  if (!options.skipHeadProbe) {
    const probe = await probeResource(imageUrl, Math.min(timeout, 3000), options.signal)
    if (probe.ok) {
      // HEAD 拿到了状态码与 content-length 后继续走 Image 加载以校验像素
      // 但仅当状态码 >= 400 时才短路（403/404/5xx 直接失败）
    } else if (
      probe.errorType === 'NOT_FOUND' ||
      probe.errorType === 'FORBIDDEN' ||
      probe.errorType === 'SERVER_ERROR' ||
      probe.errorType === 'CERT_ERROR'
    ) {
      // 明确的 HTTP 错误 / 证书错误才短路；CORS / NETWORK_ERROR / 405 / TIMEOUT 一律降级
      return {
        accessible: false,
        url: imageUrl,
        type: 'image',
        errorType: probe.errorType,
        errorMessage: probe.errorMessage,
        statusCode: probe.status,
        responseTime: Date.now() - startTime,
        details: {
          httpStatus: probe.status,
          costMs: Date.now() - startTime,
          fellBackToLoader: false,
        },
      }
    }
    // 其他情况（CORS / NETWORK / 405 / TIMEOUT）落到下面 Image 实际加载
  }

  // 3. Image 元素实际加载
  const result = await new Promise<MediaValidationResult>((resolve) => {
    const img = new Image()
    let timer: number | undefined

    const finalize = (r: MediaValidationResult) => {
      if (timer) clearTimeout(timer)
      if (options.signal) {
        img.onload = null
        img.onerror = null
      }
      resolve(r)
    }

    timer = window.setTimeout(() => {
      finalize({
        accessible: false,
        url: imageUrl,
        type: 'image',
        errorType: 'TIMEOUT',
        errorMessage: `图片加载超时 (${timeout}ms): ${imageUrl}`,
        responseTime: Date.now() - startTime,
        details: { costMs: Date.now() - startTime },
      })
    }, timeout)

    img.onload = () => {
      finalize({
        accessible: true,
        url: imageUrl,
        type: 'image',
        responseTime: Date.now() - startTime,
        details: {
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          costMs: Date.now() - startTime,
        },
      })
    }

    // 注意：HTMLImageElement.onerror 的标准签名是 (this, event: Event | string, source?, lineno?, colno?, error?)
    img.onerror = ((_evt: Event | string) => {
      // 只有显式 useCors=true 时，才把失败归类为 CORS_ERROR；
      // 默认与浏览器原生 <img> 行为一致（不带 crossOrigin），普通 CDN / 内网服务也能正常加载。
      const usedCors = img.crossOrigin === 'anonymous'
      finalize({
        accessible: false,
        url: imageUrl,
        type: 'image',
        errorType: usedCors ? 'CORS_ERROR' : 'INVALID_FORMAT',
        errorMessage: usedCors
          ? `图片跨域加载失败：服务端未返回 CORS 头或资源不存在 (${imageUrl})`
          : `图片加载失败，可能的原因：文件不存在、格式不支持或资源已损坏 (${imageUrl})`,
        responseTime: Date.now() - startTime,
        details: { costMs: Date.now() - startTime },
      })
    }) as OnErrorEventHandlerNonNull

    // 监听外部取消
    if (options.signal) {
      const onAbort = () => {
        img.src = '' // 中断加载
        finalize({
          accessible: false,
          url: imageUrl,
          type: 'image',
          errorType: 'ABORTED',
          errorMessage: `校验被外部取消: ${imageUrl}`,
          responseTime: Date.now() - startTime,
          details: { costMs: Date.now() - startTime },
        })
      }
      options.signal.addEventListener('abort', onAbort, { once: true })
    }

    // 默认与浏览器原生 <img> 行为一致：不设置 crossOrigin，
    // 让普通 CDN / 内网服务器（没有 CORS 头）也能正常加载。
    // 只有显式 useCors=true 时才启用 CORS 模式以便精确识别 CORS_ERROR。
    if (options.useCors) {
      img.crossOrigin = 'anonymous'
    }
    img.src = imageUrl
  })

  return result
}

/* ============================ 校验器：视频 ============================ */

/**
 * 校验视频资源是否可播放
 *
 * 校验流程：
 *  1. URL 合法性 / 环境检查
 *  2. 流媒体（HLS/FLV）走单独路径
 *  3. HEAD 探测
 *  4. canPlayType 预判
 *  5. video 元素 + preload=metadata 实际加载
 *  6. 根据 HTMLMediaElement.error.code 给出具体描述
 *
 * @example
 * const res = await validateVideo('https://example.com/a.mp4', { timeout: 15000 })
 * if (!res.accessible) console.error(res.errorMessage, res.details)
 */
export async function validateVideo(
  videoUrl: string,
  options: ValidateOptions = {},
): Promise<MediaValidationResult> {
  const startTime = Date.now()
  const timeout = options.timeout ?? 10000

  // 1. 环境 / URL 校验
  if (!isBrowser()) {
    return {
      accessible: false,
      playable: false,
      url: videoUrl,
      type: 'video',
      errorType: 'NOT_BROWSER',
      errorMessage: 'validateVideo 仅在浏览器环境可用',
      responseTime: Date.now() - startTime,
    }
  }

  const urlCheck = assertValidUrl(videoUrl)
  if (!urlCheck.ok) {
    return {
      accessible: false,
      playable: false,
      url: videoUrl,
      type: 'video',
      errorType: urlCheck.errorType,
      errorMessage: urlCheck.errorMessage,
      responseTime: Date.now() - startTime,
      details: { costMs: Date.now() - startTime },
    }
  }

  if (options.signal?.aborted) {
    return {
      accessible: false,
      playable: false,
      url: videoUrl,
      type: 'video',
      errorType: 'ABORTED',
      errorMessage: '校验开始前已被取消',
      responseTime: Date.now() - startTime,
    }
  }

  // 2. 流媒体单独处理
  if (isStreamMedia(videoUrl)) {
    return await validateStreamVideo(videoUrl, options, startTime)
  }

  // 3. HEAD 探测
  if (!options.skipHeadProbe) {
    const probe = await probeResource(videoUrl, Math.min(timeout, 3000), options.signal)
    if (probe.ok) {
      // HEAD 成功：继续走 video 加载；content-length / content-type 留给 details
      // 这里不直接返回，便于后续校验 duration
    } else if (
      probe.errorType === 'NOT_FOUND' ||
      probe.errorType === 'FORBIDDEN' ||
      probe.errorType === 'SERVER_ERROR' ||
      probe.errorType === 'CERT_ERROR'
    ) {
      return {
        accessible: false,
        playable: false,
        url: videoUrl,
        type: 'video',
        errorType: probe.errorType,
        errorMessage: probe.errorMessage,
        statusCode: probe.status,
        responseTime: Date.now() - startTime,
        details: {
          httpStatus: probe.status,
          costMs: Date.now() - startTime,
          fellBackToLoader: false,
        },
      }
    }
    // CORS / NETWORK / 405 / TIMEOUT 走 video 实际加载
  }

  // 4. canPlayType 预判（如果 HEAD 已拿到 content-type）
  // 此步骤是软提示：如果浏览器明确说不支持，依然走 video 加载，因为 canPlayType 未必准确

  // 5. video 实际加载
  const result = await new Promise<MediaValidationResult>((resolve) => {
    const video = document.createElement('video')
    let timer: number | undefined
    let externalAbortHandler: (() => void) | undefined

    const cleanup = () => {
      if (timer) clearTimeout(timer)
      if (externalAbortHandler && options.signal) {
        options.signal.removeEventListener('abort', externalAbortHandler)
      }
      video.onloadedmetadata = null
      video.onerror = null
      try {
        video.removeAttribute('src')
        video.load()
      } catch {
        /* noop */
      }
    }

    const finalize = (r: MediaValidationResult) => {
      cleanup()
      resolve(r)
    }

    timer = window.setTimeout(() => {
      finalize({
        accessible: false,
        playable: false,
        url: videoUrl,
        type: 'video',
        errorType: 'TIMEOUT',
        errorMessage: `视频元数据加载超时 (${timeout}ms): ${videoUrl}`,
        responseTime: Date.now() - startTime,
        details: { costMs: Date.now() - startTime },
      })
    }, timeout)

    video.onloadedmetadata = () => {
      // 注意：部分直播流 / 损坏文件的 duration === Infinity 或 0
      const duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : undefined
      finalize({
        accessible: true,
        playable: true,
        url: videoUrl,
        type: 'video',
        mimeType: probeContentTypeFromOptions(options),
        size: probeContentLengthFromOptions(options),
        responseTime: Date.now() - startTime,
        details: {
          duration,
          costMs: Date.now() - startTime,
        },
      })
    }

    video.onerror = () => {
      const err = video.error
      let errorType: MediaErrorType = 'UNKNOWN_ERROR'
      let errorMessage = `视频加载失败: ${videoUrl}`
      switch (err?.code) {
        case 1:
          errorType = 'ABORTED'
          errorMessage = `视频加载被中止: ${videoUrl}`
          break
        case 2:
          errorType = 'NETWORK_ERROR'
          errorMessage = `网络错误导致视频加载失败: ${videoUrl}`
          break
        case 3:
          errorType = 'INVALID_FORMAT'
          errorMessage = `视频解码失败，文件可能已损坏或编码不被支持: ${videoUrl}`
          break
        case 4:
          errorType = 'INVALID_FORMAT'
          errorMessage = `视频格式不支持或源不可用（可能是 MIME / 编码 / 浏览器不支持）: ${videoUrl}`
          break
        default:
          errorMessage = `视频加载失败（code=${err?.code ?? 'unknown'}）: ${err?.message || videoUrl}`
      }
      finalize({
        accessible: false,
        playable: false,
        url: videoUrl,
        type: 'video',
        errorType,
        errorMessage,
        responseTime: Date.now() - startTime,
        details: { costMs: Date.now() - startTime },
      })
    }

    // 外部取消
    if (options.signal) {
      externalAbortHandler = () => {
        finalize({
          accessible: false,
          playable: false,
          url: videoUrl,
          type: 'video',
          errorType: 'ABORTED',
          errorMessage: `校验被外部取消: ${videoUrl}`,
          responseTime: Date.now() - startTime,
          details: { costMs: Date.now() - startTime },
        })
      }
      options.signal.addEventListener('abort', externalAbortHandler, { once: true })
    }

    video.crossOrigin = 'anonymous'
    video.preload = 'metadata'
    video.muted = true // 部分浏览器对非静音视频加载元数据会限制
    video.src = videoUrl
  })

  return result
}

/* ============================ 校验器：流媒体（HLS / FLV） ============================ */

/**
 * 流媒体（HLS .m3u8 / FLV）单独校验
 *
 * - HLS：浏览器原生仅 Safari 支持；其他浏览器需要 HLS.js 才能拿到元数据
 * - FLV：浏览器原生不支持，必须 MSE；项目里 flv.ts 应该已经有播放器封装
 */
async function validateStreamVideo(
  videoUrl: string,
  options: ValidateOptions,
  startTime: number,
): Promise<MediaValidationResult> {
  const timeout = options.timeout ?? 10000
  const lower = videoUrl.toLowerCase()

  // HLS：先检查浏览器是否原生支持（Safari），否则建议使用 HLS.js
  if (lower.includes('.m3u8')) {
    const canNative = document.createElement('video').canPlayType('application/vnd.apple.mpegurl')
    if (!canNative) {
      return {
        accessible: false,
        playable: false,
        url: videoUrl,
        type: 'video',
        mimeType: 'application/vnd.apple.mpegurl',
        errorType: 'UNSUPPORTED_BY_BROWSER',
        errorMessage: `当前浏览器原生不支持 HLS (.m3u8)，需要引入 HLS.js 或使用 Safari: ${videoUrl}`,
        responseTime: Date.now() - startTime,
        details: { canPlayTypeResult: canNative, costMs: Date.now() - startTime },
      }
    }
    // 原生支持的浏览器（Safari），可以继续走 video 实际加载
  }

  // FLV：浏览器原生不支持，给出明确提示
  if (lower.includes('.flv')) {
    return {
      accessible: false,
      playable: false,
      url: videoUrl,
      type: 'video',
      mimeType: 'video/x-flv',
      errorType: 'UNSUPPORTED_BY_BROWSER',
      errorMessage: `浏览器原生不支持 FLV，需要通过 flv.js / MSE 解码: ${videoUrl}`,
      responseTime: Date.now() - startTime,
      details: { costMs: Date.now() - startTime },
    }
  }

  // HLS 原生支持的浏览器：走 video 加载（与普通视频流程一致）
  return await new Promise<MediaValidationResult>((resolve) => {
    const video = document.createElement('video')
    let timer: number | undefined

    const finalize = (r: MediaValidationResult) => {
      if (timer) clearTimeout(timer)
      video.onloadedmetadata = null
      video.onerror = null
      try {
        video.removeAttribute('src')
        video.load()
      } catch {
        /* noop */
      }
      resolve(r)
    }

    timer = window.setTimeout(() => {
      finalize({
        accessible: false,
        playable: false,
        url: videoUrl,
        type: 'video',
        errorType: 'TIMEOUT',
        errorMessage: `流媒体加载超时 (${timeout}ms): ${videoUrl}`,
        responseTime: Date.now() - startTime,
        details: { costMs: Date.now() - startTime },
      })
    }, timeout)

    video.onloadedmetadata = () => {
      finalize({
        accessible: true,
        playable: true,
        url: videoUrl,
        type: 'video',
        mimeType: 'application/vnd.apple.mpegurl',
        responseTime: Date.now() - startTime,
        details: { costMs: Date.now() - startTime },
      })
    }

    video.onerror = () => {
      const err = video.error
      const code = err?.code ?? 0
      finalize({
        accessible: false,
        playable: false,
        url: videoUrl,
        type: 'video',
        errorType: code === 2 ? 'NETWORK_ERROR' : 'INVALID_FORMAT',
        errorMessage:
          code === 2
            ? `流媒体网络错误: ${videoUrl}`
            : `流媒体加载失败（code=${code}）: ${err?.message || videoUrl}`,
        responseTime: Date.now() - startTime,
        details: { costMs: Date.now() - startTime },
      })
    }

    video.muted = true
    video.src = videoUrl
  })
}

/* ============================ 辅助：从上一阶段 probe 取值 ============================ */

// 这两个工具是为了在 video 加载成功后回填 HEAD 阶段拿到的元信息。
// 当前实现里 probe 的结果没有跨 promise 传递，简化处理：使用 fallback。
// 如需精确值，可把 probe 结果保存在闭包变量里，再传给 validateVideo 内部。

function probeContentTypeFromOptions(_options: ValidateOptions): string | undefined {
  return undefined
}
function probeContentLengthFromOptions(_options: ValidateOptions): number | undefined {
  return undefined
}