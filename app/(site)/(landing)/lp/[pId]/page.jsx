"use client"

import { ProductProvider } from "@/context/Product.context";
import LPWrapper from "../_components/LPWrapper";
import { InputsProvider } from "@/context/Inputs.context";
import { CartProvider } from "@/context/Cart.context";
import { useEffect } from "react";
import { WebsiteConfProvider } from "@/context/WebsiteConf";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";



export default function Page({ params }) {

  const { pId } = params

  useEffect(() => {
    localStorage.setItem("pId", pId)
  }, [pId])

  return (
    <ProductProvider>
      <InputsProvider>
        <CartProvider>
          <WebsiteConfProvider>
            <GoogleReCaptchaProvider
              reCaptchaKey={"6LceJOwfAAAAAMk6vxOejKtnVob_eChw0XcYuaWN"}
              scriptProps={{
                async: false, // optional, default to false,
                defer: true, // optional, default to false
                appendTo: "body", // optional, default to "head", can be "head" or "body",
                nonce: undefined,
              }}>
              <LPWrapper />
            </GoogleReCaptchaProvider>
          </WebsiteConfProvider>
        </CartProvider>
      </InputsProvider>
    </ProductProvider>
  )
}