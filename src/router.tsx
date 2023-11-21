import { FC } from "react"

import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom"

import { RouterName } from "@/const/router"
import Login from "@/module/auth/login"
import Register from "@/module/auth/register"
import HomeIndex from "@/module/code"
import CodeCategoryIndex from "@/module/code/category"
import CodeCategoryRoot from "@/module/code/category/route"
import HomeRoot, { HomeLoader } from "@/module/code/route"
import EnglishIndex from "@/module/english"

export const RouterComponent: FC = () => {
  const routes: RouteObject[] = [
    {
      path: RouterName.HOME,
      element: <HomeRoot />,
      children: [
        {
          index: true,
          loader: HomeLoader,
          element: <HomeIndex />,
        },
        {
          path: "code/:codeId",
          element: <CodeCategoryRoot />,
          children: [{ index: true, element: <CodeCategoryIndex /> }],
        },
        {
          path: RouterName.ENGLISH,
          element: <EnglishIndex />,
        },
      ],
    },
    {
      path: RouterName.LOGIN,
      element: <Login />,
      index: true,
    },
    {
      path: RouterName.REGISTER,
      element: <Register />,
      index: true,
    },
  ]

  return <RouterProvider router={createBrowserRouter(routes)} />
}
