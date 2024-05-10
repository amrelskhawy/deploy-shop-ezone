import { useContext } from "react";
import "./Quantity.scss"
import { FaPlus, FaMinus } from "react-icons/fa6";
import { InputsContext } from "@/context/Inputs.context";

const Quantity = ({ val, name, ID }) => {

  const { onQuantityChange } = useContext(InputsContext)

  return (
    <div className="quantity-field">
      <label className="quantity-label" htmlFor="quantity">الكمية</label>
      <div className="quantity">
        <button onClick={(e) => {
          e.preventDefault()
          onQuantityChange("decreament")
        }} className="quantity-action">
          <FaMinus />

        </button>
        <input
          type="number"
          name={name} 
          id={ID}
          className="quantity-input"
          value={val}
          // onChange={}
        />

        <button onClick={(e) => {
          e.preventDefault()
          onQuantityChange("increment")
        }} className="quantity-action">
          <FaPlus />

        </button>

      </div>
    </div>
  )
}

export default Quantity