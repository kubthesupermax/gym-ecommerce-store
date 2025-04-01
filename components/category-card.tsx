import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface CategoryCardProps {
  category: {
    name: string
    icon: LucideIcon
    slug: string
    color: string
  }
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const { name, icon: Icon, slug, color } = category

  return (
    <Link href={`/categories/${slug}`}>
      <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
        <CardContent className="flex flex-col items-center p-6 text-center">
          <div className={`mb-4 rounded-full p-3 ${color}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <h3 className="font-medium">{name}</h3>
        </CardContent>
      </Card>
    </Link>
  )
}

