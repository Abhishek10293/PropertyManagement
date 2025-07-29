import type React from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "./ui/button"
import { Home, Plus, List, Heart } from "lucide-react"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <div className="min-h-screen">
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  PropertyHub
                </span>
                <p className="text-xs text-gray-500 -mt-1">Find Your Dream Home</p>
              </div>
            </Link>

            <nav className="flex items-center space-x-2">
              <Link to="/">
                <Button
                  variant={isActive("/") ? "default" : "ghost"}
                  size="sm"
                  className={isActive("/") ? "gradient-bg text-white" : "hover:bg-purple-50 hover:text-purple-700"}
                >
                  <List className="w-4 h-4 mr-2" />
                  Properties
                </Button>
              </Link>
              <Link to="/favorites">
                <Button
                  variant={isActive("/favorites") ? "default" : "ghost"}
                  size="sm"
                  className={isActive("/favorites") ? "gradient-bg text-white" : "hover:bg-pink-50 hover:text-pink-700"}
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Favorites
                </Button>
              </Link>
              <Link to="/add">
                <Button
                  variant={isActive("/add") ? "default" : "ghost"}
                  size="sm"
                  className={isActive("/add") ? "gradient-bg text-white" : "hover:bg-blue-50 hover:text-blue-700"}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Property
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">{children}</main>

      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">PropertyHub</span>
              </div>
              <p className="text-gray-400 mb-4">
                Your trusted partner in finding the perfect property. We make real estate simple, transparent, and
                accessible.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    Properties
                  </Link>
                </li>
                <li>
                  <Link to="/favorites" className="hover:text-white transition-colors">
                    Favorites
                  </Link>
                </li>
                <li>
                  <Link to="/add" className="hover:text-white transition-colors">
                    Add Property
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@propertyhub.com</li>
                <li>Phone: (555) 123-4567</li>
                <li>Address: 123 Real Estate St</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PropertyHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
