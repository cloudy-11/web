export enum CategoryType {
  CODE = "code",
  ENGLISH = "english",
}

export enum CategoryLevel {
  ELEMENTARY = 1,
  INTERMEDIATE = 2,
  ADVANCED = 3,
}

export type Category = {
  id: string
  type: string
  level: number
  name: string
  isLock: boolean
  slug: string
}
