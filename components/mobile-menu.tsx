"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-20 left-0 right-0 bg-black/95 backdrop-blur-lg border-b border-white/[0.08] shadow-[0_10px_20px_rgba(0,0,0,0.3)] z-50"
          >
            <nav className="container mx-auto px-4 py-6">
              <div className="flex flex-col space-y-6">
                <Link
                  href="/"
                  className="text-white/80 hover:text-white transition-colors py-2 border-b border-white/10 pb-4"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="text-white/80 hover:text-white transition-colors py-2 border-b border-white/10 pb-4"
                  onClick={() => setIsOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  href="/features"
                  className="text-white/80 hover:text-white transition-colors py-2 border-b border-white/10 pb-4"
                  onClick={() => setIsOpen(false)}
                >
                  Features
                </Link>
                <Button
                  asChild
                  className="bg-gradient-to-r from-indigo-500 to-rose-500 text-white hover:from-indigo-600 hover:to-rose-600 mt-4"
                >
                  <Link href="/waitlist" onClick={() => setIsOpen(false)}>
                    Join the Waitlist
                  </Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

