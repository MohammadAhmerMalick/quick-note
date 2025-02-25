const Favicon = ({ size = 512 }) => {
  return (
    <svg viewBox="0 0 1024 1024" width={size}>
      <circle cx="512" cy="512" r="511.9" />
      <path fill="#FDBE12" d="M512 180L247.3 741.7h529.4z" />
      <path d="M512 362.4L376.3 650.5h271.4z" />
    </svg>
  )
}

export default Favicon
