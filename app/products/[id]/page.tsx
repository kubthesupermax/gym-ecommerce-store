"use client"

import { useState } from "react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/components/cart-provider"
import { products } from "@/lib/products"
import { Minus, Plus, ShoppingCart, Star } from "lucide-react"
import { motion } from "framer-motion"

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  const product = products.find((p) => p.id === params.id)

  if (!product) {
    return (
      <div className="container flex min-h-[50vh] flex-col items-center justify-center py-12">
        <h1 className="mb-4 text-2xl font-bold">Product not found</h1>
        <Button onClick={() => router.push("/products")}>Back to Products</Button>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity })
    toast({
      title: "Added to cart",
      description: `${product.name} (${quantity}) has been added to your cart.`,
    })
  }

  return (
    <div className="container py-12">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        {/* Product Images */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative aspect-square overflow-hidden rounded-lg bg-muted"
        >
          <Image
            src={product.image || "/placeholder.svg?height=600&width=600"}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </motion.div>

        {/* Product Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col"
        >
          <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>

          <div className="mb-4 flex items-center">
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>
            <span className="ml-2 text-muted-foreground">(24 reviews)</span>
          </div>

          <p className="mb-6 text-2xl font-bold">${product.price.toFixed(2)}</p>

          <p className="mb-6 text-muted-foreground">{product.description}</p>

          <div className="mb-6">
            <p className="mb-2 font-medium">Quantity</p>
            <div className="flex items-center">
              <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button size="lg" className="mb-6" onClick={handleAddToCart}>
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>

          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="py-4">
              <p>{product.description}</p>
              <p className="mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
              </p>
            </TabsContent>
            <TabsContent value="specifications" className="py-4">
              <ul className="space-y-2">
                <li>
                  <strong>Material:</strong> High-quality steel/rubber
                </li>
                <li>
                  <strong>Weight:</strong> {Math.floor(Math.random() * 20) + 5} kg
                </li>
                <li>
                  <strong>Dimensions:</strong> {Math.floor(Math.random() * 50) + 20} x{" "}
                  {Math.floor(Math.random() * 30) + 10} x {Math.floor(Math.random() * 20) + 5} cm
                </li>
                <li>
                  <strong>Warranty:</strong> 1 year
                </li>
              </ul>
            </TabsContent>
            <TabsContent value="reviews" className="py-4">
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="rounded-lg border p-4">
                    <div className="mb-2 flex items-center">
                      <div className="mr-2 h-10 w-10 overflow-hidden rounded-full bg-muted">
                        <Image
                          src={`/placeholder.svg?height=40&width=40&text=U${i}`}
                          alt="User"
                          width={40}
                          height={40}
                        />
                      </div>
                      <div>
                        <p className="font-medium">User {i}</p>
                        <div className="flex text-yellow-500">
                          {[...Array(5)].map((_, j) => (
                            <Star key={j} className="h-3 w-3 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Great product! Exactly as described and arrived quickly. Would definitely recommend.
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}

