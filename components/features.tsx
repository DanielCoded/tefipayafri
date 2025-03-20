"use client"

import { motion } from "framer-motion"
import { CreditCard, Shield, Zap, Smartphone } from "lucide-react"

const features = [
  {
    icon: CreditCard,
    title: "Contactless Payments",
    description: "Make secure payments without physical contact, perfect for modern transactions.",
  },
  {
    icon: Shield,
    title: "Bank-Grade Security",
    description: "Your transactions are protected with state-of-the-art encryption technology.",
  },
  {
    icon: Zap,
    title: "Instant Transfers",
    description: "Send and receive money in real-time with lightning-fast processing.",
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description: "Designed for the modern user with a seamless mobile experience.",
  },
]

export function Features() {
  return (
    <section className="py-24 px-4 md:px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Revolutionary Features</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Experience the next generation of payment solutions with our cutting-edge features
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] transition-colors"
            >
              <feature.icon className="w-12 h-12 text-indigo-500 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-white/60">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

