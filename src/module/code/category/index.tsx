import { FC, useEffect, useState } from "react"

import { AxiosError } from "axios"
import toast from "react-hot-toast"
import { Ghost } from "react-kawaii"
import { useLoaderData, useLocation, useNavigate } from "react-router-dom"
import tw from "twin.macro"

import { createSubmissionApi } from "@/api/route"
import { Card } from "@/component/card"
import { RouterName } from "@/const/router"
import QuestionStore from "@/store/question"
import { ColorEnum, ErrorType } from "@/types/common"
import { Question } from "@/types/question"
import { getAccessToken } from "@/utils/helper"

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

const SubmitSession: FC<{ questionActive: Question }> = ({
  questionActive,
}) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [sumitUrl, setSubmitUrl] = useState<string>("")
  const accessToken = getAccessToken()

  const submit = async () => {
    try {
      await createSubmissionApi(questionActive.id, sumitUrl)
      toast.success("Submit successfully")
    } catch (error) {
      toast.error(((error as AxiosError).response?.data as ErrorType).message)
    }
  }

  if (!accessToken) {
    return (
      <Card
        height={40}
        color={ColorEnum.OOOOOO}
        shadowColor={ColorEnum.FFFFFF}
        onClick={() =>
          navigate(`${RouterName.LOGIN}?redirect=${location.pathname}`)
        }
      >
        <div className="text-white">LOG IN TO SUBMIT</div>
      </Card>
    )
  }

  return (
    <div className="p-4 flex flex-col gap-4 border-2 border-black rounded-lg">
      <p
        className="font-medium underline cursor-pointer"
        onClick={() => {
          window.open(questionActive.url, "_blank")
        }}
      >
        Link question
      </p>
      <input
        onChange={(e) => setSubmitUrl(e.target.value)}
        placeholder="Url Submission"
        className="outline-none border border-1 border-gray-500 rounded-md px-2 py-1 "
      />
      <Card
        onClick={submit}
        height={40}
        color={ColorEnum.A3E635}
        isLock={sumitUrl === ""}
      >
        SUBMIT
      </Card>
    </div>
  )
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
      <SubmitSession questionActive={questionActive} />
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
      {/* <div className="text-xl font-bold">Quester</div> */}
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
