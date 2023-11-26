import { Mutex } from "async-mutex"
import axios, { AxiosError } from "axios"

import { refreshTokenApi } from "@/api/route"
import { EnvVariables } from "@/utils/constant"
import {
  clearLocalStorage,
  delCookies,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "@/utils/helper"

const mutex = new Mutex()
const baseURL = `${EnvVariables.API_SERVER}/${EnvVariables.VERSION_API}`
const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  // Authorization: "",
}

export const api = axios.create({
  baseURL,
  headers,
  withCredentials: false, // to send cookie
})

api.interceptors.request.use(async (config) => {
  const accessToken = getAccessToken()
  const refreshToken = getRefreshToken()
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  if (refreshToken && !accessToken) {
    await mutex.acquire()
    try {
      const data = await refreshTokenApi(refreshToken)
      // 5. set header and cookies
      const originalRequest = config
      originalRequest.headers["Authorization"] =
        "Bearer " + data.data.accessToken
      setAccessToken(data.data.accessToken)
      setRefreshToken(data.data.refreshToken)
      // 6. Recall request
    } catch (error) {
      Promise.reject(error)
    } finally {
      mutex.release()
    }
  }

  if (!refreshToken && !accessToken) {
    delCookies()
    clearLocalStorage()
  }

  return config
})

api.interceptors.response.use(
  async (response) => {
    return response
  },
  async (error: AxiosError) => {
    console.log(error)
    // check conditions to refresh token
    if (error.response?.status === 401) {
      // 1. Check code response
      const originalRequest = error.config
      if (!originalRequest) {
        return
      }
      try {
        // 2. Lock request api
        await mutex.acquire()
        const refreshToken = getRefreshToken()
        const accessToken = getAccessToken()
        if (!refreshToken) {
          delCookies()
          clearLocalStorage()
          // window.location.href = RouterName.HOME

          return Promise.reject(error)
        }

        // 3. If exist refreshToken => renew access token, else logout
        if (!accessToken) {
          // 4. Call api refresh token
          try {
            const data = await refreshTokenApi(refreshToken)
            // 5. set header and cookies

            originalRequest.headers["Authorization"] =
              "Bearer " + data.data.accessToken
            setAccessToken(data.data.accessToken)
            setRefreshToken(data.data.refreshToken)
            // 6. Recall request
            return await axios.request(originalRequest)
          } catch (error) {
            Promise.reject(error)
          }
        }

        if (refreshToken && accessToken) {
          // 7. Recall request

          return await axios.request(originalRequest)
        }
      } finally {
        // finally of mutex
        mutex.release()
      }
    }
    return Promise.reject(error)
  }
)
