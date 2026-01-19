# is-it-ai

A CLI tool to detect if text was written by AI.

## Environment

Requires `OPENAI_API_KEY` in `.env` or environment. Optionally set
`OPENAI_BASE_URL` for compatible APIs.

## Usage

```bash
# From argument
deno run -A main.ts "Your text here"

# From stdin
echo "Your text here" | deno run -A main.ts
```

## License

MIT
