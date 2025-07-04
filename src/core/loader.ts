import { InvalidEnvironmentError } from "@/errors/invalid-environment-error"
import { InvalidSchemaError } from "@/errors/invalid-schema-error"
import { ensureError } from "@/errors/utils"
import {
  schemaParsers,
  type Schema,
  type SchemaParser,
  type SchemaParserName,
} from "@/schemas/schema"

export function loadEnv<T>(schema: Schema<T>): T {
  let parsed: T

  for (const [funcName, func] of Object.entries(schemaParsers)) {
    if (typeof schema[funcName as SchemaParserName] !== "function") continue

    try {
      parsed = (func as SchemaParser)(process.env, schema)
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
    `Schema must implement one of the following methods: ${Object.keys(
      schemaParsers
    ).join(", ")}`
  )
}
