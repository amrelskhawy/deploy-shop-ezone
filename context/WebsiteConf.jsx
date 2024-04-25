import { axiosInstance } from "@/shared/http-interceptor";
import { createContext, useContext, useEffect, useState } from "react";
import { ProductContext } from "./Product.context";

export const WebsiteConfContext = createContext({})


export const WebsiteConfProvider = ({ children }) => {

  const [landingPage, setLandingPage] = useState({})
  const [shopInfo, setShopInfo] = useState({})
  const [shopSettings, setShopSettings] = useState({})
  const { productID } = useContext(ProductContext)

  // Get Landing Page Configration
  const getLandingPageConfigration = async () => {

    if ( productID ) {
      try {
        const res = await axiosInstance(`LandingPage/getpageConfig/${productID}`).then(res => {
          if (res.status === 200 ) {
            setLandingPage(res.data)
          }
        })

        if (!res) {
        }
      } catch (error) {
        console.error('Error fetching Product data:', error);
      }
    }
    
  }

  const getShopInfo = async () => {
    const shopInfo = await axiosInstance(`shopSettings/getShopBasicInfo`)

    const shopSettings = await axiosInstance(`shopSettings/getShopSettings`)
    
    setShopSettings(shopSettings.data);
    setShopInfo(shopInfo.data);
  }
  

  useEffect(() => {
    getShopInfo()
    getLandingPageConfigration()
  }, [productID]);
  


  const value = { landingPage, shopInfo, shopSettings }

  return <WebsiteConfContext.Provider value={value} >
    {children}
  </WebsiteConfContext.Provider>

}