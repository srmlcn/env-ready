export interface SchemaAdapter<T> {
  parse(env: NodeJS.ProcessEnv): T
  safeParse(
    env: NodeJS.ProcessEnv
  ): { success: true; data: T } | { success: false; error: unknown }
}
