# env-ready

[![Test Status](https://img.shields.io/github/actions/workflow/status/srmlcn/env-ready/test.yml?label=tests)](https://github.com/srmlcn/env-ready/actions/workflows/test.yml) [![Test Coverage](https://img.shields.io/codecov/c/github/srmlcn/env-ready)](https://codecov.io/github/srmlcn/env-ready) [![npm](https://img.shields.io/npm/v/env-ready?color=blue)](https://www.npmjs.com/package/env-ready) [![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

**env-ready** provides a centralized, fail-fast mechanism for validating environment variables at startup—designed to reduce misconfiguration, improve safety, and support your preferred schema validation library through validator inference.

## Why env-ready?

- **Type-safe by design**: Built with TypeScript for first-class static validation
- **Fail-fast startup**: Surface configuration errors early, not during execution
- **Schema-agnostic architecture**: Bring your own validator (`zod`, `joi`, etc.)
- **Minimal runtime footprint**: Focused, purpose-built utility with no bloat

## Goals

- **Centralize** environment variable validation and access
- **Fail fast** on missing or malformed variables
- Enable **schema flexibility** through validator inference
- Keep the runtime overhead **minimal** and the API **ergonomic**

## Installation

```bash
npm install env-ready
```

## Usage

### Basic Example

Create a schema using your preferred validation library, for instance, in `src/env.ts`:

```typescript
import { loadEnv } from "env-ready"
import { z } from "zod"

// Define your schema using Zod
const schema = z.object({
  FOO: z.string().min(1, "FOO is required"),
  BAR: z.number().optional(),
})

// Load and validate environment variables
export const env = loadEnv(schema)
```

Then, in your application code:

```typescript
import { env } from "./env"

console.log(env.FOO) // Access validated environment variable
console.log(env.BAR) // Optional variable, may be undefined
```

### Custom Schemas

You can also create custom schemas that implement the `parse` method:

```typescript
import { loadEnv } from "env-ready"

// Define a custom schema class
class CustomSchema<T> {
  parse(env: unknown): T {
    // Custom parsing logic here
    return env as T
  }
}

// Define your custom schema type
type MyConfig = { FOO: string; BAR?: number }

// Create an instance of your custom schema
export const mySchema = new CustomSchema<MyConfig>()

// Load and validate environment variables using your custom schema
export const env = loadEnv(mySchema)
```

## Validator Compatibility

- [Zod](https://github.com/colinhacks/zod)
- [Joi](https://github.com/hapijs/joi)
- Custom schemas
  - Must implement: `parse<T>(env: unknown): T`

## Contribute

If you find this project useful, consider:

- **Starring** the repository to improve visibility
- **Using it** in your projects and **sharing feedback**
- **Opening issues** for bugs, ideas, or validator support requests

Early adoption helps refine the direction and expand validator support. Thanks for your support!
