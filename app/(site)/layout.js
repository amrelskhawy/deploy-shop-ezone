import { Cairo } from "next/font/google";
import "./globals.scss"
import axios from "axios";


const cairo = Cairo({ subsets: ["latin"] });

export async function generateMetadata() {
  // read route params
  
  // Fetch user data and parse as JSON

  const metadata = await axios.get("https://data-test.ezone.ly/api/shop/shopMetadata", {
    headers: {"sid": 6}}).then(res=>  res.data)
  
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
