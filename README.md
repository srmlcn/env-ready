# env-ready

**env-ready** is a schema-driven environment variable loader for Node.js projects.

It provides a centralized, fail-fast mechanism for validating environment variables at startup—designed to reduce misconfiguration, improve safety, and support your preferred schema validation library through adapter-based extensibility.

## Why env-ready?

- **Type-safe by design**: Built with TypeScript for first-class static validation
- **Fail-fast startup**: Surface configuration errors early, not during execution
- **Schema-agnostic architecture**: Bring your own validator (`zod`, `joi`, etc.)
- **Minimal runtime footprint**: Focused, purpose-built utility with no bloat

## Goals

- **Centralize** environment variable validation and access
- **Fail fast** on missing or malformed variables
- Enable **schema flexibility** through pluggable adapters
- Keep the runtime overhead **minimal** and the API **ergonomic**

## Contribute

If you find this project useful, consider:

- **Starring** the repository to improve visibility
- **Using it** in your projects and **sharing feedback**
- **Opening issues** for bugs, ideas, or validator support requests

Early adoption helps refine the direction and expand validator support. Thanks for your support!
