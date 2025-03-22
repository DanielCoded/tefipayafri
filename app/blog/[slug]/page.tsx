import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BackgroundAnimation } from "@/components/background-animation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import { createClient } from "@supabase/supabase-js"

// Create a Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Set revalidation to 0 to disable cache
export const revalidate = 0

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  // Fetch the blog post from Supabase
  const { data: post, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", params.slug)
    .eq("published", true)
    .single()

  // If there's an error or no post, show 404
  if (error || !post) {
    notFound()
  }

  return (
    <main className="bg-[#030303] min-h-screen relative overflow-hidden">
      <BackgroundAnimation />
      <Navbar />

      {/* Blog Post */}
      <section className="pt-32 pb-16 px-4 md:px-6 relative z-10">
        <div className="container mx-auto max-w-3xl">
          <Link href="/blog" className="inline-flex items-center text-white/60 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to all articles
          </Link>

          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden p-8 md:p-12">
            <div className="flex items-center mb-8">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.author}
                width={64}
                height={64}
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

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">{post.title}</h1>

            <div className="prose prose-invert prose-lg max-w-none">
              <div className="text-white/80 leading-relaxed">
                {post.content.split("\n").map((paragraph, index) => {
                  if (paragraph.startsWith("# ")) {
                    return (
                      <h1 key={index} className="text-3xl font-bold mt-8 mb-4">
                        {paragraph.substring(2)}
                      </h1>
                    )
                  } else if (paragraph.startsWith("## ")) {
                    return (
                      <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
                        {paragraph.substring(3)}
                      </h2>
                    )
                  } else if (paragraph.startsWith("### ")) {
                    return (
                      <h3 key={index} className="text-xl font-bold mt-6 mb-3">
                        {paragraph.substring(4)}
                      </h3>
                    )
                  } else if (paragraph.startsWith("- ")) {
                    return (
                      <li key={index} className="ml-6 mb-2">
                        {paragraph.substring(2)}
                      </li>
                    )
                  } else if (paragraph.trim() === "") {
                    return <div key={index} className="h-4"></div>
                  } else {
                    return (
                      <p key={index} className="mb-4">
                        {paragraph}
                      </p>
                    )
                  }
                })}
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center">
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
                </div>

                <div className="flex gap-4">
                  <Link
                    href="/blog"
                    className="px-4 py-2 bg-white/[0.05] border border-white/[0.1] rounded-lg text-white hover:bg-white/[0.1] transition-colors"
                  >
                    More articles
                  </Link>
                  <Link
                    href="/contact"
                    className="px-4 py-2 bg-indigo-500 rounded-lg text-white hover:bg-indigo-600 transition-colors"
                  >
                    Contact us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

