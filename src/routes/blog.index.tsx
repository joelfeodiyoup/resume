import { createFileRoute, Link } from '@tanstack/react-router'
import { blogContent } from '../lib/blog'
import styles from './blog.module.scss'

export const Route = createFileRoute('/blog/')({
  component: BlogIndex,
})

function BlogIndex() {
  return (
    <div className="mx-auto max-w-4xl p-8">
      <h1 className="mb-8 text-4xl font-bold">Blog</h1>
      <p>
        The purpose of these blogs is to catalogue some things I'm interested
        in, or know something about. In my experience, the everyday life of a
        developer is usually spent implementing things, and refreshing knowledge
        as and when it's required. i.e. the amount of knowledge in my readily
        accessible memory is considerably less than what I've been exposed to at
        different points in time. So here I'm trying to consolidate some things.
      </p>
      <p>
        These entries are also for myself to clarify in my head what I think
        about some things. There are some theories about 'exended mind thesis'
        etc about offloading parts of our memory, or feynman's approach to
        learning by explaining concepts to himself. I think these are
        interesting.
      </p>
      <div className={styles['blog-layout']}>
        {blogContent.allContent.map((post) => (
          <article key={post.slug} className="border-b pb-8">
            <Link
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="group"
            >
              <h2 className="text-2xl font-bold group-hover:text-blue-600">
                {post.title}
              </h2>
              <time className="mt-2 block text-sm text-gray-600">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <p className="mt-4 text-gray-700">{post.excerpt}</p>
              <span className="mt-4 inline-block text-blue-600 group-hover:underline">
                Read more →
              </span>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
