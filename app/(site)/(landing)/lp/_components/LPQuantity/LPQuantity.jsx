import { InputsContext } from "@/context/Inputs.context";
import { Input } from "@nextui-org/input";
import { useContext } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import "./LPQuantity.scss"

const LPQuantity = ({ val, name, change }) => {
  const {  onQuantityChange } = useContext(InputsContext)

  return (
    <div className="quantity_container">

      {/* Increament */}
      <button onClick={(e) => {
        e.preventDefault()
        onQuantityChange("increment")
      }} className="action_btn">
        <FaPlus size={'10px'} />
      </button>

      {/* Input */}
      <Input 
        name={name}
        type={'number'}
        isRequired={true}
        variant={''}
        // onChange={change}
        label={"الكمية"}
        min={1}
        value={val}
      />

      {/* Decreament */}
      <button  onClick={(e) => {
        e.preventDefault()
        onQuantityChange("decreament")
      }} className="action_btn">
        <FaMinus size={'10px'} />
      </button>
    </div>
  )
}

export default LPQuantity