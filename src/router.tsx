import { FC } from "react"

import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom"

import { RouterName } from "@/const/router"
import Login from "@/module/auth/login"
import Register from "@/module/auth/register"
import EnglishIndex from "@/module/english"
import HomeIndex from "@/module/home"
import HomeRoot from "@/module/home/route"

export const RouterComponent: FC = () => {
  const routes: RouteObject[] = [
    {
      path: RouterName.HOME,
      element: <HomeRoot />,
      children: [
        {
          index: true,
          element: <HomeIndex />,
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
