import React, { createContext, useEffect, useState } from "react";
import { axiosInstance } from "@/shared/http-interceptor";


// Add a helper to extract categories from APIs
const extractAndAssign = (arr) => {
  const result = {};

  arr.forEach(({ CatName, ...rest }) => {

    if (!result[CatName]) {
      result[CatName] = [];
    }
    result[CatName].push(rest); // Push values to the corresponding array
  });

  return result;
}

// Add trigger to generate the Variant
function CheckIfAllVariantsSelected(obj) {
  let count = 0;
  for (let key in obj) {
    if (obj[key] !== "" && obj[key] !== null) { // Change || to &&
      count++;
    }
  }
  return count;
}



function getValueByIndex(obj, index) {
  // Convert object to array of entries
  const entries = Object.entries(obj);
  // Check if index is valid
  if (index >= 0 && index < entries.length) {
    // Return the value at the specified index
    return entries[index][1];
  }
  // Return undefined if index is out of bounds
  return undefined;
}

export const ProductContext = createContext({});

export const ProductProvider = ({ children }) => {
  const [productVars, setProductVars] = useState([]);
  const [selectedVars, setSelectedVars] = useState({});
  const [productInfo, setProductInfo] = useState({});
  const [productImgs, setProductImgs] = useState([]);
  const [productID, setProductID] = useState();
  const [generatedVariant, setgeneratedVariant] = useState({});


  const generateVariant = async () => {
    const selectedVariantNumber = Object.keys(selectedVars).length

    const cartLink = window.localStorage.getItem(
    window.location.hostname.split('.')[0] + "_LandingPageCart")

    if ( productID && CheckIfAllVariantsSelected(selectedVars) !== 0 && cartLink  )

    // Check if we selected all variants
    if (CheckIfAllVariantsSelected(selectedVars) === selectedVariantNumber) {

      try {
        const res = await axiosInstance(
        `ShopProducts/ProductSelectedVar?pId=${productID}&opt1=${getValueByIndex(selectedVars, 0)}&opt2=${getValueByIndex(selectedVars, 1)}&cartId=${cartLink}`
        ).then(res => {
          setgeneratedVariant(res.data)
        })
      } catch (error) {
        
      }
    }
  }

  useEffect(()=> {
    generateVariant()
  }, [CheckIfAllVariantsSelected(selectedVars)])

  useEffect(() => {
    const fetchProductData = async () => {

      if (productID) {
        try {
          // GET the Product Vars
          const prodOptionsVars = await axiosInstance.get(`ShopProducts/ProductVarOptions/${productID}`)
            .then(res => {
              const extractedCategories = extractAndAssign(res.data)

              // Set Selected Variants
              for (let key of Object.keys(extractedCategories)) {
                setSelectedVars(prev => ({
                  ...prev, [key]: null
                }))
              }
              setProductVars(extractedCategories)
            });

          // GET the productInfo
          const productInfoResponse = await axiosInstance.get(`LandingPage/ProductDetail/${productID}`)

          // GET the product Images
          const productImgsResponse = await axiosInstance.get(`ShopProducts/getProductImgs/${productID}`)
            .then(res => {
              setProductImgs(res.data)
            })

          setProductInfo(productInfoResponse.data);
        } catch (error) {
          console.error("Error fetching product data:", error);
        }
      }
    };

    // Function to handle updating the product ID
    const updateProductID = () => {
      const newProductID = window.localStorage.getItem("pId");
      setProductID(newProductID);

      fetchProductData();

    };

    updateProductID()

  }, [ productID]);

  return (
    <ProductContext.Provider value={{ productVars, productInfo, productImgs, selectedVars, setSelectedVars, generateVariant, generatedVariant, productID }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
