import { action, Action, createContextStore } from "easy-peasy"

import { Question } from "@/types/question"

interface QuestionModel {
  questions: Question[] | undefined
  questionActive: Question | undefined

  setQuestions: Action<QuestionModel, Question[]>
  setQuestionActive: Action<QuestionModel, Question>
}

const QuestionStore = createContextStore<QuestionModel>({
  questions: [],
  questionActive: undefined,

  setQuestions: action((state, questions) => {
    state.questions = questions
  }),
  setQuestionActive: action((state, question) => {
    state.questionActive = question
  }),
})

export default QuestionStore
