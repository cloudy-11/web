import axios from "axios"

import { api } from "@/api/interceptor"
import { Category, CategoryType } from "@/types/category"
import { RSP } from "@/types/common"
import { Question } from "@/types/question"
import { User } from "@/types/user"
import { EnvVariables } from "@/utils/constant"

const baseURL = `${EnvVariables.API_SERVER}/${EnvVariables.VERSION_API}`

export const refreshTokenApi = async (
  refreshToken: string
): Promise<
  RSP<{
    accessToken: string
    refreshToken: string
  }>
> => {
  const { data } = await axios.post(`${baseURL}/refresh`, {
    refreshToken: refreshToken,
  })

  return data
}

export const signUpApi = async (
  email: string,
  password: string
): Promise<
  RSP<{
    user: User
    accessToken: string
    refreshToken: string
  }>
> => {
  const { data } = await api.post("/signup", {
    email,
    password,
  })

  return data
}

export const loginApi = async (
  email: string,
  password: string
): Promise<
  RSP<{
    user: User
    accessToken: string
    refreshToken: string
  }>
> => {
  const { data } = await api.post("/login", {
    email,
    password,
  })

  return data
}

export const getCategoriesApi = async (
  type: CategoryType
): Promise<RSP<Category[]>> => {
  const { data } = await api.get(`/category?type=${type}`)

  return data
}

export const getQuestionsApi = async (
  categoryId: string
): Promise<RSP<Question[]>> => {
  const { data } = await api.get(`/question?categoryId=${categoryId}`)

  return data
}

export const createSubmissionApi = async (
  questionId: string,
  url: string
): Promise<RSP<Question[]>> => {
  const { data } = await api.post(`/submission`, {
    questionId,
    url,
  })

  return data
}
