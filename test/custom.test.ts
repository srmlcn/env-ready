import { loadEnv } from "@/core/loader"

class CustomSchema<T> {
  parse(env: unknown): T {
    return env as T
  }
}

type MyConfig = { FOO: string; BAR?: number }

describe("loadEnv with a custom schema", () => {
  const originalEnv = process.env

  afterEach(() => {
    process.env = originalEnv
  })

  it("loads environment variables", () => {
    process.env = { FOO: "value", BAR: "123" }

    const schema = new CustomSchema<MyConfig>()
    const result = loadEnv(schema)

    expect(result.FOO).toBe("value")
    expect(result.BAR).toBe("123") // still a string — no coercion
  })

  it("respects optional fields", () => {
    process.env = { FOO: "present" }

    const schema = new CustomSchema<MyConfig>()
    const result = loadEnv(schema)

    expect(result.FOO).toBe("present")
    expect(result.BAR).toBeUndefined()
  })
})
