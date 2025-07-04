export interface Schema<T> {
  parse?: (env: NodeJS.ProcessEnv) => T
}

export const possibleSchemaFunctions = ["parse"] as const
