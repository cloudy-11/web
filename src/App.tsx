import { StoreProvider } from "easy-peasy"
import nProgress from "nprogress"

import { RouterComponent } from "@/router"
import store from "@/store/store"

function App() {
  nProgress.configure({ showSpinner: false, speed: 800 })

  return (
    <StoreProvider store={store}>
      <RouterComponent />
    </StoreProvider>
  )
}

export default App
