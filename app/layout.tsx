import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Navbar from "./components/nav/Navbar";
import Footer from "./components/footer/Footer";
import { Toaster } from "react-hot-toast";
import { CartContextProvider } from "@/providers/CartContextProvider";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "E-Shop",
  description: "E-commerce website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} text-slate-700`}>
        <CartContextProvider>
          <Toaster />
          <div className="flex flex-col">
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </div>
        </CartContextProvider>
      </body>
    </html>
  );
}
//TODO:
//Full height screen drawbacks
//Fix available quantity
//Decouple cart from product
//Decouple product details
//Use local storage to store nbr of products and total price
//Fix border
//Table responsive
