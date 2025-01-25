"use client"

import { useState, useCallback, useEffect } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Heart,
  Clock,
  Users,
  X,
  Search,
  SortAsc,
  Beef,
  Leaf,
  UtensilsCrossed,
  Timer,
  UsersIcon,
  AlertTriangle,
  ChevronDown,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getAllRecipes, type Recipe } from "@/lib/recipes"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { useFavorites } from "@/contexts/FavoritesContext"

type SortOption = "all" | "newest" | "likes" | "time-asc" | "time-desc" | "servings-asc" | "servings-desc"
type MeatFilter = "all" | "drób" | "wołowina" | "wieprzowina" | "owoce morza" | "none"
type DietFilter = "all" | "wegańskie" | "wegetariańskie" | "ketogeniczna" | "none"
type TypeFilter = "all" | "zupa" | "danie główne" | "deser" | "napój" | "śniadania"
type TimeFilter = "all" | "15" | "30" | "60" | "60+"
type ServingsFilter = "all" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "więcej"
type AllergenFilter = "all" | "gluten" | "orzechy" | "laktoza" | "jaja" | "soja" | "ryby" | "skorupiaki"

export default function ResultsPage() {
  const [recipes, setRecipes] = useState<Recipe[]>(() => getAllRecipes())
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [sortBy, setSortBy] = useState<SortOption>("all")
  const [meatFilter, setMeatFilter] = useState<MeatFilter>("all")
  const [dietFilter, setDietFilter] = useState<DietFilter>("all")
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all")
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("all")
  const [servingsFilter, setServingsFilter] = useState<ServingsFilter>("all")
  const [allergenFilter, setAllergenFilter] = useState<AllergenFilter>("all")
  const [excludedIngredients, setExcludedIngredients] = useState<string[]>([])
  const [newExcludedIngredient, setNewExcludedIngredient] = useState<string>("")
  const [includedIngredients, setIncludedIngredients] = useState<string[]>([])
  const [newIncludedIngredient, setNewIncludedIngredient] = useState<string>("")

  const searchParams = useSearchParams()
  const router = useRouter()
  const { favorites, toggleFavorite, isFavorite } = useFavorites()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const typeParam = params.get("type")
    const dietParam = params.get("diet")
    const timeParam = params.get("time")
    const searchParam = params.get("search")
    const excludedParam = params.get("excluded")
    const includedParam = params.get("included")

    if (typeParam) setTypeFilter(typeParam as TypeFilter)
    if (dietParam) setDietFilter(dietParam as DietFilter)
    if (timeParam) setTimeFilter(timeParam as TimeFilter)
    if (searchParam) setSearchTerm(searchParam)
    if (excludedParam) setExcludedIngredients(excludedParam.split(","))
    if (includedParam) setIncludedIngredients(includedParam.split(","))

    const allRecipes = getAllRecipes()
    setRecipes(allRecipes)
  }, [])

  const applyFilters = useCallback(() => {
    const filteredRecipes = recipes.filter(
        (recipe) =>
            (recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                recipe.ingredients.some((ingredient) => ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()))) &&
            (meatFilter === "all" || recipe.meat === meatFilter) &&
            (dietFilter === "all" || recipe.diet === dietFilter) &&
            (typeFilter === "all" || recipe.type === typeFilter) &&
            (timeFilter === "all" ||
                (timeFilter === "15" && recipe.cookingTime <= 15) ||
                (timeFilter === "30" && recipe.cookingTime <= 30) ||
                (timeFilter === "60" && recipe.cookingTime <= 60) ||
                (timeFilter === "60+" && recipe.cookingTime > 60)) &&
            (servingsFilter === "all" ||
                (servingsFilter === "więcej" && recipe.servings > 8) ||
                recipe.servings === Number.parseInt(servingsFilter)) &&
            (allergenFilter === "all" || (recipe.allergens && !recipe.allergens.includes(allergenFilter))) &&
            !recipe.ingredients.some((ingredient) =>
                excludedIngredients.some((excluded) => ingredient.name.toLowerCase().includes(excluded.toLowerCase())),
            ) &&
            (includedIngredients.length === 0 ||
                includedIngredients.every((included) =>
                    recipe.ingredients.some((ingredient) => ingredient.name.toLowerCase().includes(included.toLowerCase())),
                )),
    )

    switch (sortBy) {
      case "newest":
        filteredRecipes.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
        break
      case "likes":
        filteredRecipes.sort((a, b) => b.likes - a.likes)
        break
      case "time-asc":
        filteredRecipes.sort((a, b) => a.cookingTime - b.cookingTime)
        break
      case "time-desc":
        filteredRecipes.sort((a, b) => b.cookingTime - a.cookingTime)
        break
      case "servings-asc":
        filteredRecipes.sort((a, b) => a.servings - b.servings)
        break
      case "servings-desc":
        filteredRecipes.sort((a, b) => b.servings - a.servings)
        break
    }

    return filteredRecipes
  }, [
    recipes,
    searchTerm,
    sortBy,
    meatFilter,
    dietFilter,
    typeFilter,
    timeFilter,
    servingsFilter,
    allergenFilter,
    excludedIngredients,
    includedIngredients,
  ])

  const filteredAndSortedRecipes = applyFilters()

  const updateSearchParams = useCallback(() => {
    const params = new URLSearchParams()
    if (searchTerm) params.set("search", searchTerm)
    if (sortBy !== "all") params.set("sort", sortBy)
    if (meatFilter !== "all") params.set("meat", meatFilter)
    if (dietFilter !== "all") params.set("diet", dietFilter)
    if (typeFilter !== "all") params.set("type", typeFilter)
    if (timeFilter !== "all") params.set("time", timeFilter)
    if (servingsFilter !== "all") params.set("servings", servingsFilter)
    if (allergenFilter !== "all") params.set("allergen", allergenFilter)
    if (excludedIngredients.length > 0) params.set("excluded", excludedIngredients.join(","))
    if (includedIngredients.length > 0) params.set("included", includedIngredients.join(","))
    const newUrl = `${window.location.pathname}?${params.toString()}`
    router.push(newUrl, { scroll: false })
  }, [
    searchTerm,
    sortBy,
    meatFilter,
    dietFilter,
    typeFilter,
    timeFilter,
    servingsFilter,
    allergenFilter,
    excludedIngredients,
    includedIngredients,
    router,
  ])

  useEffect(() => {
    updateSearchParams()
  }, [
    searchTerm,
    sortBy,
    meatFilter,
    dietFilter,
    typeFilter,
    timeFilter,
    servingsFilter,
    allergenFilter,
    excludedIngredients,
    includedIngredients,
    updateSearchParams,
  ])

  const addExcludedIngredient = () => {
    if (newExcludedIngredient && !excludedIngredients.includes(newExcludedIngredient)) {
      setExcludedIngredients([...excludedIngredients, newExcludedIngredient])
      setNewExcludedIngredient("")
    }
  }

  const removeExcludedIngredient = (ingredient: string) => {
    setExcludedIngredients(excludedIngredients.filter((item) => item !== ingredient))
  }

  const addIncludedIngredient = () => {
    if (newIncludedIngredient && !includedIngredients.includes(newIncludedIngredient)) {
      setIncludedIngredients([...includedIngredients, newIncludedIngredient])
      setNewIncludedIngredient("")
    }
  }

  const removeIncludedIngredient = (ingredient: string) => {
    setIncludedIngredients(includedIngredients.filter((item) => item !== ingredient))
  }

  return (
      <div className="container mx-auto py-8">
        <div className="mb-8 flex items-center">
          <h1 className="text-3xl font-bold text-green-700 dark:text-green-300">Wszystkie przepisy</h1>
          <div className="relative ml-2 group transition-transform duration-300 ease-in-out hover:scale-110">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-green-600 dark:text-green-400 cursor-help transition-colors duration-300 group-hover:text-green-700 dark:group-hover:text-green-300"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <path d="M12 17h.01" />
            </svg>
            <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 p-2 bg-white dark:bg-gray-800 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Tutaj znajdziesz wszystkie przepisy dostępne w naszej bazie. Możesz je filtrować i sortować według swoich
                preferencji.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="col-span-full">
              <Label htmlFor="search" className="sr-only">
                Szukaj przepisu lub składnika
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                    id="search"
                    type="search"
                    placeholder="Szukaj przepisu lub składnika..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      updateSearchParams()
                    }}
                    className="pl-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-green-500 focus:ring-green-500"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="sort" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Sortuj według
              </Label>
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                <SelectTrigger
                    id="sort"
                    className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                >
                  <SortAsc className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Wybierz opcję" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Wszystkie</SelectItem>
                  <SelectItem value="newest">Najnowsze</SelectItem>
                  <SelectItem value="likes">Liczba polubień</SelectItem>
                  <SelectItem value="time-asc">Czas przygotowania (rosnąco)</SelectItem>
                  <SelectItem value="time-desc">Czas przygotowania (malejąco)</SelectItem>
                  <SelectItem value="servings-asc">Liczba porcji (rosnąco)</SelectItem>
                  <SelectItem value="servings-desc">Liczba porcji (malejąco)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="meat" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Mięso
              </Label>
              <Select value={meatFilter} onValueChange={(value) => setMeatFilter(value as MeatFilter)}>
                <SelectTrigger
                    id="meat"
                    className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                >
                  <Beef className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Wybierz opcję" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Wszystkie</SelectItem>
                  <SelectItem value="drób">Drób</SelectItem>
                  <SelectItem value="wołowina">Wołowina</SelectItem>
                  <SelectItem value="wieprzowina">Wieprzowina</SelectItem>
                  <SelectItem value="owoce morza">Owoce morza</SelectItem>
                  <SelectItem value="none">Brak</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="diet" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Dieta
              </Label>
              <Select value={dietFilter} onValueChange={(value) => setDietFilter(value as DietFilter)}>
                <SelectTrigger
                    id="diet"
                    className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                >
                  <Leaf className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Wybierz opcję" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Wszystkie</SelectItem>
                  <SelectItem value="wegańskie">Wegańskie</SelectItem>
                  <SelectItem value="wegetariańskie">Wegetariańskie</SelectItem>
                  <SelectItem value="ketogeniczna">Ketogeniczna</SelectItem>
                  <SelectItem value="none">Brak</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Typ dania
              </Label>
              <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as TypeFilter)}>
                <SelectTrigger
                    id="type"
                    className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                >
                  <UtensilsCrossed className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filtruj według typu" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Wszystkie</SelectItem>
                  <SelectItem value="sniadania">Śniadania</SelectItem>
                  <SelectItem value="zupa">Zupy</SelectItem>
                  <SelectItem value="danie główne">Dania główne</SelectItem>
                  <SelectItem value="deser">Desery</SelectItem>
                  <SelectItem value="napój">Napoje</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="time" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Czas przygotowania
              </Label>
              <Select value={timeFilter} onValueChange={(value) => setTimeFilter(value as TimeFilter)}>
                <SelectTrigger
                    id="time"
                    className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                >
                  <Timer className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Wybierz opcję" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Wszystkie</SelectItem>
                  <SelectItem value="15">Do 15 min</SelectItem>
                  <SelectItem value="30">Do 30 min</SelectItem>
                  <SelectItem value="60">Do 1h</SelectItem>
                  <SelectItem value="60+">Ponad 1h</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="advanced-filters">
              <AccordionTrigger className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300">
                Zaawansowane filtry
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  <div>
                    <Label htmlFor="servings" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Liczba porcji
                    </Label>
                    <Select value={servingsFilter} onValueChange={(value) => setServingsFilter(value as ServingsFilter)}>
                      <SelectTrigger
                          id="servings"
                          className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                      >
                        <UsersIcon className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Wybierz opcję" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Wszystkie</SelectItem>
                        <SelectItem value="1">1 porcja</SelectItem>
                        <SelectItem value="2">2 porcje</SelectItem>
                        <SelectItem value="3">3 porcje</SelectItem>
                        <SelectItem value="4">4 porcje</SelectItem>
                        <SelectItem value="5">5 porcji</SelectItem>
                        <SelectItem value="6">6 porcji</SelectItem>
                        <SelectItem value="7">7 porcji</SelectItem>
                        <SelectItem value="8">8 porcji</SelectItem>
                        <SelectItem value="więcej">Więcej niż 8</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label
                        htmlFor="allergens"
                        className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Alergeny
                    </Label>
                    <Select value={allergenFilter} onValueChange={(value) => setAllergenFilter(value as AllergenFilter)}>
                      <SelectTrigger
                          id="allergens"
                          className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                      >
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Wybierz opcję" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Wszystkie</SelectItem>
                        <SelectItem value="gluten">Bez glutenu</SelectItem>
                        <SelectItem value="orzechy">Bez orzechów</SelectItem>
                        <SelectItem value="laktoza">Bez laktozy</SelectItem>
                        <SelectItem value="jaja">Bez jaj</SelectItem>
                        <SelectItem value="soja">Bez soi</SelectItem>
                        <SelectItem value="ryby">Bez ryb</SelectItem>
                        <SelectItem value="skorupiaki">Bez skorupiaków</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-full">
                    <Label
                        htmlFor="excluded-ingredients"
                        className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Wyklucz składniki
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Input
                          id="excluded-ingredients"
                          type="text"
                          placeholder="Wpisz składnik do wykluczenia..."
                          value={newExcludedIngredient}
                          onChange={(e) => setNewExcludedIngredient(e.target.value)}
                          className="flex-grow bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                      />
                      <Button
                          onClick={addExcludedIngredient}
                          type="button"
                          className="bg-green-600 text-white hover:bg-green-700"
                      >
                        Dodaj
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {excludedIngredients.map((ingredient, index) => (
                          <Badge
                              key={index}
                              variant="secondary"
                              className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          >
                            {ingredient}
                            <Button
                                variant="ghost"
                                size="sm"
                                className="ml-2 h-4 w-4 p-0 hover:bg-red-200 dark:hover:bg-red-800"
                                onClick={() => removeExcludedIngredient(ingredient)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-full mt-4">
                    <Label
                        htmlFor="included-ingredients"
                        className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Uwzględnij składniki
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Input
                          id="included-ingredients"
                          type="text"
                          placeholder="Wpisz składnik do uwzględnienia..."
                          value={newIncludedIngredient}
                          onChange={(e) => setNewIncludedIngredient(e.target.value)}
                          className="flex-grow bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                      />
                      <Button
                          onClick={addIncludedIngredient}
                          type="button"
                          className="bg-green-600 text-white hover:bg-green-700"
                      >
                        Dodaj
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {includedIngredients.map((ingredient, index) => (
                          <Badge
                              key={index}
                              variant="secondary"
                              className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          >
                            {ingredient}
                            <Button
                                variant="ghost"
                                size="sm"
                                className="ml-2 h-4 w-4 p-0 hover:bg-green-200 dark:hover:bg-green-800"
                                onClick={() => removeIncludedIngredient(ingredient)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAndSortedRecipes.map((recipe) => (
              <Link key={recipe.id} href={`/recipes/${recipe.id}`} className="block hover:no-underline">
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <Image
                        src={recipe.image || "/placeholder.svg"}
                        alt={recipe.name}
                        width={400}
                        height={200}
                        className="h-48 w-full object-cover"
                    />
                    <div className="p-4">
                      <h2 className="text-xl font-semibold mb-2 text-green-700 dark:text-green-300">{recipe.name}</h2>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 cursor-default hover:bg-green-100 hover:text-green-800 dark:hover:bg-green-800 dark:hover:text-green-100">
                          {recipe.type}
                        </Badge>
                        {recipe.meat && recipe.meat !== "none" && (
                            <Badge className="bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100 cursor-default hover:bg-red-100 hover:text-red-800 dark:hover:bg-red-800 dark:hover:text-red-100">
                              {recipe.meat}
                            </Badge>
                        )}
                        {recipe.diet && recipe.diet !== "none" && (
                            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 cursor-default hover:bg-blue-100 hover:text-blue-800 dark:hover:bg-blue-800 dark:hover:text-blue-100">
                              {recipe.diet}
                            </Badge>
                        )}
                        {recipe.allergens && recipe.allergens.length > 0 && (
                            <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100 cursor-default hover:bg-yellow-100 hover:text-yellow-800 dark:hover:bg-yellow-800 dark:hover:text-yellow-100">
                              Alergeny: {recipe.allergens.join(", ")}
                            </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 mt-4 text-sm text-green-600 dark:text-green-400">
                    <span className="flex items-center gap-1 text-black dark:text-white">
                      <Clock className="h-4 w-4" />
                      {recipe.cookingTime} min
                    </span>
                        <span className="flex items-center gap-1 text-black dark:text-white">
                      <Users className="h-4 w-4" />
                          {recipe.servings} porcji
                    </span>
                        <span className="flex items-center gap-1 text-red-500 dark:text-red-400">
                      <Heart className={`h-4 w-4 ${isFavorite(recipe.id) ? "fill-current" : ""}`} />
                          {recipe.likes}
                    </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between p-4">
                    <Button
                        variant="outline"
                        size="sm"
                        className="text-green-700 hover:bg-green-100 hover:text-green-800 dark:text-green-300 dark:hover:bg-green-800 dark:hover:text-green-100"
                    >
                      Zobacz przepis
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          toggleFavorite(recipe.id)
                          setRecipes((prevRecipes) =>
                              prevRecipes.map((r) =>
                                  r.id === recipe.id ? { ...r, likes: r.likes + (isFavorite(recipe.id) ? -1 : 1) } : r,
                              ),
                          )
                        }}
                        className={`flex items-center gap-2 ${
                            isFavorite(recipe.id)
                                ? "bg-red-100 text-red-500 hover:bg-red-200 dark:bg-red-900 dark:text-red-400 dark:hover:bg-red-800"
                                : "text-red-500 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900"
                        }`}
                    >
                      <Heart className={`h-4 w-4 ${isFavorite(recipe.id) ? "fill-current" : ""}`} />
                      {isFavorite(recipe.id) ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
          ))}
        </div>

        {filteredAndSortedRecipes.length === 0 && (
            <p className="text-center text-green-600 dark:text-green-400 mt-8">
              Nie znaleziono żadnych przepisów spełniających kryteria wyszukiwania.
            </p>
        )}
      </div>
  )
}

