import { InvalidEnvironmentError } from "@/errors/invalid-environment-error"
import { InvalidSchemaError } from "@/errors/invalid-schema-error"
import { ensureError } from "@/errors/utils"
import { possibleSchemaFunctions, type Schema } from "@/schemas/schema"

export function loadEnv<T>(schema: Schema<T>): T {
  let parsed: T

  for (const funcName of possibleSchemaFunctions) {
    if (schema[funcName] === undefined) continue

    try {
      parsed = schema[funcName](process.env)
    } catch (_error) {
      const error = ensureError(_error)
      throw new InvalidEnvironmentError(
        "Failed to parse environment variables",
        error
      )
    }

    return parsed
  }

  throw new InvalidSchemaError(
    `Schema must implement one of the following methods: ${possibleSchemaFunctions.join(
      ", "
    )}`
  )
}
