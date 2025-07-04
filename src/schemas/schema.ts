export interface Schema<T> {
  parse?: (env: NodeJS.ProcessEnv) => T
}
