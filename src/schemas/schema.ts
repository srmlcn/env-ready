export type Schema<T> = {
  parse?: (env: NodeJS.ProcessEnv) => T
}

const schemaParsingFunctions = ["parse"] as const

export type SchemaParserName = (typeof schemaParsingFunctions)[number]

function zodParser<T>(env: NodeJS.ProcessEnv, schema: Schema<T>): T {
  return schema.parse!(env)
}

export type SchemaParser = <T>(env: NodeJS.ProcessEnv, schema: Schema<T>) => T

export const schemaParsers: Record<SchemaParserName, SchemaParser> = {
  parse: zodParser,
}
