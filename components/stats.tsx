"use client"

import { motion } from "framer-motion"

const stats = [
  { number: "10M+", label: "Active Users" },
  { number: "50K+", label: "Business Partners" },
  { number: "99.9%", label: "Uptime" },
  { number: "24/7", label: "Support" },
]

export function Stats() {
  return (
    <section className="py-24 px-4 md:px-6 bg-gradient-to-b from-transparent to-black/20">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Our Vision for Year One</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            These are our projected metrics after one year of launch. We're building TefiPay to scale rapidly and
            deliver exceptional value.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-white/60">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

