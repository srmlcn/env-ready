import { ensureError } from "@/errors/utils"

describe("ensureError", () => {
  it("returns the original Error if value is an Error instance", () => {
    const err = new Error("original")
    const result = ensureError(err)
    expect(result).toBe(err)
  })

  it("wraps a string value in an Error", () => {
    const input = "something went wrong"
    const result = ensureError(input)
    expect(result).toBeInstanceOf(Error)
    expect(result.message).toContain("This value was thrown as is")
    expect(result.message).toContain(input)
  })

  it("wraps an object in an Error with JSON stringified content", () => {
    const input = { code: 500, msg: "fail" }
    const result = ensureError(input)
    expect(result).toBeInstanceOf(Error)
    expect(result.message).toContain("code")
    expect(result.message).toContain("fail")
  })

  it("handles circular references gracefully", () => {
    const input: any = {}
    input.self = input // circular reference
    const result = ensureError(input)
    expect(result).toBeInstanceOf(Error)
    expect(result.message).toContain("[Unable to stringify the thrown value]")
  })

  it("wraps undefined in a fallback Error", () => {
    const result = ensureError(undefined)
    expect(result).toBeInstanceOf(Error)
    expect(result.message).toContain("undefined")
  })

  it("wraps a number in an Error", () => {
    const result = ensureError(42)
    expect(result).toBeInstanceOf(Error)
    expect(result.message).toContain("42")
  })
})
