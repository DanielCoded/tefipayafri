"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { BlogPostCard } from "./blog-post-card"
import { Loader2 } from "lucide-react"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  role: string
  image: string
  date: string
  read_time: string
}

export function FounderBlogs() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch("/api/blog")
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch blog posts")
        }

        if (data.success) {
          // Limit to 4 posts for the homepage
          setBlogPosts(data.data.slice(0, 4))
        } else {
          throw new Error(data.error || "Failed to fetch blog posts")
        }
      } catch (error) {
        console.error("Error fetching blog posts:", error)
        setError(error instanceof Error ? error.message : "An unexpected error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlogPosts()
  }, [])

  return (
    <section className="py-24 px-4 md:px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Insights from Our Founders</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Explore thought leadership articles from the visionaries behind TefiPay
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
          </div>
        ) : error ? (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-200 p-4 rounded-lg mb-8 text-center">
            <p>Error loading blog posts. Please try again later.</p>
          </div>
        ) : blogPosts.length === 0 ? (
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold text-white mb-4">No Blog Posts Yet</h3>
            <p className="text-white/60">Check back soon for updates and insights from the TefiPay team.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {blogPosts.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <BlogPostCard post={blog} />
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link
            href="/blog"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-white/[0.05] border border-white/[0.1] text-white hover:bg-white/[0.1] transition-colors"
          >
            View all articles
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

