export class InvalidEnvironmentError extends Error {
  readonly cause?: unknown

  constructor(message: string, cause?: unknown) {
    super(message)
    this.name = "InvalidEnvironmentError"
    this.cause = cause
  }
}
