import { StoreProvider } from "easy-peasy"

import { RouterComponent } from "@/router"
import store from "@/store/store"

function App() {
  return (
    <StoreProvider store={store}>
      <RouterComponent />
    </StoreProvider>
  )
}

export default App
