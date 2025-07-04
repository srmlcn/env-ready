export type Schema<T> = {
  parse?: (env: NodeJS.ProcessEnv) => T
  validate?: (env: NodeJS.ProcessEnv) => { value: T; error?: Error }
}

const schemaParsingFunctions = ["parse", "validate"] as const

export type SchemaParserName = (typeof schemaParsingFunctions)[number]

function zodParser<T>(env: NodeJS.ProcessEnv, schema: Schema<T>): T {
  return schema.parse!(env)
}

function joiParser<T>(env: NodeJS.ProcessEnv, schema: Schema<T>): T {
  const result = schema.validate!(env)
  if (result.error) {
    throw result.error
  }

  return result.value as T
}

export type SchemaParser = <T>(env: NodeJS.ProcessEnv, schema: Schema<T>) => T

export const schemaParsers: Record<SchemaParserName, SchemaParser> = {
  parse: zodParser,
  validate: joiParser,
}
