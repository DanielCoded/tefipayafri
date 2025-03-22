import Image from "next/image"
import Link from "next/link"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  author: string
  role: string
  image: string
  date: string
  read_time: string
}

interface BlogPostCardProps {
  post: BlogPost
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  // Format the date
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] transition-colors h-full flex flex-col">
      <div className="flex items-center mb-6">
        <Image
          src={post.image || "/placeholder.svg?height=100&width=100"}
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
      <h3 className="text-xl font-semibold text-white mb-3">{post.title}</h3>
      <p className="text-white/70 mb-4 flex-grow">{post.excerpt}</p>
      <div className="flex justify-between items-center mt-6">
        <span className="text-white/50 text-sm">{formattedDate}</span>
        <Link
          href={`/blog/${post.slug}`}
          className="text-indigo-400 hover:text-indigo-300 transition-colors text-sm flex items-center"
        >
          Read more
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  )
}

