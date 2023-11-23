export type Question = {
  id: string
  categoryId: string
  title: string
  description: string
  examples: string[]
  level: number
  isLock: boolean
  slug: string
  ghost: number
}
