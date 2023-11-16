import { FC, ReactNode } from "react"

import tw from "twin.macro"

const MainCard = tw.div`
  hover:transition
  hover:duration-500
  duration-500
  hover:ease-in-out
  hover:transform
  hover:translate-x-1
  hover:translate-y-1
  absolute
  left-[-4px]
  top-[-4px]
  cursor-pointer
  w-full
  border-2
  border-black
  bg-[#FFF0E5]
  text-black
  flex
  justify-center
  items-center
  rounded-lg
  mt-2
  select-none
  h-full
`

export const Card: FC<{ children: ReactNode; height: number }> = ({
  children,
  height,
}) => {
  return (
    <div style={{ height: height }} className={`relative w-full  pl-1 pt-1 `}>
      <MainCard>{children}</MainCard>
      <div
        style={{ height: height }}
        className={`w-full mt-1  rounded-lg  left-0 top-0 bg-black`}
      ></div>
    </div>
  )
}
