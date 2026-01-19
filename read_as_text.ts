export async function readAsText(
  readable: ReadableStream<Uint8Array>,
): Promise<string> {
  let result = "";
  for await (const chunk of readable.pipeThrough(new TextDecoderStream())) {
    result += chunk;
  }
  return result;
}
