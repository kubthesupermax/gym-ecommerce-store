"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useCart } from "@/components/cart-provider"
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

interface CartDrawerProps {
  open: boolean
  onClose: () => void
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const router = useRouter()
  const { cart, updateQuantity, removeFromCart } = useCart()

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  const handleViewCart = () => {
    router.push("/cart")
    onClose()
  }

  const handleCheckout = () => {
    router.push("/checkout")
    onClose()
  }

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Your Cart ({cart.length})</SheetTitle>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center">
            <ShoppingBag className="mb-4 h-16 w-16 text-muted-foreground" />
            <h3 className="mb-2 text-xl font-medium">Your cart is empty</h3>
            <p className="mb-6 text-center text-muted-foreground">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Button
              onClick={() => {
                router.push("/products")
                onClose()
              }}
            >
              Browse Products
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 py-4">
              <AnimatePresence initial={false}>
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex gap-4 py-4">
                      <div className="relative h-20 w-20 overflow-hidden rounded-md bg-muted">
                        <Image
                          src={item.image || "/placeholder.svg?height=80&width=80"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between">
                          <div
                            className="font-medium hover:underline cursor-pointer"
                            onClick={() => {
                              router.push(`/products/${item.id}`)
                              onClose()
                            }}
                          >
                            {item.name}
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                        <div className="mt-2 flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          >
                            <Minus className="h-3 w-3" />
                            <span className="sr-only">Decrease quantity</span>
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                            <span className="sr-only">Increase quantity</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Separator />
                  </motion.div>
                ))}
              </AnimatePresence>
            </ScrollArea>

            <div className="space-y-4 pt-4">
              <div className="flex justify-between">
                <span className="font-medium">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <p className="text-xs text-muted-foreground">Shipping and taxes calculated at checkout</p>
              <div className="flex flex-col gap-2">
                <Button onClick={handleViewCart}>View Cart</Button>
                <Button variant="outline" onClick={handleCheckout}>
                  Checkout
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}

