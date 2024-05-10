import { Cairo } from "next/font/google";
import "./globals.scss"
import axios from "axios";
import { axiosInstance } from "@/shared/http-interceptor";


const cairo = Cairo({ subsets: ["latin"] });

export async function generateMetadata() {
  // read route params
  
  // Fetch user data and parse as JSON

  const metadata = await axiosInstance("shop/shopMetadata").then(res=>  res.data)
  
  return {
    title: metadata.title || "Ezone", 
    description: metadata.description || "", 
    icons: {
      icon: "https://ik.imagekit.io/a01bjbmceb/FavIcon/" + metadata.shopIcon
    }
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body className={cairo.className}>{children}</body>
    </html>
  );
}
