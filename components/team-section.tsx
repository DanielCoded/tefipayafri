"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export interface TeamMember {
  name: string
  role: string
  image: string
  bio: string
}

interface TeamSectionProps {
  title?: string
  subtitle?: string
  members: TeamMember[]
}

export function TeamSection({ title = "Meet Our Leadership Team", subtitle, members }: TeamSectionProps) {
  return (
    <section className="py-16 px-4 md:px-6 bg-gradient-to-b from-[#030303] to-black/20 relative z-10">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">{title}</h2>
          {subtitle && <p className="text-white/60 max-w-2xl mx-auto">{subtitle}</p>}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
                <p className="text-indigo-400 mb-4">{member.role}</p>
                <p className="text-white/60 text-sm">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

