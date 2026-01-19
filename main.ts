import { judge } from "./judge.ts";
import { readAsText } from "./read_as_text.ts";

const inputText = Deno.args.at(0) ?? await readAsText(Deno.stdin.readable);
if (!inputText) {
  console.error("Error: empty input");
  Deno.exit(1);
}

const result = await judge(inputText);

console.log(result);
