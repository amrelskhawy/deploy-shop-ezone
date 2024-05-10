import { createContext, useState, useEffect, useContext } from "react";
import { InputsContext } from "./Inputs.context";
import { ProductContext } from "./Product.context";
import { axiosInstance } from "@/shared/http-interceptor";

export const CartContext = createContext([])

export const CartProvider = ({ children }) => {

  const { orderData, setOrderData, quantity } = useContext(InputsContext)
  const { generatedVariant, productID } = useContext(ProductContext)
  const [loading, setLoading] = useState(false)


  const handleChangeVarItem = (name, value) => {
    setVarientItems((prev) => ({
      ...prev, [name]: value
    }))
  }

  const emptyCartId = '00000000-0000-0000-0000-000000000000';

  const [cart, setCart] = useState({
    CartLink: "", //localStorage.getItem(getCartName) || emptyCartId,
    CartInputs: [], // array of products
  })

  const getCartFromApi = async (CartLink) => {
    try {
      setLoading(true)
      const newCart = await axiosInstance(`LandingPage/getCart?link=${CartLink}`)
        .then(res => {
        setLoading(false)
        setCart(res.data);


        res.data['CartInputs'].map(el => {

          const relevantFields = ["CityId", "SubCityId", "PaymentMethod"];

          if (
            el.FieldName === "CityId"
            || el.FieldName === "SubCityId"
            || el.FieldName === "PaymentMethod"
          ) {
            setOrderData(prev => (
              {
                ...prev, [el.FieldName]: {
                  "id": el.FieldId,
                  "value": el.FieldValue
                }
              }
            ))
          }
          else {
            setOrderData(prev => (
              { ...prev, [el.FieldName]: el.FieldValue }
            ))
          }
        })
      });


    } catch (error) {
      console.log(error);
    }
  }

  const onCheckout = async () => {

    try {
      if (cart.CartLink && productID && generatedVariant && quantity) {
        const res = await axiosInstance.post(`LandingPage/checkout?link=${cart.CartLink}&pId=${productID}&vId=${generatedVariant.Id}&qty=${quantity}`, {})
      }
    } catch (error) {

    }
  }

  // to update specific input in Cart value
  const updateCartField = async (FieldId, PropertyName, PropertyValue) => {
    try {
      // Update cart field
      const response = await axiosInstance.post(`LandingPage/updateCartField?link=${cart.CartLink}`, {
        FieldId,
        PropertyName,
        PropertyValue
      });

      const backedData = await getCartFromApi(cart.CartLink)

    } catch (error) {
      console.error('Error updating cart field:', error);
    }
  };


  useEffect(() => {
    // Function to retrieve cartId from localStorage
    const getCartId = async () => {

      const cartName = window.location.hostname.split('.')[0] + "_LandingPageCart"

      const savedCartId = localStorage.getItem(cartName) || emptyCartId

      const response = await axiosInstance(`LandingPage/getCart?link=${savedCartId}`).then(res => {

        // Set local storage cartName
        localStorage.setItem(cartName, res.data.CartLink)

        // Set Cart Id in the state
        setCart(prev => ({
          ...prev,
          CartLink: res.data.CartLink
        }))
      })

      getCartFromApi(savedCartId)
    };

    // Get cartId from localStorage and set it in state
    getCartId()

  }, []);

  const value = { cart, setCart, onCheckout, handleChangeVarItem, updateCartField }

  return <CartContext.Provider value={value}>
    {children}
  </CartContext.Provider>
}