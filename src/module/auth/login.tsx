import { FC, useEffect, useState } from "react"

import { AxiosError } from "axios"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

import { loginApi, refreshTokenApi } from "@/api/route"
import logo from "@/assets/logo.png"
import { WrapBtn } from "@/component/button"
import { RouterName } from "@/const/router"
import { ErrorType } from "@/types/common"
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
  setUserLocal,
} from "@/utils/helper"
import { validateEmail } from "@/utils/validator"

const Form: FC = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = async () => {
    if (email === "" || password === "") {
      toast.error("Please enter email address and password")
      return
    }
    if (password.length < 8) {
      toast.error("password must be at least 8 characters")
      return
    }
    if (!validateEmail(email)) {
      toast.error("Email is not valid")
      return
    }
    setLoading(true)
    try {
      const result = await loginApi(email, password)
      setUserLocal(result.data.user)
      setAccessToken(result.data.accessToken)
      setRefreshToken(result.data.refreshToken)
      toast.success("Login successfully")
      setTimeout(() => {
        navigate(RouterName.HOME)
      }, 1000)
    } catch (error) {
      toast.error(
        `Login failed : ${
          ((error as AxiosError).response?.data as ErrorType).message
        }`
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-[400px] h-[300px] bg-white border border-1 border-black rounded-sm flex flex-col justify-center px-8 gap-4">
      <div className="text-2xl font-bold">XCloud</div>
      <div className="flex flex-col gap-1">
        <div className="text-sm">{"Email"}</div>
        <input
          onChange={(e) => setEmail(e.target.value)}
          className="outline-none border border-1 border-gray-500 rounded-sm px-2 py-1 "
        />
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-sm">{"Password"}</div>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="outline-none border border-1 border-gray-500 rounded-sm px-2 py-1 "
        />
      </div>
      <div className="flex flex-col gap-1 items-end">
        <div className="relative w-full  pl-1 pt-1">
          <WrapBtn isLoading={loading} onClick={onSubmit}>
            Let's go ...
          </WrapBtn>
          <div className=" w-full h-[40px] mt-1 rounded-lg  left-0 top-0 bg-white  border-2 border-black"></div>
        </div>
        <div
          className="text-sm text-blue-600 underline cursor-pointer select-none"
          onClick={() => navigate(RouterName.REGISTER)}
        >
          Register
        </div>
      </div>
    </div>
  )
}

const Login: FC = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const accessToken = getAccessToken()
    const refreshToken = getRefreshToken()
    if (accessToken) {
      return () => navigate(RouterName.HOME)
    }
    if (!accessToken && refreshToken) {
      refreshTokenFn(refreshToken)
      return () => navigate(RouterName.HOME)
    }
  }, [])

  const refreshTokenFn = async (token: string) => {
    try {
      const data = await refreshTokenApi(token)
      if (data.data) {
        setAccessToken(data.data.accessToken)
        setRefreshToken(data.data.refreshToken)
      }
    } catch (error) {
      /* empty */
    }
  }

  return (
    <div className="px-8 py-2 h-[100vh] flex flex-col">
      <img
        className="cursor-pointer"
        onClick={() => navigate(RouterName.HOME)}
        src={logo}
        width={80}
      />
      <div className="h-full flex justify-center items-center">
        <Form />
      </div>
    </div>
  )
}

export default Login
