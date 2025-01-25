"use client"

import {useState, useCallback} from "react"
import {useRouter} from "next/navigation"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Card, CardContent, CardHeader, CardTitle, CardFooter} from "@/components/ui/card"
import {Beef, Leaf, UtensilsCrossed, Search} from "lucide-react"
import {getRandomRecipe, type Recipe} from "@/lib/recipes"
import Image from "next/image"

type MeatFilter = "all" | "drób" | "wołowina" | "wieprzowina" | "owoce morza" | "none"
type DietFilter = "all" | "wegańskie" | "wegetariańskie" | "ketogeniczna" | "none"
type TypeFilter = "all" | "zupa" | "danie główne" | "deser" | "napój" | "śniadania"
type TimeFilter = "all" | "15" | "30" | "60" | "60+"

export default function RandomRecipePage() {
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [meatFilter, setMeatFilter] = useState<MeatFilter>("all")
    const [dietFilter, setDietFilter] = useState<DietFilter>("all")
    const [typeFilter, setTypeFilter] = useState<TypeFilter>("all")
    const [timeFilter, setTimeFilter] = useState<TimeFilter>("all")
    const [randomRecipe, setRandomRecipe] = useState<Recipe | null>(null)

    const router = useRouter()

    const getFilteredRandomRecipe = useCallback(() => {
        const recipe = getRandomRecipe({
            searchTerm,
            meatFilter,
            dietFilter,
            typeFilter,
            timeFilter,
        })
        if (recipe) {
            setRandomRecipe(recipe)
        } else {
            // If no recipe matches the filters, show an alert
            alert("Nie znaleziono przepisu spełniającego podane kryteria. Spróbuj zmienić filtry.")
        }
    }, [searchTerm, meatFilter, dietFilter, typeFilter, timeFilter])

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8 text-green-700 dark:text-green-300">Przepis dnia</h1>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Filtry</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="col-span-full">
                            <Label htmlFor="search" className="sr-only">
                                Szukaj przepisu lub składnika
                            </Label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                                <Input
                                    id="search"
                                    type="search"
                                    placeholder="Szukaj przepisu lub składnika..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-green-500 focus:ring-green-500"
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="meat"
                                   className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                Mięso
                            </Label>
                            <Select value={meatFilter} onValueChange={(value) => setMeatFilter(value as MeatFilter)}>
                                <SelectTrigger
                                    id="meat"
                                    className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                                >
                                    <Beef className="w-4 h-4 mr-2"/>
                                    <SelectValue placeholder="Wybierz opcję"/>
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
                            <Label htmlFor="diet"
                                   className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                Dieta
                            </Label>
                            <Select value={dietFilter} onValueChange={(value) => setDietFilter(value as DietFilter)}>
                                <SelectTrigger
                                    id="diet"
                                    className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                                >
                                    <Leaf className="w-4 h-4 mr-2"/>
                                    <SelectValue placeholder="Wybierz opcję"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Wszystkie</SelectItem>
                                    <SelectItem value="wege">Wege</SelectItem>
                                    <SelectItem value="wegetarianskie">Wegetariańskie</SelectItem>
                                    <SelectItem value="keto">Keto</SelectItem>
                                    <SelectItem value="none">Brak</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="type"
                                   className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                Typ dania
                            </Label>
                            <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as TypeFilter)}>
                                <SelectTrigger
                                    id="type"
                                    className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                                >
                                    <UtensilsCrossed className="w-4 h-4 mr-2"/>
                                    <SelectValue placeholder="Filtruj według typu"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Wszystkie</SelectItem>
                                    <SelectItem value="śniadania">Śniadania</SelectItem>
                                    <SelectItem value="zupa">Zupy</SelectItem>
                                    <SelectItem value="danie główne">Dania główne</SelectItem>
                                    <SelectItem value="deser">Desery</SelectItem>
                                    <SelectItem value="napoj">Napoje</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={getFilteredRandomRecipe}
                            className="w-full bg-green-600 text-white hover:bg-green-700">
                        Losuj przepis
                    </Button>
                </CardFooter>
            </Card>

            {randomRecipe && (
                <div className="flex flex-col md:flex-row gap-8">
                    <Card className="flex-grow">
                        <CardHeader>
                            <CardTitle>{randomRecipe.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{randomRecipe.description}</p>
                            {/* Add more details about the recipe here */}
                        </CardContent>
                        <CardFooter>
                            <Button onClick={() => router.push(`/recipes/${randomRecipe.id}`)} className="w-full">
                                Zobacz pełny przepis
                            </Button>
                        </CardFooter>
                    </Card>
                    <div className="w-full md:w-1/3">
                        <Card>
                            <CardHeader>
                                <CardTitle>Zdjęcie przepisu</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="relative w-full pt-[100%]">
                                    <Image
                                        src={randomRecipe.image || "/placeholder.svg"}
                                        alt={`Zdjęcie ${randomRecipe.name}`}
                                        fill
                                        style={{objectFit: "cover"}}
                                        className="rounded-md"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    )
}

