export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
  Component: React.ComponentType
}

type MdxModule = {
  default: React.ComponentType
  frontmatter?: any
  title?: string
  date?: string
  excerpt?: string
  slug?: string
  tags?: string
}

type ModuleRecord = Record<string, MdxModule>

export const parseModules = (modules: ModuleRecord) => {
  const allContent = Object.entries(modules)
    .map(([path, module]) => {
      const slug = path.replace('../content/blog/', '').replace('.mdx', '')
      const frontmatter: MdxModule = module.frontmatter || module
      const blogPost: BlogPost = {
        slug,
        title: (frontmatter.title || module.title) ?? '',
        date: (frontmatter.date || module.date) ?? '',
        excerpt: (frontmatter.excerpt || module.excerpt) ?? '',
        tags: ((frontmatter.tags || module.tags) ?? '').split(', '),
        Component: module.default,
      }
      return blogPost
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const getContent = (slug: string) =>
    allContent.find((post) => post.slug === slug)

  return {
    allContent,
    getContent,
  }
}

const blogModules = import.meta.glob<MdxModule>('../content/blog/*.mdx', {
  eager: true,
})

const demoProjectsModules = import.meta.glob<MdxModule>(
  '../content/demo-projects/*.mdx',
  { eager: true },
)

const personBlogModules = import.meta.glob<MdxModule>(
  '../content/personal-blog/*.mdx',
  { eager: true },
)

export const blogContent = parseModules(blogModules)
export const demoProjectsContent = parseModules(demoProjectsModules)
export const personalBlogContent = parseModules(personBlogModules)
