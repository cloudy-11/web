import { action, Action, createContextStore } from "easy-peasy"

import { Category } from "@/types/category"

interface CodeModel {
  codes: Category[] | undefined

  setCodes: Action<CodeModel, Category[]>
}

const CodeStore = createContextStore<CodeModel>({
  codes: undefined,

  setCodes: action((state, codes) => {
    state.codes = codes
  }),
})

export default CodeStore
