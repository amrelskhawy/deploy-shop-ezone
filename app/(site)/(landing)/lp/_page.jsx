"use client"

import { ProductProvider } from "@/context/Product.context";
import LPWrapper from "./components/LPWrapper";
import { InputsProvider } from "@/context/Inputs.context";
import { CartProvider } from "@/context/Cart.context";


export default function Page() {
  return (
      <ProductProvider>
        <InputsProvider>
          <CartProvider>
            <LPWrapper />
          </CartProvider>
        </InputsProvider>
      </ProductProvider>
  );
}
