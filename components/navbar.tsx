"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Lexend } from "next/font/google"
import { MobileMenu } from "./mobile-menu"

const lexend = Lexend({ subsets: ["latin"] })

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 bg-black/10 backdrop-blur-md border-b border-white/[0.08] ${lexend.className}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <div className="relative w-6 h-6 overflow-hidden">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TefiPay%20-%20White%20Logo-qkXNiIJecgl44SSjEjOufndX15KN2Z.png"
                alt="TefiPay Logo"
                width={24}
                height={24}
                className="object-contain"
              />
            </div>
            <span className="ml-2 text-white font-medium text-base">TefiPay</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-white/80 hover:text-white transition-all duration-300 hover:translate-y-[-2px]"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-white/80 hover:text-white transition-all duration-300 hover:translate-y-[-2px]"
            >
              About Us
            </Link>
            <Link
              href="/features"
              className="text-white/80 hover:text-white transition-all duration-300 hover:translate-y-[-2px]"
            >
              Features
            </Link>
          </nav>

          <div className="hidden md:block">
            <Button
              asChild
              className="bg-white text-black hover:bg-white/90 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] transform hover:-translate-y-1"
            >
              <Link href="/waitlist">Join the Waitlist</Link>
            </Button>
          </div>

          <MobileMenu />
        </div>
      </div>
    </motion.header>
  )
}

