"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Smartphone, Shield, Zap, CreditCard, Globe, Clock, BarChart, Lock, Users } from "lucide-react"
import { Button } from "@/components/button"
import { BackgroundAnimation } from "@/components/background-animation"

const features = [
  {
    category: "Contactless Payments",
    items: [
      {
        title: "Seamless Contactless Payments",
        description: "Experience the future of payments with our contactless solutions.",
        icon: Smartphone,
        subFeatures: [
          "NFC & QR Code Transactions",
          "Tap-to-Pay via Mobile Devices",
          "Peer-to-Peer Contactless Transfers",
        ],
      },
    ],
  },
  {
    category: "Security",
    items: [
      {
        title: "Smart AI-Powered Fraud Detection",
        description: "Advanced security measures to protect your transactions.",
        icon: Shield,
        subFeatures: [
          "Real-time transaction monitoring",
          "AI-driven anomaly detection",
          "Instant fraud alerts & prevention",
        ],
      },
      {
        title: "One-Tap Biometric Authentication",
        description: "Secure and convenient authentication methods.",
        icon: Lock,
        subFeatures: [
          "Fingerprint & Face ID security",
          "Instant transaction approvals",
          "Adaptive security for suspicious logins",
        ],
      },
    ],
  },
  {
    category: "Payment Solutions",
    items: [
      {
        title: "Virtual & Physical Card Integration",
        description: "Flexible card management for all your needs.",
        icon: CreditCard,
        subFeatures: [
          "Link multiple debit/credit cards",
          "Virtual card generation for online payments",
          "Secure one-time-use cards for privacy",
        ],
      },
      {
        title: "Instant Multi-Currency Payments",
        description: "Seamless international transactions.",
        icon: Globe,
        subFeatures: [
          "Auto currency conversion",
          "Cross-border transactions with real-time rates",
          "Support for African & global currencies",
        ],
      },
    ],
  },
  {
    category: "Advanced Features",
    items: [
      {
        title: "Secure Tokenization",
        description: "Enhanced security for every transaction.",
        icon: Zap,
        subFeatures: [
          "Dynamic CVV for every purchase",
          "No card details stored on merchants' servers",
          "End-to-end encryption for payments",
        ],
      },
      {
        title: "Smart Spending & Budgeting Tools",
        description: "Take control of your finances.",
        icon: BarChart,
        subFeatures: ["AI-based expense tracking", "Automated savings goals", "Personalized financial insights"],
      },
    ],
  },
  {
    category: "Business Solutions",
    items: [
      {
        title: "Merchant Payment Gateway",
        description: "Complete payment solutions for businesses.",
        icon: Users,
        subFeatures: [
          "Easy POS & online store integration",
          "No-code checkout buttons",
          "Subscription & recurring payments",
        ],
      },
      {
        title: "Developer APIs & SDKs",
        description: "Build custom payment solutions.",
        icon: Clock,
        subFeatures: [
          "Open API for fintech startups",
          "Custom payment solutions",
          "White-label options for businesses",
        ],
      },
    ],
  },
]

export default function FeaturesPage() {
  return (
    <main className="bg-[#030303] min-h-screen relative overflow-hidden">
      <BackgroundAnimation />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 md:px-6 relative z-10">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Powerful Features for Modern Payments</h1>
            <p className="text-white/60 text-lg mb-8">
              Discover the tools and capabilities that make TefiPay the leading choice for contactless payments.
            </p>
          </div>
        </div>
      </section>

      {/* Features Sections */}
      {features.map((category, index) => (
        <section
          key={index}
          className={`py-16 px-4 md:px-6 relative z-10 ${index % 2 === 0 ? "bg-black/20" : "bg-transparent"}`}
        >
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12">{category.category}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {category.items.map((feature, featureIndex) => (
                <motion.div
                  key={featureIndex}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: featureIndex * 0.1 }}
                  className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] transition-colors"
                >
                  <feature.icon className="w-12 h-12 text-indigo-500 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                  <p className="text-white/60 mb-6">{feature.description}</p>
                  <ul className="space-y-3">
                    {feature.subFeatures.map((subFeature, subIndex) => (
                      <li key={subIndex} className="flex items-center text-white/60">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-2" />
                        {subFeature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Waitlist Section */}
      <section className="py-16 px-4 md:px-6 bg-gradient-to-b from-black/20 to-[#030303] relative z-10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Join Our Waitlist</h2>
          <p className="text-white/60 mb-8 max-w-2xl mx-auto">
            Be among the first to experience the future of contactless payments. Get exclusive benefits and early access
            to our platform.
          </p>
          <Button className="bg-white text-black hover:bg-white/90 px-8 py-6 text-lg">Join the Waitlist</Button>
        </div>
      </section>

      <Footer />
    </main>
  )
}

