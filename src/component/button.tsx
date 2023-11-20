import { ReactNode } from "react"

import { HashLoader } from "react-spinners"
import tw from "twin.macro"

const BtnStyle = tw.div`
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
bg-black
text-white
flex
justify-center
items-center
rounded-lg
mt-2
select-none
h-[40px]
`

const DefaultStyle = tw.div`
absolute
left-0
top-0
cursor-wait
w-full
border-2
border-black
bg-black
text-white
flex
justify-center
items-center
rounded-lg
mt-2
select-none
h-[40px]
`

export const WrapBtn = ({
  isLoading = false,
  children,
  onClick,
}: {
  isLoading?: boolean
  children: ReactNode
  onClick?: () => void
}) => {
  if (isLoading) {
    return (
      <DefaultStyle>
        <HashLoader
          color={"#ffffff"}
          loading={true}
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </DefaultStyle>
    )
  }
  return <BtnStyle onClick={onClick}>{children}</BtnStyle>
}
