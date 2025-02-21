"use client"

import React, { createContext, useState, useContext, useEffect } from 'react'

type FavoritesContextType = {
  favorites: string[]
  toggleFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites')
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
  }, [])

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(id)
          ? prev.filter(fav => fav !== id)
          : [...prev, id]
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
      return newFavorites
    })
  }

  const isFavorite = (id: string) => favorites.includes(id)

  return (
      <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
        {children}
      </FavoritesContext.Provider>
  )
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}

