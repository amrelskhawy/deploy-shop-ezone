import { useContext, useEffect, useState } from "react";
// import { Input } from "@nextui-org/input";
import LPDropdown from "../_components/LPDropdown/LPDropdown";
import LPCheckbox from "../_components/LPCheckbox/LPCheckbox";
import LPQuantity from "../_components/LPQuantity/LPQuantity";
import MainBtn from "../_components/MainBtn/MainBtn";
import { CartContext } from "@/context/Cart.context";
import { ProductContext } from "@/context/Product.context";
import { InputsContext } from "@/context/Inputs.context";
import toast from 'react-hot-toast';
import { getSubCityById, } from "./dropdownHelpers";
import { validateRequired } from "@/shared/validator";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import Input from "@/components/Input/Input";
import Dropdown from "@/components/Dropdown/Dropdown";
import Quantity from "@/components/Quantity/Quantity";

export const GetInputs = ({ Configration }) => {
  const { quantity, inputs, requiredInputs, orderData, handleChange } = useContext(InputsContext);
  const { updateCartField, onCheckout } = useContext(CartContext);
  const { generatedVariant, productInfo } = useContext(ProductContext);
  const { BuyButtonBackground, BuyButtonHoverBackground, BuyButtonText, BuyButtonTextColor, BuyButtonTextHoverColor } = Configration;
  const [isFormReady, setIsFormReady] = useState(false)

  // Recapatcha 
  const { executeRecaptcha } = useGoogleReCaptcha();


  useEffect(() => {
    // Updates the form readiness state whenever orderData changes
    setIsFormReady(validateRequired(requiredInputs, orderData));
  }, [isFormReady, orderData, requiredInputs]);


  const onChekoutAction = async (e) => {
    e.preventDefault();

    // Check if the SubCity is null

    try {
      const token = await executeRecaptcha();
      if (!token) {
        toast.error("")
        return;
      }

      if (token) {
        if (!productInfo.prod.NoQtySell) {
          toast.error("الكمية لا تكفى")
        } else {
          const id = orderData['CityId'].value

          if (id) {
            const isThereASubCity = getSubCityById(+id).then(res => {
              if (res && res.length < 0) {
                updateCartField(97, 'SubCityId', null)
              }
            })
          }

          const { IsVariant } = productInfo.prod

          if (IsVariant) {
            if (Object.keys(generatedVariant).length !== 0) {
              onCheckout()
              setTimeout(() => {
                toast.success("تم الحفظ بنجاح")
              }, 500)
            } else {
              toast.error("يرجي اختيار تفاصيل المنتح")
            }
          } else {
            onCheckout()
            setTimeout(() => {
              toast.success("تم الحفظ بنجاح")
            }, 500)
          }

        }
      }
    } catch (error) { }



  }
  const renderInputByType = (input) => {
    const { FieldId, FieldName, FieldType, Label, NullValueDescription , IsRequired } = input;

    switch (FieldType) {
      case 3:
        return <Dropdown
          name={FieldName}
          label={Label}
          key={FieldId}
          ID={FieldId}
          val={orderData[FieldName]} 
          />;
        // return <LPDropdown
        //   name={FieldName}
        //   label={Label}
        //   key={FieldId}
        //   ID={FieldId}
        //   val={orderData[FieldName]}
        //   data={FieldName} />;
      case 2:
        return (
          <div key={FieldId} className="col-span-2">
            <LPCheckbox change={handleChange} name={FieldName} text={Label} id={FieldId} value={orderData[FieldName]} />
          </div>
        );
      default:
        return (
          <Input
            key={FieldId}
            name={FieldName}
            value={orderData[FieldName]}
            ChangeFunc={(e) => {
              handleChange(FieldName, e.target.value, FieldId)
            }}
            maxLength={
              FieldName.includes("Phone") ? 10 : ''
            }
            minLength={
              FieldName.includes("Phone") ? 10 : ''
            }
            type="text"
            required={IsRequired}
            variant="underlined"
            label={Label}
            placeholder={NullValueDescription}
            onBlur={
              () => {
                updateCartField(FieldId, FieldName, orderData[FieldName])
              }
            }
          />
        );
    }
  };

  return (
    <div className="inputs-container">
      {inputs.length > 1 && <Quantity name="quantity" val={quantity} ID={'quantityInput'} />}
      {inputs.map(renderInputByType)}
      <div className="btn">
        <MainBtn
          bgColor={BuyButtonBackground}
          bgColorHover={BuyButtonHoverBackground}
          textColor={BuyButtonTextColor}
          textColorHover={BuyButtonTextHoverColor}
          text={BuyButtonText}
          click={(e) => onChekoutAction(e)}
          IsDisabled={!isFormReady}
        />
      </div>
    </div>
  );
};
