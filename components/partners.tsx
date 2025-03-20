"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const partners = [
  {
    name: "Paystack",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Paystack_Logo-2oyXt2yboe8zLucztNvGKkh4ccfrHx.png",
    width: 160,
    height: 40,
  },
  {
    name: "Flutterwave",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Flutterwave_Logo-BWEbXx49NSNp14R6BwRe2HnNyFOGcX.png",
    width: 180,
    height: 40,
  },
  {
    name: "Mastercard",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg",
    width: 120,
    height: 40,
  },
  {
    name: "Visa",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg",
    width: 120,
    height: 40,
  },
  {
    name: "Shoprite",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Shoprite_Holdings_logo.svg",
    width: 140,
    height: 40,
  },
]

export function Partners() {
  return (
    <section className="py-12 px-4 md:px-6 bg-gradient-to-b from-[#030303] to-black/20 overflow-hidden">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-semibold text-white mb-2">Trusted by Industry Leaders</h2>
          <p className="text-white/60">Partnering with the best to bring you seamless payment solutions</p>
        </motion.div>
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#030303] to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#030303] to-transparent z-10" />
          <motion.div
            className="flex gap-16 md:gap-24"
            animate={{
              x: [0, -1920],
            }}
            transition={{
              x: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {[...partners, ...partners].map((partner, index) => (
              <div key={index} className="flex-shrink-0">
                <Image
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name}
                  width={partner.width}
                  height={partner.height}
                  className="opacity-50 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

