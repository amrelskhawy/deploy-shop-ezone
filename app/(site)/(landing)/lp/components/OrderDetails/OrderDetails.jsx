"use client"

import { GetInputs } from "@/app/(site)/(landing)/lp/utils/GetInputs"
import { useContext } from "react";
import "./OrderDetails.scss"
import { InputsContext } from "@/context/Inputs.context";
import { ProductContext } from "@/context/Product.context";

export function OrderDetails({ Configration, FreeDelivery }) {
  
  const { quantity, orderData } = useContext(InputsContext)
  const { productInfo  } = useContext(ProductContext)
  
  if (!productInfo.prod) return <></>
  return (
    <>
      <div className="order__container">
        <form action="">
          <h4 style={{ color: Configration.TitleColor }}>
            {Configration.Title}
          </h4>

          {/* Dynamic Fetched Inputs */}

          <GetInputs Configration={Configration} />
        </form>

        <div className="bill-container">
          <div className="bill-field">
            <p>السعر</p>
            <p>
              {productInfo.prod.SPrice} {' '}
              د.ل
              </p>
          </div>
          <div className="bill-field">
            <p>الكمية</p>
            <p>
              {quantity}
            </p>
          </div>
          {
            // Check if is the product free delivery
            FreeDelivery &&
            <div className="bill-field">
            <p>التوصيل</p>
            <p className="text-green-600 font-medium">
              توصيل مجانى
            </p>
          </div>}

          <hr />

          <div className="bill-field">
            <p>الاجمالى</p>
            <p>{productInfo.prod.SPrice * quantity}
              {' '}
               د.ل
            </p>
          </div>

        </div>
      </div>
    </>
  )
}