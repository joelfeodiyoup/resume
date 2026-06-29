import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { blogContent } from '../lib/blog'

export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => {
    const post = blogContent.getContent(params.slug)
    if (!post) throw notFound()
    return post
  },
  component: BlogPost,
})

function BlogPost() {
  const post = Route.useLoaderData()
  const { Component } = post

  return (
    <div className="mx-auto max-w-4xl p-8">
      <article className="prose prose-lg max-w-none">
        <h1 className="mb-2 text-4xl font-bold">{post.title}</h1>
        <time className="mb-8 block text-gray-600">
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>

        <div className="mt-8">
          <Component />
        </div>
      </article>
    </div>
  )
}
