/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SERVER_API: string
  readonly VITE_VERSION: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
