import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dumbbell, TrendingUp, ShoppingBag, Shirt, Award } from "lucide-react"

export default function CategoriesPage() {
  const categories = [
    {
      name: "Weights",
      icon: Dumbbell,
      slug: "weights",
      color: "bg-red-500",
      description: "Dumbbells, barbells, kettlebells, and weight plates for strength training.",
    },
    {
      name: "Cardio",
      icon: TrendingUp,
      slug: "cardio",
      color: "bg-blue-500",
      description: "Treadmills, exercise bikes, rowing machines, and other cardio equipment.",
    },
    {
      name: "Accessories",
      icon: ShoppingBag,
      slug: "accessories",
      color: "bg-green-500",
      description: "Yoga mats, resistance bands, foam rollers, and other fitness accessories.",
    },
    {
      name: "Clothing",
      icon: Shirt,
      slug: "clothing",
      color: "bg-purple-500",
      description: "Performance apparel, workout clothes, and athletic wear.",
    },
    {
      name: "Supplements",
      icon: Award,
      slug: "supplements",
      color: "bg-yellow-500",
      description: "Protein powders, pre-workouts, vitamins, and other nutritional supplements.",
    },
  ]

  return (
    <div className="container py-12">
      <h1 className="mb-8 text-3xl font-bold">Shop by Category</h1>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link key={category.slug} href={`/categories/${category.slug}`}>
            <Card className="h-full overflow-hidden transition-all duration-200 hover:shadow-md">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className={`mb-4 rounded-full p-4 ${category.color}`}>
                  <category.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-2 text-xl font-medium">{category.name}</h3>
                <p className="text-muted-foreground">{category.description}</p>
                <Button className="mt-4" variant="outline">
                  Browse {category.name}
                </Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

