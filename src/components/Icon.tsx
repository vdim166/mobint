import "./Icon.css"

export const Icon = ({
  className,
  filter,
}: {
  className: string
  filter: string
}) => {
  return <img style={{ filter: filter }} className={`icon-img ${className}`} />
}
