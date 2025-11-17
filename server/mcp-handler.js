import { runTool } from "../server/tools.js";

// ----- HTTP Handler (POST /mcp) -----
export async function handleMcpHttp(req, res) {
  const body = req.body;

  const { id, method, params } = body;

  if (method !== "tools.call") {
    return res.json({
      id,
      error: {
        type: "invalid_request",
        message: `Unsupported method: ${method}`,
      },
    });
  }

  const { name, arguments: args } = params;

  try {
    const result = await runTool(name, args);

    return res.json({
      id,
      result,
    });
  } catch (err) {
    return res.json({
      id,
      error: { type: "tool_error", message: err.message },
    });
  }
}

// ----- SSE Handler (GET /mcp) -----
export function handleMcpSse(req, res) {
  // Cursor expects SSE channel to be open
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  res.write(": ok\n\n");
}
