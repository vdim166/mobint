import { useEffect } from "react"
import "./SplashScreen.css"
import { observer } from "mobx-react-lite"
import companyStore from "../store/companyStore"

const SplashScreen = observer(() => {
  const { setShowSplash } = companyStore
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000)
    return () => clearTimeout(timer)
  }, [setShowSplash])

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <img className="logo-img" alt="Splash Screen" />
    </div>
  )
})

export default SplashScreen
