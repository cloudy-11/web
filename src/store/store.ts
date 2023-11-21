import { action, Action, createStore } from "easy-peasy"

import { User } from "@/types/user"

export interface GlobalStoreModel {
  user: User | undefined

  setUser: Action<GlobalStoreModel, User>
}
const store = createStore<GlobalStoreModel>({
  user: undefined,

  setUser: action((state, user) => {
    state.user = user
  }),
})

export default store
