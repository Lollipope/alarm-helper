import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import { getLocalStorageToken, getToken, setToken } from './auth'
import qs from 'qs'
import { emitter, EmitEventApi } from '@ah/utils'
import { getTokenId } from '../utils'
// cas单点登录配置
const casService = axios.create({
  baseURL: window.globalConfig?.AlarmRobotApiContext || '/api/',
  timeout: 20000, // request timeout
})

// 创建 axios 实例
const service = axios.create({
  baseURL: window.globalConfig?.AlarmRobotApiContext || '/api/',
  timeout: 20000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
})

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getTokenId()
    // 请求头添加token信息
    if (token) {
      config.headers['Accept-Sign-Ignore'] = 'BIGBIGGIRL' // 忽略接口参数验签
      config.headers['cdp-token'] = token // 请求头添加token
    }
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data
    // if (response.headers['x-auth-token']) {
    //   res['x-auth-token'] = response.headers['x-auth-token']
    // }
    return response.data
  },
  (error) => {
    const { status, data } = error?.response
    emitter.emit(EmitEventApi, { status, data })
    return Promise.reject(error)
  },
)

// cas接口请求拦截器
casService.interceptors.request.use(
  (config) => {
    if (getTokenId()) {
      config.headers['Accept-Sign-Ignore'] = 'BIGBIGGIRL'
      config.headers['x-auth-token'] = getToken() // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers['cdp-token'] = getTokenId() // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  },
)

export function getBaseUrl() {
  const baseURL = service.defaults.baseURL
  return baseURL?.endsWith('/') ? baseURL : baseURL + '/'
}

export function getRealUrl(api: string) {
  let url = getBaseUrl()
  if (!url.endsWith('/')) {
    url = url + '/'
  }
  if (api) {
    url = url + (api.startsWith('/') ? api.substring(1) : api)
  }
  return url
}

// cas单点登录接口调用
export const casGet = (url: any, params: any) => {
  return casService.get(`${url}`, {
    params: params,
  })
}

export const casPost = (url: string, params?: any, tout = 60000) => {
  return casService({
    method: 'post',
    url: url,
    data: params,
    timeout: tout,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    transformRequest: [
      function (data) {
        return qs.stringify(data)
      },
    ],
  })
}

// 普通登录接口调用
export function get<R>(url: string, params?: any): Promise<R> {
  return service.get(`${url}`, {
    params: params,
  })
}

export function post<R>(url: string, params?: any, tout = 60000): Promise<R> {
  return service({
    method: 'post',
    url: url,
    data: params,
    timeout: tout,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    transformRequest: [
      function (data) {
        return qs.stringify(data)
      },
    ],
  })
}

export function postJson<R>(url: string, params?: any): Promise<R> {
  return service({
    method: 'post',
    url: `${url}`,
    data: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export function postJsonParams<R>(url: string, params?: any): Promise<R> {
  return service({
    method: 'post',
    url: `${url}`,
    params: params,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export function postFormat<R>(url: string, params?: any, tout = 60000): Promise<R> {
  return service({
    method: 'post',
    url: url,
    data: params,
    timeout: tout,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    transformRequest: [
      function (data) {
        return qs.stringify(data)
      },
    ],
  })
}

export function put<R>(url: string, params?: any): Promise<R> {
  return service({
    method: 'put',
    url: `${url}`,
    data: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
export function put_form<R>(url: string, params?: any, tout = 60000): Promise<R> {
  return service({
    method: 'put',
    url: url,
    data: params,
    timeout: tout,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    transformRequest: [
      function (data) {
        return qs.stringify(data)
      },
    ],
  })
}

export function del<R>(url: string, params?: any, tout = 60000): Promise<R> {
  return service({
    method: 'delete',
    url: `${url}`,
    data: params,
    timeout: tout,
  })
}

export function getExport<R>(url: string, params?: any, tout = 999999): Promise<R> {
  return service({
    method: 'post',
    url: `${url}`,
    data: params,
    timeout: tout,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    transformRequest: [
      function (data) {
        return qs.stringify(data)
      },
    ],
    responseType: 'blob',
  })
}

// 获取返回文件
export function getFile<R>(url: string, headers?: any): Promise<R> {
  return service({
    method: 'get',
    url: `${url}`,
    responseType: 'blob',
    headers: headers,
  })
}

export function postFile<R>(url: string, params?: any): Promise<R> {
  return service({
    method: 'post',
    url: `${url}`,
    responseType: 'blob',
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export function uploadFile<R>(url: string, params?: any): Promise<R> {
  return service({
    method: 'post',
    url: `${url}`,
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

// 上传文件同时返回文件
export function uploadImportFile<R>(url: string, params?: any, tout = 999999): Promise<R> {
  return service({
    method: 'post',
    url: `${url}`,
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    timeout: tout,
    responseType: 'blob',
  })
}

// 工作流
export function put_post<R>(url: any, params: any): Promise<R> {
  return service({
    method: 'post',
    url: `${url}/edit`,
    data: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export function del_post<R>(url: any, tout = 15000): Promise<R> {
  return service({
    method: 'post',
    url: `${url}/delete`,
    timeout: tout,
  })
}

export default service
