import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BackgroundAnimation } from "@/components/background-animation"
import Link from "next/link"
import Image from "next/image"
import { createClient } from "@supabase/supabase-js"

// Create a Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Set revalidation to 0 to disable cache
export const revalidate = 0

export default async function BlogPage() {
  // Fetch blog posts from Supabase
  const { data: blogPosts, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("date", { ascending: false })

  // If there's an error or no posts, use the static data as fallback
  const posts = error || !blogPosts || blogPosts.length === 0 ? [] : blogPosts

  return (
    <main className="bg-[#030303] min-h-screen relative overflow-hidden">
      <BackgroundAnimation />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 md:px-6 relative z-10">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">TefiPay Blog</h1>
            <p className="text-white/60 text-lg mb-8">
              Insights, updates, and thought leadership from the TefiPay team
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-12 px-4 md:px-6 relative z-10">
        <div className="container mx-auto max-w-5xl">
          {error && (
            <div className="bg-rose-500/10 border border-rose-500/20 text-rose-200 p-4 rounded-lg mb-8">
              <p>Error loading blog posts. Please try again later.</p>
            </div>
          )}

          {posts.length === 0 && !error && (
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 text-center">
              <h2 className="text-xl font-semibold text-white mb-4">No Blog Posts Yet</h2>
              <p className="text-white/60">Check back soon for updates and insights from the TefiPay team.</p>
            </div>
          )}

          <div className="grid gap-12">
            {posts.map((post, index) => (
              <div
                key={post.id}
                className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden hover:bg-white/[0.05] transition-colors"
              >
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.author}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div className="ml-4">
                      <div className="text-white font-semibold">{post.author}</div>
                      <div className="text-white/60 text-sm">{post.role}</div>
                    </div>
                    <div className="ml-auto flex items-center text-white/50 text-sm">
                      <span>
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <span className="mx-2">•</span>
                      <span>{post.read_time}</span>
                    </div>
                  </div>

                  <Link href={`/blog/${post.slug}`} className="block group">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-white/70 mb-6">{post.excerpt}</p>
                    <div className="inline-flex items-center text-indigo-400 group-hover:text-indigo-300 transition-colors">
                      Read article
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

