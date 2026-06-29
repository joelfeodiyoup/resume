import { Link, useLocation } from '@tanstack/react-router'
import styles from './Header.module.scss'

const links: { path: string; label: React.ReactNode }[] = [
  { path: '/about', label: 'about' },
  { path: '/work-experience', label: 'experience' },
  { path: '/blog', label: 'technical blog' },
  { path: '/demo-projects', label: 'demo projects' },
]

export const Header = () => {
  const pathname = useLocation({
    select: (location) => location.pathname,
  })
  return (
    <section className={styles['header-layout']}>
      <section className={styles['title-section']}>
        <Link to="/">
          <h1>Joel Mundy</h1>
        </Link>{' '}
        - <a href="mailto:joel.w.mundy@gmail.com">joel.w.mundy@gmail.com</a>
      </section>
      <ul className={[styles.links].join(' ')}>
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={[
              styles.link,
              ...(pathname === link.path ? [styles.active] : []),
            ].join(' ')}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </section>
  )
}
