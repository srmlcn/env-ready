import type { SchemaAdapter } from "../adapters/schema-adapter"

export function loadEnv<T>(adapter: SchemaAdapter<T>): T {
  const result = adapter.safeParse(process.env)
  if (!result.success) {
    console.error("Invalid environment variables:", result.error)
    process.exit(1)
  }
  return result.data
}
