import { FC } from "react"

import { Outlet } from "react-router-dom"

const CodeCategoryRoot: FC = () => {
  return (
    <div className="flex justify-center h-full w-full ">
      <Outlet />
    </div>
  )
}

export default CodeCategoryRoot
