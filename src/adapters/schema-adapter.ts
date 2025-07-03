export interface SchemaAdapter<T> {
  parse?: (env: NodeJS.ProcessEnv) => T
}
