import { z } from "zod"
import { loadEnv } from "@/core/loader"
import { InvalidEnvironmentError } from "@/errors/invalid-environment-error"

describe("loadEnv with Zod schema", () => {
  const originalEnv = process.env

  afterEach(() => {
    process.env = originalEnv
  })

  it("loads and parses valid environment variables", () => {
    process.env = {
      API_KEY: "abc123",
      PORT: "3000",
    }

    const schema = z.object({
      API_KEY: z.string(),
      PORT: z.string().regex(/^\d+$/).transform(Number),
    })

    const config = loadEnv(schema)

    expect(config.API_KEY).toBe("abc123")
    expect(config.PORT).toBe(3000)
  })

  it("throws on invalid environment variables", () => {
    process.env = {
      API_KEY: "",
      PORT: "not-a-number",
    }

    const schema = z.object({
      API_KEY: z.string().min(1),
      PORT: z.string().regex(/^\d+$/).transform(Number),
    })

    expect(() => loadEnv(schema)).toThrow(InvalidEnvironmentError)
  })

  it("supports optional variables", () => {
    process.env = {
      API_KEY: "abc123",
    }

    const schema = z.object({
      API_KEY: z.string(),
      DEBUG: z.string().optional(),
    })

    const config = loadEnv(schema)

    expect(config.API_KEY).toBe("abc123")
    expect(config.DEBUG).toBeUndefined()
  })
})
