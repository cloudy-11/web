import { FC } from "react"

import { Outlet, Params } from "react-router-dom"

import { getQuestionsApi } from "@/api/route"
import QuestionStore from "@/store/question"

export const CategoryLoader = async (args: { params: Params }) => {
  if (!args.params["questionId"]) {
    return {
      questions: [],
    }
  }
  try {
    const result = await getQuestionsApi(
      args.params["questionId"].split("-").at(-1) ?? ""
    )

    return {
      questions: result.data,
    }
  } catch (error) {
    return {
      questions: [],
    }
  }
}

const CodeCategoryRoot: FC = () => {
  return (
    <div className="flex justify-center h-full w-full ">
      <QuestionStore.Provider>
        <Outlet />
      </QuestionStore.Provider>
    </div>
  )
}

export default CodeCategoryRoot
