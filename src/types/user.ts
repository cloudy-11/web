export enum UserStatus {
  ACTIVE = "active",
  PENDING = "pending",
  BLOCK = "block",
  DANGER = "danger",
}

export enum UserRole {
  USER = "user",
  GUEST = "guest",
  ADMIN = "admin",
}

export type User = {
  id: string
  email: string
  handle: string
  role: string
  status: UserStatus
}
