import { FC, useEffect } from "react"

import { Ghost } from "react-kawaii"
import { useLoaderData } from "react-router-dom"
import tw from "twin.macro"

import { Card } from "@/component/card"
import QuestionStore from "@/store/question"
import { ColorEnum } from "@/types/common"
import { Question } from "@/types/question"

const Main = tw.div`max-w-[1200px] w-full h-full mt-[70px] flex flex-col items-end gap-12`

const QuestionCard: FC = () => {
  const questions = QuestionStore.useStoreState((state) => state.questions)
  const questionActive = QuestionStore.useStoreState(
    (state) => state.questionActive
  )

  const setQuestionActive = QuestionStore.useStoreActions(
    (action) => action.setQuestionActive
  )

  if (!questions) {
    return <></>
  }

  const list = questions.map((item) => (
    <Card
      onClick={() => {
        if (!item.isLock) {
          setQuestionActive(item)
        }
      }}
      key={item.id}
      color={
        questionActive?.id === item.id ? ColorEnum.FCA5A5 : ColorEnum.FFFFFF
      }
      height={80}
      shadowColor={ColorEnum.OOOOOO}
      isLock={item.isLock}
    >
      <div className="text-black font-medium p-4 truncate">{item.title}</div>
    </Card>
  ))

  return <div className="p-8 w-2/3 h-full flex flex-col gap-4">{list}</div>
}

const QuestInfo: FC = () => {
  const questionActive = QuestionStore.useStoreState(
    (state) => state.questionActive
  )
  if (!questionActive) {
    return <></>
  }
  return (
    <div className="p-8 flex flex-col gap-4 border-l-2 border-black fixed w-[400px] h-full">
      <Card height={40} color={ColorEnum.A3E635}>
        SUBMIT
      </Card>
      <div className="text-xl font-bold">Reward</div>
      <div className="flex flex-row gap-4">
        <Ghost size={30} mood="blissful" color="#40CEF1" />
        <div className="text-lg font-medium">{questionActive.ghost} ghost</div>
      </div>
      <div className="text-xl font-bold">Question</div>

      <div className="rounded-lg border-2 border-black w-full p-2 bg-white flex flex-col gap-4">
        <p className="font-semibold">{questionActive.title}</p>
        <p>{questionActive.description}</p>
      </div>
      <div className="text-xl font-bold">Quester</div>
    </div>
  )
}

const CodeCategoryIndex: FC = () => {
  const data = useLoaderData() as {
    questions: Question[]
  }

  const setQuestions = QuestionStore.useStoreActions(
    (action) => action.setQuestions
  )
  const setQuestionActive = QuestionStore.useStoreActions(
    (action) => action.setQuestionActive
  )

  useEffect(() => {
    if (data.questions && data.questions.length > 0) {
      setQuestions(data.questions)
      setQuestionActive(data.questions[0])
    }
  }, [])

  return (
    <Main className="text-black">
      <div className="w-full h-full flex flex-row">
        <QuestionCard />
      </div>
      <QuestInfo />
    </Main>
  )
}

export default CodeCategoryIndex
