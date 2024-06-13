import { observer } from "mobx-react-lite"
import companyStore from "../store/companyStore"

const Popup = observer(() => {
  const { popupMessage, setPopupMessage } = companyStore

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg mx-5">
        <p>{popupMessage}</p>
        <button
          onClick={() => setPopupMessage(null)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Хорошо
        </button>
      </div>
    </div>
  )
})

export default Popup
