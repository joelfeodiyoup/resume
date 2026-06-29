export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  html: string
}

type ModuleRecord = Record<string, { attributes: any; html: string }>

// const getModules: (path: string) => ModuleRecord = (path) => import.meta.glob<{ attributes: any; html: string }>(
//   path,
//   { eager: true }
// )

export const parseModules = (modules: ModuleRecord) => {
  const allContent = Object.entries(modules)
    .map(([path, module]) => {
      const slug = path.replace('../content/blog/', '').replace('.md', '')
      return {
        slug,
        title: module.attributes.title,
        date: module.attributes.date,
        excerpt: module.attributes.excerpt,
        html: module.html,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const getContent = (slug: string) =>
    allContent.find((post) => post.slug === slug)

  return {
    allContent,
    getContent,
  }
}

const blogModules = import.meta.glob<{ attributes: any; html: string }>(
  '../content/blog/*.md',
  { eager: true },
)

const demoProjectsModules = import.meta.glob<{ attributes: any; html: string }>(
  '../content/demo-projects/*.md',
  { eager: true },
)

const personBlogModules = import.meta.glob<{ attributes: any; html: string }>(
  '../content/personal-blog/*.md',
  { eager: true },
)

export const blogContent = parseModules(blogModules)
export const demoProjectsContent = parseModules(demoProjectsModules)
export const personalBlogContent = parseModules(personBlogModules)
