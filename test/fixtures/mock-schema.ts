import type { SchemaAdapter } from "@/adapters/schema-adapter"

type MockConfig = { FOO: string }

export const mockAdapter: SchemaAdapter<MockConfig> = {
  parse(env) {
    if (!env.FOO) throw new Error("FOO is required")
    return { FOO: env.FOO }
  },
  safeParse(env) {
    try {
      const data = this.parse(env)
      return { success: true, data }
    } catch (error) {
      return { success: false, error }
    }
  },
}
