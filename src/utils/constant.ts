export const EnvVariables = {
  VERSION_API: import.meta.env.VITE_VERSION,
  API_SERVER: import.meta.env.VITE_SERVER_API || "",
}

export enum KeysEnum {
  AUTH_SESSION = "auth_session",
  ACCESS_TOKEN = "access_token",
  REFRESH_TOKEN = "refresh_token",
  USER = "user",
  CODE_VERIFIER = "codeVerifier",
}
