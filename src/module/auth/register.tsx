import { FC } from "react"

import { useNavigate } from "react-router-dom"

import logo from "@/assets/logo.png"
import { WrapBtn } from "@/component/button"
import { RouterName } from "@/const/router"

const Form: FC = () => {
  const navigate = useNavigate()

  return (
    <div className="w-[400px] h-[300px] bg-white border border-1 border-black rounded-sm flex flex-col justify-center px-8 gap-4">
      <div className="text-2xl font-bold">Get Started</div>
      <div className="flex flex-col gap-1">
        <div className="text-sm">{"Username"}</div>
        <input className="outline-none border border-1 border-gray-500 rounded-sm px-2 py-1 " />
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-sm">{"Password"}</div>
        <input
          type="password"
          className="outline-none border border-1 border-gray-500 rounded-sm px-2 py-1 "
        />
      </div>
      <div className="flex flex-col gap-1 items-end">
        <div className="relative w-full  pl-1 pt-1">
          <WrapBtn>Register</WrapBtn>
          <div className=" w-full h-[40px] mt-1 rounded-lg  left-0 top-0 bg-white  border-2 border-black"></div>
        </div>

        <div
          className="text-sm text-blue-600 underline cursor-pointer select-none"
          onClick={() => navigate(RouterName.LOGIN)}
        >
          Login
        </div>
      </div>
    </div>
  )
}

const Register: FC = () => {
  const navigate = useNavigate()
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

export default Register
