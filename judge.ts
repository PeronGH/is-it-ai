import { getPrompt } from "./prompt.ts";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: Deno.env.get("OPENAI_API_KEY"),
  baseURL: Deno.env.get("OPENAI_BASE_URL"),
});

export type JudgeResult = {
  yes: number;
  no: number;
};

export async function judge(text: string): Promise<JudgeResult> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: await getPrompt() },
      { role: "user", content: text },
    ],
    logprobs: true,
    top_logprobs: 20,
    max_completion_tokens: 1,
  });

  const logprobs = response.choices[0]?.logprobs?.content ?? [];
  let yes = 0;
  let no = 0;

  for (const token of logprobs) {
    if (token.top_logprobs) {
      for (const lp of token.top_logprobs) {
        if (lp.token.toLowerCase().includes("yes")) {
          yes += Math.exp(lp.logprob);
        } else if (lp.token.toLowerCase().includes("no")) {
          no += Math.exp(lp.logprob);
        }
      }
    }
  }

  return { yes, no };
}
