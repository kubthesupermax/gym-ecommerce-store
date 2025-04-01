"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, ShoppingBag } from "lucide-react"
import { motion } from "framer-motion"

export default function CheckoutSuccessPage() {
  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center py-12">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="mb-6 rounded-full bg-green-100 p-3 text-green-600"
      >
        <CheckCircle className="h-12 w-12" />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <h1 className="mb-4 text-3xl font-bold">Order Successful!</h1>
        <p className="mb-8 max-w-md text-muted-foreground">
          Thank you for your purchase. Your order has been placed and will be processed shortly.
          You will receive an email confirmation with your order details.
        </p>
        
        <div className="mb-8 rounded-lg border p-6">
          <h2 className="mb-4 text-xl font-bold">Order #FG12345</h2>
          <p className="mb-2 text-muted-foreground">Date: {new Date().toLocaleDateString()}</p>
          <p className="text-muted-foreground">Estimated delivery: {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
        </div>
        
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button asChild>
            <Link href="/profile/orders">
              <ShoppingBag className="mr-2 h-4 w-4" />
              View Order
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>  asChild>
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
  </motion.div>
    </div>
  )
}

