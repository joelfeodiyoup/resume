import { createFileRoute } from '@tanstack/react-router'
import { demoProjectsContent } from '../lib/blog'
import styles from './DemoProjects.module.scss'
import { Pill } from '#/components/pill/Pill'
import { imagesByKeys } from './about.images.ts'
import { Thumbnails } from '#/components/thumbnails/Thumbnails.tsx'

export const Route = createFileRoute('/demo-projects/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <section className={styles['demo-projects']}>
      {demoProjectsContent.allContent.map((project) => (
        <section key={project.title} className={styles['demo-project']}>
          <h2>{project.title}</h2>
          <div
            className="mt-8"
            dangerouslySetInnerHTML={{ __html: project.html }}
          />
          {project.images.length && (
            <Thumbnails imgs={imagesByKeys(project.images)} />
          )}
          {project.tags.length && (
            <p style={{ display: 'flex', gap: '0.5rem' }}>
              {project.tags.map((tag) => (
                <Pill>{tag}</Pill>
              ))}
            </p>
          )}
        </section>
      ))}
    </section>
  )
}
