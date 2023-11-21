export enum CategoryType {
  CODE="code",
  ENGLISH="english"
}

export type Category = {
  id: string
  type: string
  level: number
  name: string
  isLock: boolean
}
