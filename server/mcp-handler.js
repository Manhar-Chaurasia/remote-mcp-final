import { runTool } from "./tools.js";

// ----- HTTP Handler (POST /mcp) -----
export function handleMcpHttp(req, res) {
  const { id, method, params } = req.body;

  // 1) Return list of tools
  if (method === "tools/list") {
    return res.json({
      id,
      result: {
        tools: [
          {
            name: "getContacts",
            description: "Fetch contacts from HubSpot",
            inputSchema: {
              type: "object",
              properties: {},
            },
          }
        ]
      }
    });
  }

  // 2) Execute tools
  if (method === "tools.call") {
    const { name, arguments: args } = params;

    runTool(name, args)
      .then(result => {
        res.json({ id, result });
      })
      .catch(err => {
        res.json({ id, error: { message: err.message } });
      });

    return;
  }

  // Handle unknown methods
  res.json({ id, error: { message: "Unknown method " + method } });
}


// ----- SSE Handler (GET /mcp) -----
export function handleMcpSse(req, res) {
  // Cursor expects SSE channel to be open
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  res.write(": ok\n\n");
}
