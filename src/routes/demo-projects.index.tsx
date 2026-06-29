import { createFileRoute } from '@tanstack/react-router'
import { demoProjectsContent } from '../lib/blog'
import styles from './DemoProjects.module.scss'
import { Pill } from '#/components/pill/Pill'

export const Route = createFileRoute('/demo-projects/')({
  component: RouteComponent,
})

function RouteComponent() {
  console.log(demoProjectsContent)
  return (
    <section className={styles['demo-projects']}>
      {demoProjectsContent.allContent.map((project) => {
        const { Component } = project
        return (
          <section key={project.title} className={styles['demo-project']}>
            <div>{project.title}</div>
            <p style={{ display: 'flex', gap: '0.5rem' }}>
              {project.tags.map((tag) => (
                <Pill>{tag}</Pill>
              ))}
            </p>
            <div className="mt-8">
              <Component />
            </div>
          </section>
        )
      })}
    </section>
  )
}
