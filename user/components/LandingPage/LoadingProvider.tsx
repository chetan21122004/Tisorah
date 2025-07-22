"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface LoadingContextType {
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  startLoading: () => void
  finishLoading: () => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export function useLoading() {
  const context = useContext(LoadingContext)
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return context
}

interface LoadingProviderProps {
  children: ReactNode
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(true)

  const startLoading = () => setIsLoading(true)
  const finishLoading = () => setIsLoading(false)

  // Simulate initial loading on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500) // Minimum loading time for better UX

    return () => clearTimeout(timer)
  }, [])

  const value = {
    isLoading,
    setIsLoading,
    startLoading,
    finishLoading,
  }

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  )
} 