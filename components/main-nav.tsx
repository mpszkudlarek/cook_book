import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Settings, HelpCircle } from 'lucide-react'
import { ModeToggle } from "@/components/mode-toggle"

export function MainNav() {
  return (
      <>
        <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-white dark:bg-gray-900 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <Link href="/" className="text-2xl font-bold text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors duration-300">
                  CookBook
                </Link>
                <Link href="/results">
                  <Button variant="ghost" className="nav-link text-sm font-medium">Wszystkie przepisy</Button>
                </Link>
                <Link href="/favorites">
                  <Button variant="ghost" className="nav-link text-sm font-medium">Ulubione</Button>
                </Link>
                <Link href="/recipes/add">
                  <Button variant="ghost" className="nav-link text-sm font-medium">Dodaj przepis</Button>
                </Link>
                <Link href="/random-recipe">
                  <Button variant="ghost" className="nav-link text-sm font-medium">
                    Przepis dnia
                  </Button>
                </Link>
              </div>
              <div className="flex items-center space-x-6">
                <Link href="/faq" className="nav-link flex items-center space-x-2 text-sm font-medium px-3 py-2 rounded-md">
                  <span>Pomoc</span>
                  <HelpCircle className="h-5 w-5" />
                </Link>
                <Link href="/settings" className="nav-link flex items-center space-x-2 text-sm font-medium px-3 py-2 rounded-md">
                  <span>Ustawienia</span>
                  <Settings className="h-5 w-5" />
                </Link>
                <ModeToggle />
              </div>
            </div>
          </div>
        </nav>
        <main className="pt-[72px]">
          {/* Your main content goes here */}
        </main>
      </>
  );
}

