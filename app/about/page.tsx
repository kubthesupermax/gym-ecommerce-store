import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-4xl font-bold">About FitGear</h1>

        <div className="mb-12 overflow-hidden rounded-lg">
          <Image
            src="/placeholder.svg?height=600&width=1200&text=FitGear+Team"
            alt="FitGear Team"
            width={1200}
            height={600}
            className="w-full object-cover"
          />
        </div>

        <div className="mb-12 space-y-6 text-lg">
          <p>
            Founded in 2020, FitGear is dedicated to providing high-quality fitness equipment and accessories to help
            you achieve your fitness goals. We believe that everyone deserves access to premium fitness gear without
            breaking the bank.
          </p>

          <p>
            Our team consists of fitness enthusiasts, certified personal trainers, and industry experts who carefully
            select and test each product before it reaches our customers. We stand behind the quality of our products
            and offer a satisfaction guarantee on all purchases.
          </p>

          <p>
            At FitGear, we're not just selling fitness equipment – we're promoting a healthier lifestyle. Our mission is
            to make fitness accessible, enjoyable, and sustainable for everyone, regardless of their fitness level or
            experience.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Our Values</h2>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border p-6">
              <h3 className="mb-3 text-xl font-medium">Quality</h3>
              <p className="text-muted-foreground">
                We never compromise on quality. Every product we offer is built to last and designed to enhance your
                workout experience.
              </p>
            </div>

            <div className="rounded-lg border p-6">
              <h3 className="mb-3 text-xl font-medium">Accessibility</h3>
              <p className="text-muted-foreground">
                We believe fitness should be for everyone. We offer products at various price points without sacrificing
                quality.
              </p>
            </div>

            <div className="rounded-lg border p-6">
              <h3 className="mb-3 text-xl font-medium">Community</h3>
              <p className="text-muted-foreground">
                We're building a community of fitness enthusiasts who support and inspire each other on their fitness
                journeys.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Meet Our Team</h2>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {[
              { name: "Alex Johnson", role: "Founder & CEO" },
              { name: "Sarah Chen", role: "Product Specialist" },
              { name: "Marcus Lee", role: "Fitness Consultant" },
              { name: "Emma Rodriguez", role: "Customer Experience" },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-3 h-32 w-32 overflow-hidden rounded-full bg-muted">
                  <Image
                    src={`/placeholder.svg?height=128&width=128&text=${member.name.split(" ")[0]}`}
                    alt={member.name}
                    width={128}
                    height={128}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="font-medium">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg bg-muted p-8 text-center">
          <h2 className="mb-4 text-2xl font-bold">Join Our Community</h2>
          <p className="mb-6 text-muted-foreground">
            Discover our premium selection of fitness equipment and start your fitness journey today.
          </p>
          <Button size="lg" asChild>
            <Link href="/products">Shop Now</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

