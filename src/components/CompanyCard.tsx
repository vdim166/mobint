import { observer } from "mobx-react-lite"
import { changeImageColor } from "../hexto"
import { Icon } from "./Icon"
import companyStore from "../store/companyStore"

type ComponyCardProps = {
  cardBackgroundColor: string
  highlightTextColor: string
  textColor: string
  mainColor: string
  accentColor: string
  backgroundColor: string
  logo: string
  cashToMark: number
  markToCash: number
  name: string
  number: number
  requiredSum: number
  mark: number
  companyName: string
  id: string
  reference?: (node: HTMLDivElement) => void
}

const ComponyCard = observer(
  ({
    cardBackgroundColor,
    highlightTextColor,
    textColor,
    mainColor,
    accentColor,
    backgroundColor,
    logo,
    mark,
    cashToMark,
    name,
    companyName,
    reference,
    id,
  }: ComponyCardProps) => {
    const { setPopupMessage } = companyStore

    const trashFilter = changeImageColor(accentColor) || ""
    const eyeFilter = changeImageColor(mainColor) || ""

    const onMoreInfo = () =>
      setPopupMessage(`Нажата кнопка Подробнее, id компании: ${id}`)

    const onDelete = () =>
      setPopupMessage(`Нажата кнопка Удалить, id компании: ${id}`)

    const onShow = () =>
      setPopupMessage(`Нажата кнопка Показать, id компании: ${id}`)

    return (
      <div
        ref={reference}
        className="bg-white rounded-lg p-5 shadow-lg mb-2"
        style={{ backgroundColor: cardBackgroundColor }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl" style={{ color: highlightTextColor }}>
            {companyName}
          </h2>
          <img
            className="bg-gray-300 rounded-full w-8 h-8 flex justify-center items-center"
            src={logo}
          ></img>
        </div>
        <hr></hr>
        <div className="text-2xl mb-4 mt-3" style={{ color: textColor }}>
          <span style={{ color: highlightTextColor }}>{mark}</span> баллов
        </div>
        <div className="flex justify-between mb-4">
          <div className="text-sm" style={{ color: textColor }}>
            <div>Кэшбэк</div>
            <div className="text-black">{cashToMark} %</div>
          </div>
          <div className="text-sm mr-10" style={{ color: textColor }}>
            <div>Уровень</div>
            <div className="text-black">{name}</div>
          </div>
        </div>
        <hr></hr>
        <div className="flex justify-between items-center mt-3">
          <button
            className="text-2xl"
            style={{ color: mainColor }}
            onClick={onShow}
          >
            <Icon filter={eyeFilter} className="eye" />
          </button>
          <button
            className="text-2xl"
            style={{ color: accentColor }}
            onClick={onDelete}
          >
            <Icon filter={trashFilter} className="trash" />
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={onMoreInfo}
            style={{ color: mainColor, backgroundColor: backgroundColor }}
          >
            Подробнее
          </button>
        </div>
      </div>
    )
  }
)

export default ComponyCard
