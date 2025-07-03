import { Poppins } from "next/font/google";
import "./globals.css";

import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import { CartProvider } from "@/contexts/CartContext";
import Header from "@/components/Header";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  title: "Pixo Deals - Best Online Shopping Deals",
  description: "Shop the latest deals on electronics, fashion, and more at Pixo Deals. Fast shipping, secure checkout, and unbeatable prices.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Pixo Deals - Best Online Shopping Deals",
    description: "Shop the latest deals on electronics, fashion, and more at Pixo Deals.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    siteName: "Pixo Deals",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pixo Deals",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pixo Deals - Best Online Shopping Deals",
    description: "Shop the latest deals on electronics, fashion, and more at Pixo Deals.",
    site: "@yourtwitter",
    creator: "@yourtwitter",
    images: ["/og-image.png"],
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
};

export const viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com"} />
      </head>
      <body>
        <CartProvider>
        
            <Header/>
            <main className="min-h-screen">
            {children}
            </main>
            <Footer />
          
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />
        </CartProvider>
      </body>
    </html>
  );
} 