import React from "react"

import { deleteCookie, getCookie, hasCookie, setCookie } from "cookies-next"
import { jwtDecode } from "jwt-decode"
import toast from "react-hot-toast"
import { useLocation } from "react-router-dom"

import { refreshTokenApi } from "@/api/route"
import { User } from "@/types/user"
import { KeysEnum } from "@/utils/constant"

export const getAccessToken = (): string | undefined => {
  const cookie = getCookie(KeysEnum.ACCESS_TOKEN)
  if (cookie) {
    return cookie.toString()
  }
  return undefined
}

export const getRefreshToken = (): string | undefined => {
  const cookie = getCookie(KeysEnum.REFRESH_TOKEN)
  if (cookie) {
    return cookie.toString()
  }
  return undefined
}

export const delCookies = () => {
  deleteCookie(KeysEnum.AUTH_SESSION)
  deleteCookie(KeysEnum.ACCESS_TOKEN)

  // Remove cookies of socket
  const domain = window.location.hostname.split(".").slice(-2).join(".")
  deleteCookie(KeysEnum.ACCESS_TOKEN, {
    domain: domain,
  })
  deleteCookie(KeysEnum.REFRESH_TOKEN)
  deleteCookie(KeysEnum.USER)
}

export const setCookieSocket = async () => {
  const accessToken = getAccessToken()
  const refreshToken = getAccessToken()
  if (accessToken) {
    setAccessToken(accessToken)
  }

  if (!accessToken && refreshToken) {
    const data = await refreshTokenApi(refreshToken)
    try {
      if (data.data) {
        setAccessToken(data.data.accessToken)
        setRefreshToken(data.data.refreshToken)
      }
    } catch (error) {
      return
    }
  }
}

export const setAccessToken = (cookie: string) => {
  const jwtToken = jwtDecode(cookie)
  if (!jwtToken.exp) {
    return
  }
  setCookie(KeysEnum.ACCESS_TOKEN, cookie, {
    maxAge: jwtToken.exp - parseInt((Date.now() / 1000).toFixed(0)),
  })
}

export const setRefreshToken = (cookie: string) => {
  const dToken = jwtDecode(cookie)
  if (!dToken.exp) {
    return
  }
  setCookie(KeysEnum.REFRESH_TOKEN, cookie, {
    maxAge: dToken.exp - parseInt((Date.now() / 1000).toFixed(0)),
  })
}

export const setUserLocal = (data: User) => {
  localStorage.setItem(KeysEnum.USER, JSON.stringify(data))
}

export const getUserLocal = (): User | undefined => {
  const user = localStorage.getItem(KeysEnum.USER)
  if (!user) {
    // Try to get user from cookie
    if (hasCookie(KeysEnum.USER)) {
      const userCookie = getCookie(KeysEnum.USER)
      if (userCookie) {
        const json = JSON.parse(userCookie.toString())
        return json.data
      }
    }

    return undefined
  }

  return JSON.parse(user)
}

export const delUserLocal = () => {
  localStorage.removeItem("user")
}

export const clearLocalStorage = () => {
  localStorage.clear()
}

export const isLogin = (): boolean => {
  const accessToken = getAccessToken()

  if (!accessToken) {
    return false
  }

  return true
}

export const onCopy = (url: string) => {
  if (url) {
    navigator.clipboard.writeText(url)
    toast(`Copied ${url}`, {
      icon: "👏",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    })
  }
}

export const useQuery = () => {
  const { search } = useLocation()

  return React.useMemo(() => new URLSearchParams(search), [search])
}
