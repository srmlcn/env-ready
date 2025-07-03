import { InvalidEnvironmentError } from "@/errors/invalid-environment-error"
import type { SchemaAdapter } from "../adapters/schema-adapter"

export function loadEnv<T>(adapter: SchemaAdapter<T>): T {
  const result = adapter.safeParse(process.env)
  if (!result.success) {
    throw new InvalidEnvironmentError(
      "Invalid environment variables",
      result.error
    )
  }
  return result.data
}
