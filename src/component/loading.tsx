import { FC } from "react"

import { HashLoader } from "react-spinners"

export const Loading: FC<{ size?: number; color?: string }> = ({
  size = 20,
  color = "#000000",
}) => {
  return (
    <HashLoader
      color={color}
      loading={true}
      size={size}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  )
}
