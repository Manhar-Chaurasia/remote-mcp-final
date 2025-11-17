import { runTool } from "./tools.js";

export function handleMcpHttp(req, res) {
  const { id, method, params } = req.body;

  // Return the list of tools
  if (method === "tools/list") {
    return res.json({
      jsonrpc: "2.0",
      id,
      result: {
        tools: [
          {
            name: "getContacts",
            description: "Fetch contacts from HubSpot CRM",
            inputSchema: { type: "object", properties: {} },
            outputSchema: {
              type: "object",
              properties: {
                contacts: { type: "array", items: { type: "object" } },
              },
            },
          },
        ],
      },
    });
  }

  // Execute a tool
  if (method === "tools/call") {
    const { name, arguments: args } = params;

    runTool(name, args)
      .then((data) => {
        res.json({
          jsonrpc: "2.0",
          id,
          result: data,
        });
      })
      .catch((err) => {
        res.json({
          jsonrpc: "2.0",
          id,
          error: { message: err.message },
        });
      });

    return;
  }

  // Unknown method
  return res.json({
    jsonrpc: "2.0",
    id,
    error: { message: `Unsupported method: ${method}` },
  });
}
