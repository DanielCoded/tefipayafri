"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const testimonials = [
  {
    quote: "TefiPay has revolutionized how we handle payments. It's fast, secure, and incredibly user-friendly.",
    author: "Sarah Johnson",
    role: "CEO, TechCorp",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    quote: "The best payment solution we've ever used. Our customers love the seamless experience.",
    author: "Michael Chen",
    role: "Founder, StartupX",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    quote: "Security and speed combined in one elegant solution. TefiPay is the future of payments.",
    author: "Emma Davis",
    role: "CTO, FinanceHub",
    image: "/placeholder.svg?height=100&width=100",
  },
]

export function Testimonials() {
  return (
    <section className="py-24 px-4 md:px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Trusted by Industry Leaders</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            See what our clients have to say about their experience with TefiPay
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08]"
            >
              <div className="flex items-center mb-4">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.author}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div className="ml-4">
                  <div className="text-white font-semibold">{testimonial.author}</div>
                  <div className="text-white/60 text-sm">{testimonial.role}</div>
                </div>
              </div>
              <p className="text-white/80 italic">&ldquo;{testimonial.quote}&rdquo;</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

