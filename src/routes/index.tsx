import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="p-8">
      <p className="mt-4 text-lg">
        This is my personal CV. I hope it can add some more context about
        myself.
      </p>
      <div className="mt-8">
        <Link to="/about">about me</Link>
      </div>
      <div className="mt-8">
        <Link to="/work-experience">experience</Link>
      </div>
      <div className="mt-8">
        <Link to="/blog">technical articles</Link>
      </div>
      <div className="mt-8">
        <Link to="/demo-projects">demo projects</Link>
      </div>
    </div>
  )
}
