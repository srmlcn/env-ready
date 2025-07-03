import { loadEnv } from "@/core/loader"
import { mockAdapter } from "./fixtures/mock-schema"
import { InvalidEnvironmentError } from "@/errors/invalid-environment-error"

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
    const config = loadEnv<MockConfig>(mockAdapter)
    expect(config.FOO).toBe("bar")
  })

  it("throws EnvValidationError when invalid", () => {
    delete process.env.FOO

    expect(() => loadEnv(mockAdapter)).toThrow(InvalidEnvironmentError)
  })
})
