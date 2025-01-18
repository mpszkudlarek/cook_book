"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { HelpCircle, Search, ChefHat, Utensils } from 'lucide-react'
import { FeaturedRecipes } from "@/components/featured-recipes"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from 'next/navigation'
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const popularCategories = [
  { name: 'Śniadania', icon: '🍳', filter: { type: 'śniadania' } },
  { name: 'Dania główne', icon: '🍝', filter: { type: 'danie główne' } },
  { name: 'Desery', icon: '🍰', filter: { type: 'deser' } },
  { name: 'Wegetariańskie', icon: '🥗', filter: { diet: 'wegetariańskie' } },
  { name: 'Szybkie dania', icon: '⏱️', filter: { time: '15' } },
]

const cookingTips = [
  "Zawsze czytaj cały przepis przed rozpoczęciem gotowania.",
  "Ostrz noże regularnie dla bezpieczeństwa i efektywności.",
  "Używaj termometru do mięsa, aby uzyskać idealne wyniki.",
  "Nie bój się eksperymentować z przyprawami i ziołami.",
]

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState<string>('')
  //const [dietFilter, setDietFilter] = useState<'all' | 'wegetariańskie' | 'ketogeniczna'>('all')
  //const [selectedCategory, setSelectedCategory] = useState<string>('Wszystkie')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const searchParams = new URLSearchParams()


    // Check for diet-related keywords in the search term
    const lowerSearchTerm = searchTerm.toLowerCase()
    if (lowerSearchTerm.includes('vege') ||
        lowerSearchTerm.includes('wegetariańska') ||
        lowerSearchTerm.includes('wegetariańskie')||
        lowerSearchTerm.includes('vegetariańskie') ||
        lowerSearchTerm.includes('vegeteriańska')) {
      searchParams.set('diet', 'wegetariańskie')
      const cleanedSearchTerm = searchTerm.replace(/\b(vege|wegetariańska|wegetariańskie|vegetariańskie|vegeteriańska)\b/gi, '').trim()
      if (cleanedSearchTerm) searchParams.set('search', cleanedSearchTerm)
    } else if (lowerSearchTerm.includes('ketogeniczna')) {
      searchParams.set('diet', 'ketogeniczna')
      const cleanedSearchTerm = searchTerm.replace(/\bketo\b/gi, '').trim()
      if (cleanedSearchTerm) searchParams.set('search', cleanedSearchTerm)
    } else if (lowerSearchTerm.includes('wegańskie') ||
        lowerSearchTerm.includes('wegańska') ||
        lowerSearchTerm.includes('vegan')) {
      searchParams.set('diet', 'wegańskie')
      const cleanedSearchTerm = searchTerm.replace(/\b(wegańskie|wegańska|vegan)\b/gi, '').trim()
      if (cleanedSearchTerm) searchParams.set('search', cleanedSearchTerm)
    } else if (lowerSearchTerm.includes('zupa') ||
        lowerSearchTerm.includes('zupy')) {
      searchParams.set('type', 'zupa')
      const cleanedSearchTerm = searchTerm.replace(/\b(zupa|zupy)\b/gi, '').trim()
      if (cleanedSearchTerm) searchParams.set('search', cleanedSearchTerm)
    } else if (lowerSearchTerm.includes('danie główne')) {
      searchParams.set('type', 'danie główne')
      const cleanedSearchTerm = searchTerm.replace(/\b(danie główne)\b/gi, '').trim()
      if (cleanedSearchTerm) searchParams.set('search', cleanedSearchTerm)
    } else if (lowerSearchTerm.includes('deser')) {
      searchParams.set('type', 'deser')
      const cleanedSearchTerm = searchTerm.replace(/\b(deser)\b/gi, '').trim()
      if (cleanedSearchTerm) searchParams.set('search', cleanedSearchTerm)
    } else if (lowerSearchTerm.includes('napój') || lowerSearchTerm.includes('napoje')) {
      searchParams.set('type', 'napój')
      const cleanedSearchTerm = searchTerm.replace(/\b(napój|napoje)\b/gi, '').trim()
      if (cleanedSearchTerm) searchParams.set('search', cleanedSearchTerm)
    } else if (lowerSearchTerm.includes('sniadania')) {
      searchParams.set('type', 'sniadania')
      const cleanedSearchTerm = searchTerm.replace(/\b(sniadania)\b/gi, '').trim()
      if (cleanedSearchTerm) searchParams.set('search', cleanedSearchTerm)
    } else if (lowerSearchTerm.includes('wołowina')) {
      searchParams.set('meat', 'wołowina')
      const cleanedSearchTerm = searchTerm.replace(/\b(wołowina)\b/gi, '').trim()
      if (cleanedSearchTerm) searchParams.set('search', cleanedSearchTerm)
    } else {
      if (searchTerm) searchParams.set('search', searchTerm)
    }

    router.push(`/results?${searchParams.toString()}`)
  }

  return (
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="relative bg-[url('/images/cookbook.jpg?height=400&width=1200')] bg-cover bg-center py-24">
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative container mx-auto text-center text-white animate-fade-in">
            <h1 className="text-5xl font-bold mb-4">Odkryj kulinarne inspiracje</h1>
            <p className="text-xl mb-8">Znajdź swój idealny przepis spośród tysięcy pysznych opcji</p>
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex gap-2">
              <Input
                  type="search"
                  placeholder="Szukaj przepisu..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-grow input-primary transition-all duration-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 hover:shadow-md text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400"
              />
              <Button type="submit" className="btn-primary transition-all duration-300 hover:bg-green-600 hover:scale-105 active:scale-95">
                <Search className="w-5 h-5 mr-2" />
                Szukaj
              </Button>
            </form>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto py-12 space-y-12">
          {/* Popular Categories */}
          <section className="animate-slide-up">
            <h2 className="text-3xl font-bold mb-6 text-green-700 dark:text-green-300">Popularne kategorie</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {popularCategories.map((category, index) => (
                  <Button
                      key={index}
                      variant="outline"
                      className={`
                  h-auto py-4 flex flex-col items-center justify-center
                  text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800
                  hover:bg-white hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-300
                  transition-all duration-300 ease-in-out
                  hover:scale-105 hover:shadow-lg dark:hover:shadow-green-700/30
                `}
                      onClick={() => {
                        const searchParams = new URLSearchParams();
                        Object.entries(category.filter).forEach(([key, value]) => {
                          searchParams.set(key, value);
                        });
                        router.push(`/results?${searchParams.toString()}`);
                      }}
                  >
                    <span className="text-3xl mb-2">{category.icon}</span>
                    <span>{category.name}</span>
                  </Button>
              ))}
            </div>
          </section>

          {/* Featured Recipes */}
          <section className="animate-slide-up">
            <h2 className="text-3xl font-bold mb-6 text-green-700 dark:text-green-300">Polecane przepisy</h2>
            <FeaturedRecipes />
          </section>

          {/* Cooking Tips */}
          <section className="animate-slide-up">
            <h2 className="text-3xl font-bold mb-6 text-green-700 dark:text-green-300">Porady kulinarne</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {cookingTips.map((tip, index) => (
                  <Card key={index} className="bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6 flex items-start space-x-4">
                      {index % 2 === 0 ? (
                          <ChefHat className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0" />
                      ) : (
                          <Utensils className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0" />
                      )}
                      <p className="text-gray-700 dark:text-gray-300">{tip}</p>
                    </CardContent>
                  </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
  )
}

