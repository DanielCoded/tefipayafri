"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BackgroundAnimation } from "@/components/background-animation"
import { motion } from "framer-motion"
import { Mail, MapPin, Phone, Loader2 } from "lucide-react"
import Link from "next/link"
import { Twitter, Instagram, Linkedin, Facebook } from "lucide-react"
import { createClient } from "@supabase/supabase-js"
import { TeamSection } from "@/components/team-section"
import { teamMembers } from "@/lib/team-data"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    success?: boolean
    message?: string
  }>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus({})

    // Validate form
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setFormStatus({
        success: false,
        message: "Please fill in all fields",
      })
      setIsSubmitting(false)
      return
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setFormStatus({
        success: false,
        message: "Please enter a valid email address",
      })
      setIsSubmitting(false)
      return
    }

    try {
      // Submit to Supabase
      const { error } = await supabase.from("contact_submissions").insert([
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
      ])

      if (error) {
        console.error("Error submitting form:", error)
        throw new Error(error.message)
      }

      // Success
      setFormStatus({
        success: true,
        message: "Thank you for your message! We'll get back to you soon.",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      console.error("Error:", error)
      setFormStatus({
        success: false,
        message: "There was an error submitting your message. Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="bg-[#030303] min-h-screen relative overflow-hidden">
      <BackgroundAnimation />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 md:px-6 relative z-10">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Get in Touch</h1>
            <p className="text-white/60 text-lg mb-8">
              Have questions about TefiPay? We're here to help. Reach out to our team for support, partnership
              opportunities, or general inquiries.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-12 px-4 md:px-6 relative z-10">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] transition-colors text-center"
            >
              <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Email Us</h3>
              <a href="mailto:info@tefipay.com" className="text-white/60 hover:text-white transition-colors">
                info@tefipay.com
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] transition-colors text-center"
            >
              <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Call Us</h3>
              <a href="tel:+2348028677778" className="text-white/60 hover:text-white transition-colors">
                +234 802 867 7778
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] transition-colors text-center"
            >
              <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Visit Us</h3>
              <p className="text-white/60">Coming Soon</p>
            </motion.div>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 backdrop-blur-sm"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>

              {formStatus.success ? (
                <div className="bg-green-500/20 border border-green-500/30 text-green-200 p-4 rounded-lg mb-6">
                  {formStatus.message}
                </div>
              ) : null}

              {formStatus.success === false ? (
                <div className="bg-rose-500/20 border border-rose-500/30 text-rose-200 p-4 rounded-lg mb-6">
                  {formStatus.message}
                </div>
              ) : null}

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white/90 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/[0.07] border border-white/[0.1] rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/[0.07] border border-white/[0.1] rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-white/90 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/[0.07] border border-white/[0.1] rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    placeholder="Subject"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white/90 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/[0.07] border border-white/[0.1] rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-indigo-500 to-rose-500 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <TeamSection
        title="Meet Our Leadership Team"
        subtitle="The visionaries behind TefiPay who are working to revolutionize contactless payments across Africa."
        members={teamMembers}
      />

      {/* Social Media Section */}
      <section className="py-16 px-4 md:px-6 relative z-10">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Connect With Us</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Follow us on social media to stay updated with the latest news and announcements.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-8">
            <Link
              href="https://twitter.com/TefiPayOfficial"
              className="flex items-center gap-3 px-6 py-4 bg-white/[0.03] border border-white/[0.08] rounded-xl hover:bg-white/[0.05] transition-colors"
            >
              <Twitter className="w-6 h-6 text-[#1DA1F2]" />
              <span className="text-white">@TefiPayOfficial</span>
            </Link>
            <Link
              href="https://www.instagram.com/tefipay/"
              className="flex items-center gap-3 px-6 py-4 bg-white/[0.03] border border-white/[0.08] rounded-xl hover:bg-white/[0.05] transition-colors"
            >
              <Instagram className="w-6 h-6 text-[#E1306C]" />
              <span className="text-white">@tefipay</span>
            </Link>
            <Link
              href="https://www.linkedin.com/company/tefipay/"
              className="flex items-center gap-3 px-6 py-4 bg-white/[0.03] border border-white/[0.08] rounded-xl hover:bg-white/[0.05] transition-colors"
            >
              <Linkedin className="w-6 h-6 text-[#0077B5]" />
              <span className="text-white">TefiPay</span>
            </Link>
            <Link
              href="https://www.facebook.com/profile.php?id=61571972757336"
              className="flex items-center gap-3 px-6 py-4 bg-white/[0.03] border border-white/[0.08] rounded-xl hover:bg-white/[0.05] transition-colors"
            >
              <Facebook className="w-6 h-6 text-[#1877F2]" />
              <span className="text-white">TefiPay</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

