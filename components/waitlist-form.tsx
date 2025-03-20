"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import type { FormEvent } from "react"

export function WaitlistForm() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    if (!name.trim() || !email.trim()) {
      setError("Name and email are required")
      setIsSubmitting(false)
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address")
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`)
      }

      if (data.success) {
        setIsSubmitted(true)
        // Clear form
        setName("")
        setEmail("")
      } else {
        throw new Error(data.error || "Failed to submit")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setError(error instanceof Error ? error.message : "An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/[0.05] border border-white/[0.1] rounded-2xl p-8 text-center backdrop-blur-sm shadow-[0_0_25px_rgba(255,255,255,0.03)]"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">Thank You for Joining!</h2>
        <p className="text-white/70 leading-relaxed">
          We've added you to our waitlist. We'll keep you updated on our launch and any exciting news.
        </p>
      </motion.div>
    )
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/[0.05] border border-white/[0.1] rounded-2xl p-8 backdrop-blur-sm shadow-[0_0_25px_rgba(255,255,255,0.03)]"
    >
      <h3 className="text-xl font-semibold text-white mb-6">Join Our Waitlist</h3>
      <div className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-white/90 mb-2">
            Name
          </label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="bg-white/[0.07] border-white/[0.1] text-white placeholder-white/40 h-12 rounded-lg focus:ring-2 focus:ring-indigo-500/30 transition-all duration-300"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-white/[0.07] border-white/[0.1] text-white placeholder-white/40 h-12 rounded-lg focus:ring-2 focus:ring-indigo-500/30 transition-all duration-300"
          />
        </div>
        {error && (
          <div className="text-rose-400 text-sm bg-rose-500/10 p-3 rounded-lg border border-rose-500/20">{error}</div>
        )}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-indigo-500 to-rose-500 text-white hover:from-indigo-600 hover:to-rose-600 h-12 rounded-lg font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Joining...
            </>
          ) : (
            "Join the Waitlist"
          )}
        </Button>
        <p className="text-white/50 text-xs text-center mt-4">
          By joining, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </motion.form>
  )
}

