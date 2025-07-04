import { InvalidEnvironmentError } from "@/errors/invalid-environment-error"
import type { Schema } from "@/schemas/schema"

export function loadEnv<T>(adapter: Schema<T>): T {
  const result = adapter.safeParse(process.env)
  if (!result.success) {
    throw new InvalidEnvironmentError(
      "Invalid environment variables",
      result.error
    )
  }
  return result.data
}
