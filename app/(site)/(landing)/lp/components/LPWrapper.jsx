/* eslint-disable @next/next/no-img-element */
'use client'

import { Product } from "@/app/(site)/(landing)/lp/components/Product/Product";
import { OrderDetails } from "@/app/(site)/(landing)/lp/components/OrderDetails/OrderDetails";
import { Button } from "@nextui-org/react";
import "./lp.styles.scss"
import { axiosInstance } from "@/shared/http-interceptor";
import { useContext, useEffect, useState } from "react";
import { WebsiteConfContext } from "@/context/WebsiteConf";
import { Toaster } from "react-hot-toast";
import Loading from "@/components/Loading";
import { CartContext } from "@/context/Cart.context";
import CustomerOrders from "./CutomersOrders/CustomerOrders";
import Footer from "./Footer/Footer";
import { ProductContext } from "@/context/Product.context";
import LPImage from "./LPImage/LPImage";

export default function LPWrapper() {

  const { landingPage, shopSettings } = useContext(WebsiteConfContext)
  const { cart } = useContext(CartContext)
  const { productInfo } = useContext(ProductContext)
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [orders, setOrders] = useState({})

  const { prodLPImages } = productInfo
  // Function to get the Orders of Customers
  const getCustomerOrders = async (first = 0) => {
    const cartId = cart.CartLink;
    if (cartId) {
      try {
        const res = await axiosInstance(`LandingPage/getCustomerLandingOrders?link=${cartId}&first=${first}`)
          .then(res => {
            console.log(res.data);
            setOrders(res.data)
            if (orders) {
              setIsOpen(true)
            }
          });
      } catch (error) { }
    }
    return '';
  };

  const showCustomerOrder = () => {
    getCustomerOrders(0)
  }


  useEffect(() => {
    // Check if the landing page data is available and set loading accordingly
    setLoading(!landingPage || Object.keys(landingPage).length === 0);
  }, [landingPage]); // React to changes in landingPage

  if (!landingPage || loading || Object.keys(landingPage).length === 0) {
    return <Loading />
  }


  const { TopBanner,
    OrderForm,
    LandingPage,
    IsFreeDelivery,
    IsHeaderVisible,
    IsFooterVisible
  } = landingPage


  return (
    <div className="lp" >
      <p style={{
        backgroundColor: TopBanner.Background || "#eee",
        color: TopBanner.TextColor || "#000",
      }} className="lp__title">
        {TopBanner.Text}
      </p>


      {
        // Check if the header is visible 
        IsHeaderVisible &&
        <div className="lp__Logo relative">
          <img
            src={`https://ik.imagekit.io/a01bjbmceb/Logos/${shopSettings.Logo}`}
            className="logo__image "
            alt="Logo"
          />
        </div>}

      {/* The Product And Order */}
      <div style={{
        backgroundColor: LandingPage.Background,
        color: LandingPage.TextColor,

      }} className="flex-1"  >
        <div className="container mt-8 lp-container mx-auto p-3">

          {/*  main Landing Order Div*/}
          <div className="product-container">

            {/*    First Component : Product*/}
            <div className="product">
              <Product />
            </div>
            {/*    Second Component : OrderDetails*/}
            <div className="order-details ">
              <OrderDetails FreeDelivery={IsFreeDelivery} Configration={OrderForm} />
            </div>
          </div>

        </div>
      </div>

      {

        (prodLPImages && prodLPImages.length >= 1)


        && <div className=" container mx-auto max-w-[1172px] px-12">

          <h3>المزيد من صور المنتج</h3>
          <div className="other-images grid   gap-3 relative">
            {
              prodLPImages.map(img => (
                <div
                  className="w-full h-full relative"
                  key={img.Id}>
                  <img
                    src={`https://ik.imagekit.io/a01bjbmceb/ProdsLandingP/${img.Src}`}
                    alt={img.Id}
                    className={'w-full h-full'}
                  />
                </div>
              ))
            }
          </div>
        </div>}

      {IsFooterVisible && <Footer />}

      <div className="orders__actions">
        <Button onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          })
        }} className="text-white bg-green-600" >
          أكد طلبك
        </Button>


        <Button onClick={showCustomerOrder} className="hover:bg-green-600 bg-white border hover:text-white">
          طلباتى
        </Button>

      </div>
      {orders && <CustomerOrders
        Orders={orders}
        Open={isOpen}
        cartLink={cart.CartLink}
        setIsOpen={setIsOpen}
      />}
      <Toaster />
    </div>
  )
}