import { FC } from "react"

import tw from "twin.macro"

import { Card } from "@/component/card"
import { ColorEnum } from "@/types/common"

const Main = tw.div`max-w-[1200px] w-full h-full mt-[70px] flex flex-col items-end gap-12`

const Question: FC = () => {
  return (
    <div className="p-8 w-2/3 h-full">
      <Card color={ColorEnum.OOOOOO} height={80} shadowColor={ColorEnum.FFFFFF}>
        <div className="text-white">hello</div>
      </Card>
    </div>
  )
}

const QuestInfo: FC = () => {
  return (
    <div className="p-8 border-l-2 border-black fixed w-[400px] h-full">
      Quest info
    </div>
  )
}

const CodeCategoryIndex: FC = () => {
  return (
    <Main className="text-black">
      <div className="w-full h-full flex flex-row">
        <Question />
      </div>
      <QuestInfo />
    </Main>
  )
}

export default CodeCategoryIndex
