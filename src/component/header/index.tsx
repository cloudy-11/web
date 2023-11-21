import { FC } from "react"

import { useLocation, useNavigate } from "react-router-dom"

import logo from "@/assets/logo.png"
import { WrapBtn } from "@/component/button"
import { UserLogedin } from "@/component/header/user"
import { RouterName } from "@/const/router"
import { getUserLocal } from "@/utils/helper"

const Left: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const path = `/${location.pathname.split("/")[1]}`

  const homeLocate =
    path === RouterName.HOME || path === RouterName.CODE
      ? "cursor-pointer bg-black text-white rounded-lg py-2 px-4"
      : "cursor-pointer  py-2 px-4"

  const engLocate =
    path === RouterName.ENGLISH
      ? "cursor-pointer bg-black text-white rounded-lg py-2 px-4"
      : "cursor-pointer py-2 px-4"

  return (
    <div className="w-1/2 flex flex-row justify-start items-center gap-2">
      <img
        onClick={() => navigate(RouterName.HOME)}
        className="cursor-pointer"
        src={logo}
        width={80}
      />
      <div className={homeLocate} onClick={() => navigate(RouterName.HOME)}>
        Coding
      </div>
      <div className={engLocate} onClick={() => navigate(RouterName.ENGLISH)}>
        English
      </div>
    </div>
  )
}

const Right: FC = () => {
  const navigate = useNavigate()
  const user = getUserLocal()

  if (user) {
    return (
      <div className="w-1/2 flex flex-row justify-end items-center gap-4">
        <UserLogedin user={user} />
      </div>
    )
  }

  return (
    <div className="w-1/2 flex flex-row justify-end items-center gap-4">
      <div
        onClick={() => navigate(RouterName.LOGIN)}
        className="relative w-32 pl-1 pt-1"
      >
        <WrapBtn>Connect</WrapBtn>
        <div className=" w-full h-[40px] mt-1 rounded-lg  left-0 top-0 bg-white  border-2 border-black"></div>
      </div>
    </div>
  )
}

const Header: FC = () => {
  return (
    <div className="bg-[#E5EBFF] border-black border-b-2 fixed py-2 px-8 h-[72px] w-full flex flex-row ">
      <Left />
      <Right />
    </div>
  )
}

export default Header
