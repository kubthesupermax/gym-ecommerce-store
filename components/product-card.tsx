"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/components/cart-provider"
import type { Product } from "@/lib/types"
import { Eye, Heart, ShoppingCart } from "lucide-react"
import { motion } from "framer-motion"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [isHovered, setIsHovered] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    addToCart({ ...product, quantity: 1 })
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="group relative overflow-hidden rounded-lg border bg-background"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg?height=400&width=400"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />

          {isHovered && (
            <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <Button size="icon" variant="secondary" className="h-9 w-9 rounded-full">
                <Eye className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="secondary" className="h-9 w-9 rounded-full">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          )}

          {product.isNew && (
            <span className="absolute left-2 top-2 rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
              New
            </span>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-medium">{product.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{product.category}</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="font-bold">${product.price.toFixed(2)}</span>
            <Button size="sm" variant="ghost" className="h-8 w-8 rounded-full p-0" onClick={handleAddToCart}>
              <ShoppingCart className="h-4 w-4" />
              <span className="sr-only">Add to cart</span>
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

