"use client"

import { useState } from "react"
import { products } from "@/lib/products"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import { Filter, X } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([0, 500])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("featured")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const categories = ["weights", "cardio", "accessories", "clothing"]

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const filteredProducts = products
    .filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])
    .filter((product) => selectedCategories.length === 0 || selectedCategories.includes(product.category))
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price
      if (sortBy === "price-high") return b.price - a.price
      if (sortBy === "newest") return new Date(b.date).getTime() - new Date(a.date).getTime()
      return 0 // featured
    })

  const resetFilters = () => {
    setSearchQuery("")
    setPriceRange([0, 500])
    setSelectedCategories([])
    setSortBy("featured")
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const FiltersContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-medium">Search</h3>
        <Input placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-medium">Price Range</h3>
        <Slider
          defaultValue={[0, 500]}
          max={500}
          step={10}
          value={priceRange}
          onValueChange={setPriceRange}
          className="mb-2"
        />
        <div className="flex items-center justify-between">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-medium">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`mobile-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => handleCategoryChange(category)}
              />
              <Label htmlFor={`mobile-${category}`} className="capitalize">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Button variant="outline" onClick={resetFilters} className="w-full">
        Reset Filters
      </Button>
    </div>
  )

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold">All Products</h1>

      {/* Mobile Filter Button */}
      <div className="mb-4 flex items-center justify-between md:hidden">
        <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[85%] sm:w-[350px]">
            <SheetHeader className="mb-5">
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <FiltersContent />
          </SheetContent>
        </Sheet>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-[250px_1fr]">
        {/* Desktop Filters Sidebar */}
        <div className="hidden space-y-6 rounded-lg border p-4 md:block">
          <FiltersContent />
        </div>

        {/* Products Grid */}
        <div>
          <div className="mb-6 hidden items-center justify-between md:flex">
            <p className="text-muted-foreground">Showing {filteredProducts.length} products</p>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Active Filters (Mobile) */}
          {(selectedCategories.length > 0 || searchQuery || priceRange[0] > 0 || priceRange[1] < 500) && (
            <div className="mb-4 flex flex-wrap items-center gap-2 md:hidden">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {selectedCategories.map((category) => (
                <Button
                  key={category}
                  variant="secondary"
                  size="sm"
                  className="h-7 gap-1 text-xs"
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                  <X className="h-3 w-3" />
                </Button>
              ))}
              {(priceRange[0] > 0 || priceRange[1] < 500) && (
                <Button
                  variant="secondary"
                  size="sm"
                  className="h-7 gap-1 text-xs"
                  onClick={() => setPriceRange([0, 500])}
                >
                  ${priceRange[0]}-${priceRange[1]}
                  <X className="h-3 w-3" />
                </Button>
              )}
              {searchQuery && (
                <Button variant="secondary" size="sm" className="h-7 gap-1 text-xs" onClick={() => setSearchQuery("")}>
                  "{searchQuery}"
                  <X className="h-3 w-3" />
                </Button>
              )}
              <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={resetFilters}>
                Clear all
              </Button>
            </div>
          )}

          <motion.div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <motion.div key={product.id} variants={item}>
                  <ProductCard product={product} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center">
                <p className="text-lg text-muted-foreground">No products found. Try adjusting your filters.</p>
                <Button variant="outline" onClick={resetFilters} className="mt-4">
                  Reset Filters
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

