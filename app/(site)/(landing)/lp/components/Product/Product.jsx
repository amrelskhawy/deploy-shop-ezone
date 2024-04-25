"use client"
import { FaRegStar } from "react-icons/fa";
import { Tooltip } from "@nextui-org/react";
import "./Product.scss"
import parse from 'html-react-parser';
import { useContext } from "react";
import { ProductContext } from "@/context/Product.context";
import LPImage from "../LPImage/LPImage";


export function Product() {

  const {selectedVars, setSelectedVars , productInfo, productVars, productImgs } = useContext(ProductContext)

  const { prod, prodLPImages } = productInfo


  const checkIfSelected = (name, value) => {
    return selectedVars[name] === value
  }



  if (!prod) {
    return <div>Loading...</div>; // Or some loading indicator
  }

  return (
    <>
      <div className="product-info">
        {/* Title and Rating */}
        <div className={'product-info__details'}>
          <h3 className="product-info__title">
            {prod.Name}
          </h3>
          <div className={'rating'}>
            {
              [1, 2, 3, 4, 5].map((star) => (
                <span key={star}><FaRegStar /></span>
              ))
            }
            <p>التقييمات (0) | كتابة تعليق</p>
          </div>
        </div>

        {/* Price and Discount Div */}
        <div className={'product__pricing'}>
          <span className="product__main-price">
            {prod.CAPrice} د.ل
          </span>
          <span className="product__after-discount">
            {prod.SPrice} د.ل
          </span>
        </div>

      </div>

      <hr />

      <div className="product-image">

        <div className="image-container mt-2">

          { prod.CoverImg ? 
            <LPImage
            src={`Prods/${prod.CoverImg}`}
            isZoomed={true}
            alt="Picture of the Product"
            priority={true}
          />
          : <p className="w-full h-40 flex justify-center items-center">لا توجد صورة للمنتج</p>
          }

          <div className="other-images flex w-full mb-5">

            {
              productImgs.map(img => {

                // Check if that is the coverImg
                const isCoverImage = `Prods/${img.Src}` !== `Prods/${prod.CoverImg}` 

                return isCoverImage && (
                <div className="w-full h-fit relative"
                  key={img.Id}>
                  <LPImage
                    key={img.Id}
                    src={`Prods/${img.Src}`}
                    alt={'other-img: ' + img.Id}
                    className={'w-16'}
                  />
                </div>
              )})
            }
          </div>
        </div>

        <div className="product-options">
          {Object.keys(productVars).map(variant => (
            <div key={variant} className="product-options__field">
              <p>{variant}</p>
              <div className="colors__container">
                {
                  productVars[variant].map(item => (
                    <Tooltip key={item.CatItemId} delay={100} content={item.ItemName}>
                      <span onClick={() => {
                        setSelectedVars(prev => (
                          { ...prev, [variant]: item.CatItemId }
                        ))
                      }} className={`
                      ${variant === 'ألوان غامقة' ? 'color' : 'opt'} ${checkIfSelected(variant, item.CatItemId) && "selected"} rounded-full`} style={{ backgroundColor: item.BColorHex }} >
                        {variant !== 'ألوان غامقة' && item.ItemName}
                      </span>
                    </Tooltip>
                  ))
                }
              </div>
            </div>
          ))}
        </div>


      </div>

      <div className="product-description">
        <p className="product-description__title">
          تفاصيل المنتج
        </p>

        <div className="product-description__body">
          {parse(prod.Description)}
        </div>

        {prodLPImages.length >= 1 && <div className="other-images">

          <h3>المزيد من صور المنتج</h3>
          <div className="other-images__container relative">
            {
              prodLPImages.map(img => (
                <div 
                className="other_img relative"
                key={img.Id}>
                  <LPImage
                    src={`ProdsLandingP/${img.Src}`}
                    alt={img.Id}
                    className={'w-fit h-28'}
                  />
                </div>
              ))
            }
          </div>
        </div>}

        
      </div>
    </>
  )
}