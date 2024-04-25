"use client"

import { ProductProvider } from "@/context/Product.context";
import LPWrapper from "../components/LPWrapper";
import { InputsProvider } from "@/context/Inputs.context";
import { CartProvider } from "@/context/Cart.context";
import {  useEffect } from "react";
import { WebsiteConfProvider } from "@/context/WebsiteConf";



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
            <LPWrapper />
          </WebsiteConfProvider>
        </CartProvider>
      </InputsProvider>
    </ProductProvider>
  )
}