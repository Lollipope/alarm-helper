/*
 * @Author: Lollipope
 * @Date: 2025-05-09 15:56:23
 * @LastEditors: Lollipope
 * @LastEditTime: 2025-05-16 11:36:55
 * @FilePath: \leatop-cdp-alarm\packages\alarm-helper\lib\api\auth.ts
 * @Description: 鉴权相关函数
 */
import Cookies from 'js-cookie'

const TokenKey = 'x-auth-token'
// const LocalStorageTokenKey = "Authorization";
const LocalStorageTokenKey = 'cdp-token'

export function getToken() {
  return Cookies.get(TokenKey) || window.localStorage.getItem(LocalStorageTokenKey)
}

export function setToken(token: string) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 将cookie存储到localStorage
export function setLocalStorageToken(token: string) {
  window.localStorage.setItem(LocalStorageTokenKey, token)
}

export function getLocalStorageToken(name = LocalStorageTokenKey) {
  return window.localStorage.getItem(name)
}

export function removeLocalStorageToken() {
  return window.localStorage.removeItem(LocalStorageTokenKey)
}
