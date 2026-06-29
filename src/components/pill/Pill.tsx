export const Pill = ({ children }: { children: React.ReactNode }) => {
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
