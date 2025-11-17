import express from "express";
import cors from "cors";
import { handleMcpHttp, handleMcpSse } from "../server/mcp-handler.js";

const app = express();
app.use(express.json());
app.use(cors());

// SSE endpoint for streaming responses (Cursor expects this)
app.get("/mcp", handleMcpSse);

// HTTP POST for normal MCP tool requests
app.post("/mcp", handleMcpHttp);

// PORT from Render OR fallback
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Remote MCP Server running on port", PORT);
});
