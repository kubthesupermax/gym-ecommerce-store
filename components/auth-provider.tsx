"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface User {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => void
  register: (name: string, email: string, password: string) => void
  updateProfile: (data: Partial<User>) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  register: () => {},
  updateProfile: () => {},
  logout: () => {},
})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error)
      }
    }
  }, [])

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user))
    } else {
      localStorage.removeItem("user")
    }
  }, [user])

  const login = (email: string, password: string) => {
    // In a real app, this would make an API call to authenticate
    // For demo purposes, we'll just create a mock user
    setUser({
      id: "user1",
      name: "John Doe",
      email,
      phone: "555-123-4567",
      address: "123 Main St, Anytown, USA",
    })
  }

  const register = (name: string, email: string, password: string) => {
    // In a real app, this would make an API call to register
    // For demo purposes, we'll just create a mock user
    setUser({
      id: "user1",
      name,
      email,
    })
  }

  const updateProfile = (data: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : null))
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        updateProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

