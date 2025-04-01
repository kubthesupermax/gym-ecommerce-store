"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/components/cart-provider"
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function CartPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart()
  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 10
  const total = subtotal + shipping - discount

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "fitgear10") {
      const discountAmount = subtotal * 0.1
      setDiscount(discountAmount)
      toast({
        title: "Promo code applied",
        description: "10% discount has been applied to your order.",
      })
    } else {
      toast({
        title: "Invalid promo code",
        description: "Please enter a valid promo code.",
        variant: "destructive",
      })
    }
  }

  const handleCheckout = () => {
    toast({
      title: "Order placed!",
      description: "Your order has been successfully placed.",
    })
    clearCart()
    router.push("/checkout/success")
  }

  if (cart.length === 0) {
    return (
      <div className="container flex min-h-[50vh] flex-col items-center justify-center py-12">
        <h1 className="mb-4 text-2xl font-bold">Your cart is empty</h1>
        <p className="mb-8 text-muted-foreground">Add some products to your cart to continue shopping.</p>
        <Button asChild>
          <Link href="/products">Browse Products</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <h1 className="mb-8 text-3xl font-bold">Your Cart</h1>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-lg border">
            <div className="hidden grid-cols-5 gap-4 p-4 font-medium text-muted-foreground md:grid">
              <div className="col-span-2">Product</div>
              <div className="text-center">Price</div>
              <div className="text-center">Quantity</div>
              <div className="text-right">Total</div>
            </div>

            <Separator />

            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-5 md:items-center">
                    <div className="col-span-1 flex items-center gap-4 md:col-span-2">
                      <div className="relative h-16 w-16 overflow-hidden rounded bg-muted">
                        <Image
                          src={item.image || "/placeholder.svg?height=64&width=64"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 text-muted-foreground hover:text-destructive"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="mr-1 h-3 w-3" />
                          Remove
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:block md:text-center">
                      <span className="font-medium md:hidden">Price:</span>
                      <span>${item.price.toFixed(2)}</span>
                    </div>

                    <div className="flex items-center justify-between md:justify-center">
                      <span className="font-medium md:hidden">Quantity:</span>
                      <div className="flex items-center">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-10 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:block md:text-right">
                      <span className="font-medium md:hidden">Total:</span>
                      <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                  <Separator />
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="flex flex-col gap-2 p-4 sm:flex-row sm:justify-between">
              <Button variant="outline" asChild>
                <Link href="/products" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Continue Shopping
                </Link>
              </Button>
              <Button variant="outline" onClick={clearCart}>
                Clear Cart
              </Button>
            </div>
          </div>
        </div>

        <div>
          <div className="rounded-lg border p-6">
            <h2 className="mb-4 text-xl font-bold">Order Summary</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Discount</span>
                  <span className="text-green-600">-${discount.toFixed(2)}</span>
                </div>
              )}

              <Separator />

              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <div className="flex gap-2">
                <Input placeholder="Promo code" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
                <Button variant="outline" onClick={handleApplyPromo}>
                  Apply
                </Button>
              </div>

              <Button className="w-full" size="lg" onClick={handleCheckout}>
                Checkout
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                Shipping calculated at checkout. Taxes may apply.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

