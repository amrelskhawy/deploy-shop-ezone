import { CartContext } from "@/context/Cart.context"
import { InputsContext } from "@/context/Inputs.context"
import { Checkbox } from "@nextui-org/checkbox"
import { useContext, useState } from "react"


const LPCheckbox = ({ text, val, id, name, change }) => {

    const { onCheckboxChange } = useContext(InputsContext)
    const { updateCartField } = useContext(CartContext)
    const { orderData } = useContext(InputsContext)
    const [isChecked, setIsChecked] = useState(JSON.parse(orderData[name]))

    return (
        <Checkbox
            name={name}
            id={id}
            onChange={(val) => {
                onCheckboxChange(name, val.target.checked, id)
                updateCartField(id, name, val.target.checked)
            }}
            defaultSelected={isChecked}
            className="flex gap-2 mt-1">
            {text}
        </Checkbox>
    )
}

export default LPCheckbox