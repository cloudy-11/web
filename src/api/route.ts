import { api } from '@/api/interceptor';
import { RSP } from '@/types/common';
import { User } from '@/types/user';

export const refreshTokenApi = async (
  refreshToken: string
): Promise<
  RSP<{
    access_token: string
    refresh_token: string
  }>
> => {
  const { data } = await api.post("/refresh", {
    refresh_token: refreshToken,
  })

  return data
}

export const signUpApi = async (
  email: string,
  password: string
): Promise<RSP<{
  user:User,
  accessToken:string,
  refreshToken:string
}>> => {
  const { data } = await api.post("/signup", {
    email,
    password,
  })

  return data
}
