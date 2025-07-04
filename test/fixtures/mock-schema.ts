import type { Schema } from "@/schemas/schema"

type MockConfig = { FOO: string }

export const mockSchema: Schema<MockConfig> = {
  parse(env) {
    if (!env.FOO) throw new Error("FOO is required")
    return { FOO: env.FOO }
  },
}
