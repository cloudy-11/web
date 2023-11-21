import { FC, ReactNode } from "react"

import styled from "styled-components"
import tw from "twin.macro"

import { ColorEnum } from "@/types/common"
import { LockClosedIcon } from "@heroicons/react/20/solid"

const ShadowCard = styled.div<{ color: ColorEnum }>(({ color }) => {
  const styles = [
    tw`w-full mt-1  rounded-lg  left-0 top-0 border-2 border-black `,
  ]
  if (color === ColorEnum.FFF0E5) {
    styles.push(tw`bg-[#FFF0E5]`)
  }

  if (color === ColorEnum.FFFFFF) {
    styles.push(tw`bg-[#ffffff]`)
  }

  if (color === ColorEnum.OOOOOO) {
    styles.push(tw`bg-[#000000]`)
  }

  if (color === ColorEnum.A3E635) {
    styles.push(tw`bg-[#a3e635]`)
  }

  if (color === ColorEnum.FCA5A5) {
    styles.push(tw`bg-[#fca5a5]`)
  }

  return styles
})

const MainCard = styled.div<{ color: ColorEnum }>(({ color }) => {
  const styles = [
    tw`
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
  text-black
  flex
  justify-center
  items-center
  rounded-lg
  mt-2
  select-none
  h-full
`,
  ]
  if (color === ColorEnum.FFF0E5) {
    styles.push(tw`bg-[#FFF0E5]`)
  }

  if (color === ColorEnum.FFFFFF) {
    styles.push(tw`bg-[#ffffff]`)
  }

  if (color === ColorEnum.OOOOOO) {
    styles.push(tw`bg-[#000000]`)
  }

  if (color === ColorEnum.A3E635) {
    styles.push(tw`bg-[#a3e635]`)
  }
  if (color === ColorEnum.FCA5A5) {
    styles.push(tw`bg-[#fca5a5]`)
  }

  return styles
})

const LockCard = tw.div`
  absolute
  w-full
  h-full
  bg-[#F7F7F7CE]
  rounded-lg
  flex
  p-2
  justify-end
  items-start
`

export const Card: FC<{
  color?: ColorEnum
  children: ReactNode
  height: number
  isLock?: boolean
  shadowColor?: ColorEnum
}> = ({
  children,
  height,
  isLock = false,
  color = ColorEnum.FFF0E5,
  shadowColor = ColorEnum.OOOOOO,
}) => {
  const BodyCard: FC = () => {
    if (isLock) {
      return (
        <MainCard color={color}>
          {children}
          <LockCard>
            <LockClosedIcon height={25} />
          </LockCard>
        </MainCard>
      )
    }

    return <MainCard color={color}>{children}</MainCard>
  }

  return (
    <div style={{ height: height }} className={`relative w-full  pl-1 pt-1 `}>
      <BodyCard />
      <ShadowCard style={{ height: height }} color={shadowColor}></ShadowCard>
    </div>
  )
}
