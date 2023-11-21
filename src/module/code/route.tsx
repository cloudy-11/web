import { FC } from "react"

import { Outlet } from "react-router-dom"

import { getCategoriesApi } from "@/api/route"
import Header from "@/component/header"
import CodeStore from "@/store/code"
import { CategoryType } from "@/types/category"

export const HomeLoader = async () => {
  const result = await getCategoriesApi(CategoryType.CODE)

  return {
    code: result.data,
  }
}

const HomeRoot: FC = () => {
  return (
    <div className="flex justify-center min-h-[100vh] w-full ">
      <CodeStore.Provider>
        <Outlet />
      </CodeStore.Provider>
      <Header />
    </div>
  )
}

export default HomeRoot
