import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/work-experience/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <section style={{ paddingTop: '2rem' }}>
      <iframe
        src="/resume/resume_joel_mundy_2026_05_04.pdf"
        width="100%"
        height="800px"
        style={{ border: 'none' }}
      />
    </section>
  )
}
