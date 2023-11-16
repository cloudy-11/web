import { FC } from "react"

import { Outlet } from "react-router-dom"

import Header from "@/component/header"

const HomeRoot: FC = () => {
  return (
    <div className="flex justify-center min-h-[100vh] w-full ">
      <Outlet />
      <Header />
    </div>
  )
}

export default HomeRoot
