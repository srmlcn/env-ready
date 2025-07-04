import joi from "joi"
import { loadEnv } from "@/core/loader"
import { InvalidEnvironmentError } from "@/errors/invalid-environment-error"

describe("loadEnv with Joi schema", () => {
  const originalEnv = process.env

  afterEach(() => {
    process.env = originalEnv
  })

  it("loads and parses valid environment variables", () => {
    process.env = {
      API_KEY: "abc123",
      PORT: "3000",
    }

    const schema = joi.object({
      API_KEY: joi.string().required(),
      PORT: joi
        .string()
        .pattern(/^\d+$/)
        .required()
        .custom((value, helpers) => {
          const num = Number(value)
          if (isNaN(num)) {
            return helpers.error("any.invalid")
          }
          return num
        }, "Port must be a number"),
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

    const schema = joi.object({
      API_KEY: joi.string().required(),
      PORT: joi
        .string()
        .pattern(/^\d+$/)
        .required()
        .custom((value, helpers) => {
          const num = Number(value)
          if (isNaN(num)) {
            return helpers.error("any.invalid")
          }
          return num
        }, "Port must be a number"),
    })

    expect(() => loadEnv(schema)).toThrow(InvalidEnvironmentError)
  })

  it("supports optional variables", () => {
    process.env = {
      API_KEY: "abc123",
    }

    const schema = joi.object({
      API_KEY: joi.string().required(),
      PORT: joi
        .string()
        .pattern(/^\d+$/)
        .custom((value, helpers) => {
          const num = Number(value)
          if (isNaN(num)) {
            return helpers.error("any.invalid")
          }
          return num
        }, "Port must be a number"),
    })

    const config = loadEnv(schema)

    expect(config.API_KEY).toBe("abc123")
    expect(config.DEBUG).toBeUndefined()
  })
})
