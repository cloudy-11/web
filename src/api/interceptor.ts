import axios, { AxiosError } from "axios"

import { EnvVariables } from "@/utils/constant"
import { delCookies, getAccessToken } from "@/utils/helper"

// const mutex = new Mutex()
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

api.interceptors.request.use((config) => {
  const accessToken = getAccessToken()
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

api.interceptors.response.use(
  async (response) => {
    return response
  },
  (error: AxiosError) => {
    // check conditions to refresh token
    if (error.response?.status === 401) {
      delCookies()
      return
    }
    return Promise.reject(error)
  }
)
