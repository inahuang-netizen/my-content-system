import { SYSTEM_PROMPT } from "@/lib/systemPrompt";

export const runtime = "edge";

export async function POST(request: Request) {
  const { mode, text, image, mimeType } = await request.json();

  if (mode === "text" && !text?.trim()) {
    return new Response("No content provided.", { status: 400 });
  }
  if (mode === "image" && !image) {
    return new Response("No image provided.", { status: 400 });
  }

  const userMessage =
    mode === "image"
      ? {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: mimeType,
                data: image,
              },
            },
            {
              type: "text",
              text: "Extract all visible copy from this screenshot and run a full tone check on it.",
            },
          ],
        }
      : {
          role: "user",
          content: `Run a tone check on this content:\n\n${text}`,
        };

  let anthropicRes: Response;
  try {
    anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY ?? "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-opus-4-6",
        max_tokens: 16000,
        stream: true,
        system: SYSTEM_PROMPT,
        messages: [userMessage],
      }),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!anthropicRes.ok) {
    const body = await anthropicRes.text();
    return new Response(JSON.stringify({ error: body }), {
      status: anthropicRes.status,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Parse the SSE stream from Anthropic and forward only text_delta content
  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      const reader = anthropicRes.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const data = line.slice(6).trim();
            if (!data || data === "[DONE]") continue;
            try {
              const event = JSON.parse(data);
              if (
                event.type === "content_block_delta" &&
                event.delta?.type === "text_delta"
              ) {
                controller.enqueue(encoder.encode(event.delta.text));
              }
            } catch {
              // ignore malformed SSE lines
            }
          }
        }
        controller.close();
      } catch (err) {
        controller.error(err);
      }
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
