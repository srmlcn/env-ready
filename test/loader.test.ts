import { loadEnv } from "@/core/loader"
import { mockAdapter } from "./fixtures/mock-schema"

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

  it("exits on invalid env vars", () => {
    const spy = jest.spyOn(process, "exit").mockImplementation(() => {
      throw new Error("process.exit")
    })

    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {})

    expect(() => loadEnv(mockAdapter)).toThrow("process.exit")

    spy.mockRestore()
    errorSpy.mockRestore()
  })
})
