export const Pills = ({ pills }: { pills: React.ReactNode[] }) => {
  return (
    <span style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
      {pills.map((pill, i) => (
        <Pill key={i}>{pill}</Pill>
      ))}
    </span>
  )
}

const Pill = ({ children }: { children: React.ReactNode }) => {
  return (
    <span
      style={{
        color: 'black',
        borderRadius: '100vh',
        background: 'var(--accent)',
        paddingInline: '1rem',
      }}
    >
      {children}
    </span>
  )
}
