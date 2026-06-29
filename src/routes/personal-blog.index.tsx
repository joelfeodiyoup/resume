import { personalBlogContent } from '#/lib/blog'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/personal-blog/')({
  component: BlogIndex,
})

function BlogIndex() {
  return personalBlogContent.allContent.map((post) => {
    return <div>{post.title}</div>
  })
}
