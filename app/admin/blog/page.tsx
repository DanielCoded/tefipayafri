"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Loader2, Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  author: string
  date: string
  published: boolean
}

export default function AdminBlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch("/api/blog/admin")
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch blog posts")
        }

        if (data.success) {
          setBlogPosts(data.data)
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

  const togglePublishStatus = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch("/api/blog/admin", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          published: !currentStatus,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to update blog post")
      }

      if (data.success) {
        // Update the local state
        setBlogPosts((prevPosts) =>
          prevPosts.map((post) => (post.id === id ? { ...post, published: !currentStatus } : post)),
        )
      } else {
        throw new Error(data.error || "Failed to update blog post")
      }
    } catch (error) {
      console.error("Error updating blog post:", error)
      alert(error instanceof Error ? error.message : "An unexpected error occurred")
    }
  }

  const deleteBlogPost = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post? This action cannot be undone.")) {
      return
    }

    try {
      const response = await fetch(`/api/blog/admin?id=${id}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete blog post")
      }

      if (data.success) {
        // Update the local state
        setBlogPosts((prevPosts) => prevPosts.filter((post) => post.id !== id))
      } else {
        throw new Error(data.error || "Failed to delete blog post")
      }
    } catch (error) {
      console.error("Error deleting blog post:", error)
      alert(error instanceof Error ? error.message : "An unexpected error occurred")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Blog Posts</h1>
        <div className="flex gap-4">
          <Link href="/admin/blog/new">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Post
            </Button>
          </Link>
          <Link href="/" className="text-indigo-600 hover:text-indigo-800">
            ← Back to home
          </Link>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          <p>{error}</p>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        </div>
      ) : blogPosts.length === 0 ? (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 text-center">
          <p className="text-gray-500 mb-4">No blog posts yet.</p>
          <Link href="/admin/blog/new">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Create Your First Post</Button>
          </Link>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {blogPosts.map((post) => (
                <tr key={post.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{post.title}</div>
                    <div className="text-sm text-gray-500">{post.slug}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{post.author}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        post.published ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <Link href={`/admin/blog/edit/${post.id}`}>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white" title="Edit">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        className={`${
                          post.published ? "bg-yellow-600 hover:bg-yellow-700" : "bg-green-600 hover:bg-green-700"
                        } text-white`}
                        title={post.published ? "Unpublish" : "Publish"}
                        onClick={() => togglePublishStatus(post.id, post.published)}
                      >
                        {post.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                      <Button
                        size="sm"
                        className="bg-red-600 hover:bg-red-700 text-white"
                        title="Delete"
                        onClick={() => deleteBlogPost(post.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

