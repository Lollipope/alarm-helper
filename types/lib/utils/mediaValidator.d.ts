export type MediaErrorType = 'INVALID_URL' | 'NETWORK_ERROR' | 'TIMEOUT' | 'NOT_FOUND' | 'FORBIDDEN' | 'SERVER_ERROR' | 'CORS_ERROR' | 'CERT_ERROR' | 'INVALID_FORMAT' | 'UNSUPPORTED_BY_BROWSER' | 'ABORTED' | 'NOT_BROWSER' | 'UNKNOWN_ERROR';
export interface MediaDetails {
    /** HTTP 状态码（HEAD 阶段或 onerror 时记录） */
    httpStatus?: number;
    /** 资源 Content-Type（HEAD 阶段获取） */
    contentType?: string;
    /** 资源字节大小（HEAD 阶段通过 content-length 拿） */
    contentLength?: number;
    /** 图片自然宽（像素） */
    naturalWidth?: number;
    /** 图片自然高（像素） */
    naturalHeight?: number;
    /** 视频时长（秒） */
    duration?: number;
    /** 视频可播放类型声明（canPlayType 结果） */
    canPlayTypeResult?: string;
    /** 总耗时（毫秒） */
    costMs?: number;
    /** 是否降级到了实际加载（HEAD 不可用时为 true） */
    fellBackToLoader?: boolean;
}
export interface MediaValidationResult {
    /** 是否可正常访问 */
    accessible: boolean;
    /** 资源地址 */
    url: string;
    /** 资源类型 */
    type: 'image' | 'video';
    /** 视频专用：是否能解析出可播放的元数据 */
    playable?: boolean;
    /** 资源 mimeType（探测得到时） */
    mimeType?: string;
    /** 资源字节大小 */
    size?: number;
    /** 耗时（毫秒） */
    responseTime?: number;
    /** HTTP 状态码（HEAD 阶段识别到的 4xx/5xx，会同步到 details.httpStatus） */
    statusCode?: number;
    /** 错误类型，accessible 为 true 时为 undefined */
    errorType?: MediaErrorType;
    /** 异常描述信息 */
    errorMessage?: string;
    /** 结构化详情（httpStatus / mime / 像素 等） */
    details?: MediaDetails;
}
export interface ValidateOptions {
    /** 超时（毫秒）。默认图片 8000，视频 10000 */
    timeout?: number;
    /** 用于取消校验的 AbortSignal */
    signal?: AbortSignal;
    /** 是否跳过 HEAD 探测阶段（默认 false）。设为 true 时只走实际加载，速度略快但拿不到字节大小 */
    skipHeadProbe?: boolean;
    /**
     * 是否在 <img> 加载时设置 crossOrigin='anonymous' 来探测 CORS 错误。
     *
     * 默认 false（推荐）：与浏览器原生 <img> / <el-image> 默认行为一致，
     *   能正常显示没有 CORS 头的资源（最常见的内网 / CDN 场景）。
     *
     * 设为 true：能精确区分 CORS_ERROR 与 INVALID_FORMAT，但会让不支持 CORS
     *   的服务端被误判为不可用。
     */
    useCors?: boolean;
}
/**
 * URL 合法性校验
 */
export declare function assertValidUrl(url: string): {
    ok: true;
    parsed: URL;
} | {
    ok: false;
    errorType: MediaErrorType;
    errorMessage: string;
};
/**
 * 是否为 HTTPS 资源（用于证书错误的语义判断）
 */
export declare function isHttpsUrl(url: string): boolean;
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
export declare function isCertErrorMessage(msg: string): boolean;
/**
 * 将原始错误转换为对用户友好的证书错误描述
 */
export declare function describeCertError(rawMessage: string, url: string): string;
/**
 * 是否为流媒体（m3u8 / flv），需要走单独的检测路径
 */
export declare function isStreamMedia(url: string): boolean;
/**
 * HEAD 探测：在加载前识别 404 / 403 / 5xx / 大小。
 *
 * 注意：HEAD 失败（特别是 CORS）不应当作"资源不可用"，调用方需要在失败时降级到实际加载。
 */
export declare function probeResource(url: string, timeout: number, signal?: AbortSignal): Promise<{
    ok: true;
    status: number;
    size?: number;
    contentType?: string;
} | {
    ok: false;
    errorType: MediaErrorType;
    errorMessage: string;
    status?: number;
}>;
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
export declare function validateImage(imageUrl: string, options?: ValidateOptions): Promise<MediaValidationResult>;
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
export declare function validateVideo(videoUrl: string, options?: ValidateOptions): Promise<MediaValidationResult>;
