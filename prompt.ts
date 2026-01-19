import { lazy } from "./lazy.ts";
import { wtf } from "./wtf.ts";

export const getPrompt = lazy(async () => {
  const aiSignsWiki = await wtf.fetch("Wikipedia:Signs_of_AI_writing");
  if (!aiSignsWiki) {
    throw Error("Failed to fetch wiki page");
  }
  // @ts-ignore the markdown plugin is already added
  const aiSignsWikiMd = aiSignsWiki.markdown();

  return "Here is a Wikipedia article about signs of AI writing:\n" +
    "---\n" +
    aiSignsWikiMd +
    "---\n" +
    "You should judge whether the following user input is written by AI. You should answer with Yes or No.";
});

if (import.meta.main) {
  console.log(await getPrompt());
}
