"use client"
import { clsx } from "clsx"
import "./MainBtn.scss"

const MainBtn = ({
  text = 'Button',
  textColor,
  textColorHover,
  bgColor,
  bgColorHover,
  customStyles,
  click,
  IsDisabled
}) => {

  const isColor = (color) => color.startsWith('#') ? color : '#' + color

  return (
    <button
      onClick={click}
      disabled={IsDisabled}
      style={{
        background: isColor(bgColor),
        color: isColor(textColor) || '#fff',
        opacity: IsDisabled && '50%',
        cursor: IsDisabled && 'not-allowed',
        animation: !IsDisabled && 'tilt-shaking 0.20s 1s infinite' ,
      }}
      className={`
        p-2 px-4 hover:opacity-90
        rounded-lg text-xl w-full h-full
        transition-all`
      }>
      {text || "اطلب الان"}
    </button>
  )
}

export default MainBtn