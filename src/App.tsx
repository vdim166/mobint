import SplashScreen from "./components/SplashScreen"
import { Main } from "./components/Main"
import Popup from "./components/Popup"
import "./App.css"
import "./assets/fonts/fonts.css"
import { observer } from "mobx-react-lite"
import companyStore from "./store/companyStore"

const App = observer(() => {
  const { showSplash, popupMessage } = companyStore

  return (
    <div className="App">
      {showSplash ? (
        <SplashScreen />
      ) : (
        <>
          <div className="w-full bg-white flex justify-center header py-3">
            <h1>Управление картами</h1>
          </div>

          <Main />
        </>
      )}
      {popupMessage && <Popup />}
    </div>
  )
})

export default App
