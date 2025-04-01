// import type React from "react"
// import { Inter } from "next/font/google"
// import { Toaster } from "@/components/ui/toaster"
// import { CartProvider } from "@/components/cart-provider"
// import { AuthProvider } from "@/components/auth-provider"
// import Navbar from "@/components/navbar"
// import Footer from "@/components/footer"
// import "./globals.css"

// const inter = Inter({ subsets: ["latin"] })

// export const metadata = {
//   title: "FitGear | Premium Gym & Sports Equipment",
//   description: "Shop the best gym and sports equipment for your fitness journey",
//     generator: 'v0.dev'
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <AuthProvider>
//           <CartProvider>
//             <div className="flex min-h-screen flex-col">
//               <Navbar />
//               <main className="flex-1">{children}</main>
//               <Footer />
//             </div>
//             <Toaster />
//           </CartProvider>
//         </AuthProvider>
//       </body>
//     </html>
//   )
// }

// import './globals.css'
import type React from "react";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/components/cart-provider";
import { AuthProvider } from "@/components/auth-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FitGear | Premium Gym & Sports Equipment",
  description:
    "Shop the best gym and sports equipment for your fitness journey",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <AuthProvider>
          <CartProvider>
            <div className="flex min-h-screen flex-col px-4 sm:px-6 lg:px-8">
              <Navbar />
              <main className="flex-1 max-w-7xl mx-auto w-full py-6 sm:px-6 lg:px-8">
                {children}
              </main>
              <Footer />
            </div>
            <Toaster />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
