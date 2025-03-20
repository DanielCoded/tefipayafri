"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useRef } from "react"
import { useInView } from "framer-motion"

export function Showcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section className="py-24 px-4 md:px-6 bg-gradient-to-b from-[#030303] to-black/20 overflow-hidden">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Experience TefiPay</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Launching Q4 2025 - Join our waitlist to be among the first to experience the future of contactless payments
          </p>
        </motion.div>

        {/* Main Showcase Grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Mobile App Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="relative h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl blur-xl transform -rotate-3"></div>
              <div className="relative h-full bg-black/40 backdrop-blur-sm border border-white/10 p-6 rounded-3xl shadow-2xl flex flex-col">
                <h3 className="text-xl font-semibold text-white mb-4">Mobile Experience</h3>
                <p className="text-white/70 mb-6">
                  Seamless payments at your fingertips with our intuitive mobile app.
                </p>
                <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-lg flex-grow">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/App%20Icon%20Mockup%403x.jpg-MXXrnA8tivJeeYeXL8saJwrFDLPo7E.jpeg"
                    alt="TefiPay Mobile App"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                    <p className="text-white text-sm font-medium">Available Q4 2025</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Business Card Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-3xl blur-xl"></div>
              <div className="relative h-full bg-black/40 backdrop-blur-sm border border-white/10 p-6 rounded-3xl shadow-2xl flex flex-col">
                <h3 className="text-xl font-semibold text-white mb-4">Premium Identity</h3>
                <p className="text-white/70 mb-6">
                  Our brand represents sophistication, security, and innovation in fintech.
                </p>
                <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-lg flex-grow">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TefiPay%20Biz%20Card%20Mockup.jpg-SFmJTz5HQYD6Yr0S3ruBMi9PWtSe8S.jpeg"
                    alt="TefiPay Business Card"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-purple-500/80 backdrop-blur-md px-3 py-1 rounded-full">
                    <p className="text-white text-xs font-medium">#tefiPay</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Exhibition Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="relative h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl blur-xl transform rotate-3"></div>
              <div className="relative h-full bg-black/40 backdrop-blur-sm border border-white/10 p-6 rounded-3xl shadow-2xl flex flex-col">
                <h3 className="text-xl font-semibold text-white mb-4">Global Presence</h3>
                <p className="text-white/70 mb-6">TefiPay is set to revolutionize payment systems worldwide.</p>
                <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-lg flex-grow">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TefiPay%20-%20Wall.jpg-VjKYuDkqr8QnxcAetSlc5IoxZLalnY.jpeg"
                    alt="TefiPay Exhibition"
                    width={800}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                    <p className="text-white text-sm font-medium">Launching Q4 2025</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Detailed Feature Section */}
        <div className="mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Brand Excellence</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Every aspect of TefiPay is crafted with precision and attention to detail
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* App Experience */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col md:flex-row gap-8 items-center"
            >
              <div className="md:w-1/2">
                <div className="relative w-full max-w-xs mx-auto">
                  <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/30 to-indigo-500/30 rounded-full blur-md"></div>
                  <div className="relative rounded-3xl overflow-hidden border-2 border-white/10">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/App%20Icon%20Mockup%403x.jpg-MXXrnA8tivJeeYeXL8saJwrFDLPo7E.jpeg"
                      alt="TefiPay App Icon"
                      width={300}
                      height={300}
                      className="w-full h-auto transform hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
              <div className="md:w-1/2">
                <h3 className="text-2xl font-semibold text-white mb-4">Intuitive Mobile Experience</h3>
                <p className="text-white/70 mb-6">
                  Our mobile app is designed with user experience at its core, providing a seamless and intuitive
                  interface for all your payment needs.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 mr-2"></div>
                    <span className="text-white/70">Sleek, modern interface</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 mr-2"></div>
                    <span className="text-white/70">One-tap payments</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 mr-2"></div>
                    <span className="text-white/70">Biometric security</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Brand Identity */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col md:flex-row gap-8 items-center"
            >
              <div className="md:w-1/2 md:order-2">
                <div className="relative w-full max-w-xs mx-auto">
                  <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-full blur-md"></div>
                  <div className="relative rounded-3xl overflow-hidden border-2 border-white/10">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TefiPay%20Biz%20Card%20Mockup.jpg-SFmJTz5HQYD6Yr0S3ruBMi9PWtSe8S.jpeg"
                      alt="TefiPay Business Card"
                      width={300}
                      height={300}
                      className="w-full h-auto transform hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 md:order-1">
                <h3 className="text-2xl font-semibold text-white mb-4">Premium Brand Identity</h3>
                <p className="text-white/70 mb-6">
                  Our brand identity reflects our commitment to excellence, with a sophisticated design language that
                  communicates trust and innovation.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 mr-2"></div>
                    <span className="text-white/70">Distinctive purple palette</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 mr-2"></div>
                    <span className="text-white/70">Elegant typography</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 mr-2"></div>
                    <span className="text-white/70">Iconic circular logo</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Global Presence */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col md:flex-row gap-8 items-center lg:col-span-2"
            >
              <div className="md:w-1/2">
                <div className="relative w-full max-w-lg mx-auto">
                  <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/30 to-indigo-500/30 rounded-xl blur-md"></div>
                  <div className="relative rounded-xl overflow-hidden border-2 border-white/10">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TefiPay%20-%20Wall.jpg-VjKYuDkqr8QnxcAetSlc5IoxZLalnY.jpeg"
                      alt="TefiPay Exhibition"
                      width={600}
                      height={400}
                      className="w-full h-auto transform hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
              <div className="md:w-1/2">
                <h3 className="text-2xl font-semibold text-white mb-4">Global Presence & Impact</h3>
                <p className="text-white/70 mb-6">
                  TefiPay is positioned to make a significant impact on the global payments landscape, with a presence
                  that spans across continents.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 mr-2"></div>
                    <span className="text-white/70">International partnerships</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 mr-2"></div>
                    <span className="text-white/70">Multi-currency support</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 mr-2"></div>
                    <span className="text-white/70">Cross-border transactions</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 mr-2"></div>
                    <span className="text-white/70">Launching Q4 2025</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <a
            href="/waitlist"
            className="inline-flex items-center px-8 py-3 rounded-lg bg-white text-black font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] transform hover:-translate-y-1"
          >
            <span>Join the Waitlist</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

