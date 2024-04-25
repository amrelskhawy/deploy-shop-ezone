import "./Footer.scss"
import { MdPhone, MdMail } from "react-icons/md";
import PaymentMethods from "../../utils/PaymentMethods";
import { useContext, useState } from "react";
import { WebsiteConfContext } from "@/context/WebsiteConf";
import PrivacyPopup from "../PrivacyPopUp/PrivacyPopup";

export default function Footer() {

  const { shopInfo } = useContext(WebsiteConfContext)
  const  [ isOpen, setIsOpen ] = useState(false)

  const { Name, Mobile, Mobile2, Email, About, ReturnExP } = shopInfo

  const openPrivacyModal = () => {
    setIsOpen(true)
  }


  return (
    <>
      <footer className="" >
        <div className="container mx-auto">
          <div className="footer-top">
            <div className="footer-top__field">
              <h3 className="capitalize">{Name}</h3>
              <p>{About}</p>
            </div>

            <div className="footer-top__field">
              <h3 >تواصل معنا</h3>
              <div className="contact__field">
                <MdPhone />
                <a href={`tel:${Mobile}`}>{Mobile}</a>
              </div>
              <div className="contact__field">
                <MdPhone />
                <a href={`tel:${Mobile2}`}>{Mobile2}</a>
              </div>
              <div className="contact__field">
                <MdMail />
                <a href={`mailto:${Email}`}>{Email}</a>
              </div>
            </div>

            <div className="footer-top__field">
              <h3>طرق الدفع</h3>
              <div className="payment_methods">
                {
                  PaymentMethods.map(method => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={method.Logo} className="payment_methods_icon" src={"/PaymentMethods/" + method.Logo} alt={method.Method} />
                  ))
                }
              </div>
            </div>

          </div>
        </div>
        <div className="footer-bottom mt-12  border-t-1">
          <div className="footer-bottom__container">
            <h3>
              جميع الحقوق محفوظة © 2024
            </h3>
            <div className="footer-bottom__body">
              <p className="cursor-pointer" onClick={openPrivacyModal}>سياسية الإستبدال والإسترجاع</p>
              <a href="https://ezone.ly/" className="made__by">
                صنع بواسطة
                <p >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="w-6" src="/ezone.ico" alt="ezone logo" />
                </p>
                ايزون
              </a>
            </div>
          </div>
        </div>
      </footer >
      <PrivacyPopup content={ReturnExP} isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}