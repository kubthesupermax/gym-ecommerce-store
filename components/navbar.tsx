"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/components/cart-provider"
import { useAuth } from "@/components/auth-provider"
import { Dumbbell, Menu, Search, ShoppingCart, User, X } from "lucide-react"
import CartDrawer from "@/components/cart-drawer"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { cart } = useCart()
  const { user, logout } = useAuth()
  const isMobile = useMobile()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Categories", href: "/categories" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-200",
          isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-background",
        )}
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 font-bold">
              <Dumbbell className="h-6 w-6" />
              <span className="hidden sm:inline-block">FitGear</span>
            </Link>

            <nav className="hidden md:flex md:gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === link.href ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>

            <Button variant="ghost" size="icon" className="relative" onClick={() => setIsCartOpen(true)}>
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {totalItems}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                    <span className="sr-only">User menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile/orders">Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
                <Link href="/login">Login</Link>
              </Button>
            )}

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80%] sm:w-[350px]">
                <div className="flex h-full flex-col">
                  <div className="flex items-center justify-between">
                    <Link
                      href="/"
                      className="flex items-center gap-2 font-bold"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Dumbbell className="h-6 w-6" />
                      <span>FitGear</span>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="mt-8 flex-1">
                    <nav className="flex flex-col space-y-4">
                      {navLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={cn(
                            "flex py-2 text-base font-medium transition-colors hover:text-primary",
                            pathname === link.href ? "text-primary" : "text-muted-foreground",
                          )}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </nav>

                    <div className="mt-8 space-y-4">
                      {!user ? (
                        <div className="flex flex-col gap-2">
                          <Button asChild className="w-full">
                            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                              Login
                            </Link>
                          </Button>
                          <Button variant="outline" asChild className="w-full">
                            <Link href="/login?tab=register" onClick={() => setIsMobileMenuOpen(false)}>
                              Register
                            </Link>
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <p className="font-medium">Hello, {user.name}</p>
                          <div className="flex flex-col gap-2">
                            <Button variant="outline" asChild className="w-full justify-start">
                              <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                                <User className="mr-2 h-4 w-4" />
                                My Profile
                              </Link>
                            </Button>
                            <Button variant="outline" asChild className="w-full justify-start">
                              <Link href="/cart" onClick={() => setIsMobileMenuOpen(false)}>
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                My Cart
                              </Link>
                            </Button>
                            <Button
                              variant="destructive"
                              className="w-full"
                              onClick={() => {
                                handleLogout()
                                setIsMobileMenuOpen(false)
                              }}
                            >
                              Logout
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-auto pt-4">
                    <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} FitGear</p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}

