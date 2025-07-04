import { loadEnv } from "@/core/loader"
import { mockSchema } from "./fixtures/mock-schema"
import { InvalidEnvironmentError } from "@/errors/invalid-environment-error"
import { InvalidSchemaError } from "@/errors/invalid-schema-error"

describe("loadEnv", () => {
  const originalEnv = process.env

  beforeEach(() => {
    process.env = {}
  })

  afterEach(() => {
    process.env = originalEnv
  })

  it("loads env vars when valid", () => {
    type MockConfig = { FOO: string }

    process.env.FOO = "bar"
    const config = loadEnv<MockConfig>(mockSchema)
    expect(config.FOO).toBe("bar")
  })

  it("throws EnvValidationError when invalid", () => {
    delete process.env.FOO

    expect(() => loadEnv(mockSchema)).toThrow(InvalidEnvironmentError)
  })

  it("attaches the cause to the error", () => {
    delete process.env.FOO

    try {
      loadEnv(mockSchema)
    } catch (err) {
      expect(err).toBeInstanceOf(InvalidEnvironmentError)
      expect((err as InvalidEnvironmentError).cause).toBeDefined()
    }
  })

  it("throws InvalidSchemaError when schema is invalid", () => {
    const invalidSchema = {} as any

    expect(() => loadEnv(invalidSchema)).toThrow(InvalidSchemaError)
  })
})
