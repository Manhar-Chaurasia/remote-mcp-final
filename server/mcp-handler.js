// mcp-handler.js
import { runTool } from "./tools.js";

export function handleMcpHttp(req, res) {
  const { id, method, params } = req.body;

  // 1) LIST TOOLS (CRITICAL)
  if (method === "tools/list") {
    return res.json({
      id,
      result: {
        tools: [
          {
            name: "getContacts",
            description: "Fetch contacts from HubSpot CRM",
            inputSchema: {
              type: "object",
              properties: {},
              required: []
            }
          }
        ]
      }
    });
  }

  // 2) CALL TOOL
  if (method === "tools/call") {
    const { name, arguments: args } = params;

    runTool(name, args)
      .then((result) => {
        res.json({ id, result });
      })
      .catch((err) => {
        res.json({
          id,
          error: {
            message: err.message,
          },
        });
      });

    return;
  }

  // 3) UNKNOWN METHOD
  res.json({
    id,
    error: {
      message: `Unknown method: ${method}`,
    },
  });
}
