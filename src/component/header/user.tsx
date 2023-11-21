import { FC } from "react"

import { useNavigate } from "react-router-dom"
import tw from "twin.macro"

import Identicon from "@/component/identicon"
import { OptionxBox, PopItem, PopPanel, PopPover } from "@/component/popover"
import { RouterName } from "@/const/router"
import { User } from "@/types/user"
import { clearLocalStorage, delCookies } from "@/utils/helper"

const Poppanel = tw(
  PopPanel
)`border border-black w-[240px] mt-5 !right-0 max-h-[calc(100vh_-_70px)] overflow-y-scroll`

export const UserLogedin: FC<{ user: User }> = ({ user }) => {
  const navigate = useNavigate()

  return (
    <PopPover
      custom
      button={
        <div className="flex flex-row gap-2 items-center bg-black px-4 py-1 rounded-lg">
          <Identicon size={40} value={user.id} />
          <div className="font-medium text-sm text-white">
            {user.email.split("@")[0]}
          </div>
        </div>
      }
    >
      <Poppanel>
        {({ close }) => (
          <>
            <PopItem>
              <OptionxBox
                onClick={() => {
                  close()
                  clearLocalStorage()
                  delCookies()
                  navigate(RouterName.LOGIN)
                }}
              >
                {"Log out"}
              </OptionxBox>
            </PopItem>
          </>
        )}
      </Poppanel>
    </PopPover>
  )
}
