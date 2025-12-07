'use client'

import Link from 'next/link'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/context/CartContext'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { cartItems } = useCart()

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-pink-600">GiftBalloon</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-pink-600 transition-colors">
                Home
              </Link>
              <Link href="/shop" className="text-gray-700 hover:text-pink-600 transition-colors">
                Shop
              </Link>
              <Link href="/services" className="text-gray-700 hover:text-pink-600 transition-colors">
                Services
              </Link>
              <Link href="/location" className="text-gray-700 hover:text-pink-600 transition-colors">
                Locations
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-pink-600 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-pink-600 transition-colors">
                Contact
              </Link>
            </nav>

            {/* Cart and Mobile Menu */}
            <div className="flex items-center space-x-4">
              <Link href="/cart" className="relative p-2 text-gray-700 hover:text-pink-600 transition-colors">
                <ShoppingCart className="h-6 w-6" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-700 hover:text-pink-600 transition-colors"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <nav className="flex flex-col space-y-2">
                <Link href="/" className="px-2 py-2 text-gray-700 hover:text-pink-600 transition-colors">
                  Home
                </Link>
                <Link href="/shop" className="px-2 py-2 text-gray-700 hover:text-pink-600 transition-colors">
                  Shop
                </Link>
                <Link href="/services" className="px-2 py-2 text-gray-700 hover:text-pink-600 transition-colors">
                  Services
                </Link>
                <Link href="/location" className="px-2 py-2 text-gray-700 hover:text-pink-600 transition-colors">
                  Locations
                </Link>
                <Link href="/about" className="px-2 py-2 text-gray-700 hover:text-pink-600 transition-colors">
                  About
                </Link>
                <Link href="/contact" className="px-2 py-2 text-gray-700 hover:text-pink-600 transition-colors">
                  Contact
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">GiftBalloon</h3>
              <p className="text-gray-400">
                Creating magical moments with beautiful balloon arrangements for every occasion.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/shop" className="hover:text-white transition-colors">Shop</Link></li>
                <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
                <li><Link href="/location" className="hover:text-white transition-colors">Locations</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/services/weddings" className="hover:text-white transition-colors">Weddings</Link></li>
                <li><Link href="/services/birthdays" className="hover:text-white transition-colors">Birthdays</Link></li>
                <li><Link href="/services/corporate-events" className="hover:text-white transition-colors">Corporate Events</Link></li>
                <li><Link href="/services/graduations" className="hover:text-white transition-colors">Graduations</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Phone: 07459665002</li>
                <li>Email: info@giftedballoon.com</li>
                <li>Mon-Sat: 9AM-6PM</li>
                <li>Sunday: 10AM-4PM</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 GiftBalloon. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}