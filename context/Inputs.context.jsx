import { createContext, useEffect, useState } from "react";
import { axiosInstance } from "@/shared/http-interceptor";

export const InputsContext = createContext({})


export const InputsProvider = ({ children }) => {
  const [inputs, setInputs] = useState([]);
  const [requiredInputs, setRequiredInputs] = useState([]);
  const [quantity, setQuantity] = useState(1)
  const [orderData, setOrderData] = useState([])

  const getAvailableInputs = async () => {
    try {
      const res = await axiosInstance.get("LandingPage/getFormConfig");

      const data = res.data['FormFieldConfigs'];
      const myInputsState = {}
      const myRequiredState = []

      data.forEach(element => {
        if (element['FieldName'] === "field130") {
          myInputsState[element['FieldName']] = false
        } else{
          myInputsState[element['FieldName']] = ''
        }

        if (element['IsRequired'] === true) {
          myRequiredState.push(element.FieldName)
        }
      });

      setOrderData(myInputsState)
      setRequiredInputs(myRequiredState)
      // Assuming data is an array of input configurations
      setInputs(data);
    } catch (error) {
      console.error('Error fetching Inputs data:', error);
    }
  }

  useEffect(() => {
    getAvailableInputs()
  }, []);


  const handleChange = (name, value, id) => {
    setOrderData(prev => (
      {...prev, [name]: value}
    ))
  }

  const onCheckboxChange = (name, value, id) => {
    
    setOrderData(prev => ({
      ...prev, [name]: value
    }))
  }

  const onQuantityChange = (action) => {
    if (action === 'increment') {
      setQuantity(prev => prev + 1); // Increment by 1
    } else {
      setQuantity(prev => (prev === 1 ? 1 : prev - 1)); // Decrement by 1, ensuring quantity doesn't go below 1
    }
  };
  

  const value = {
    inputs, orderData,
    setOrderData, handleChange,
    onCheckboxChange, requiredInputs,
    onQuantityChange, quantity
  }

  return <InputsContext.Provider value={value}>{children}</InputsContext.Provider>
};