import dotenv from "dotenv";
dotenv.config();

import express, { type Request, type Response } from "express";
import cors from "cors";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { z } from "zod";
import {
  getAllCatsTool,
  recommendCatsTool,
} from "./tools/recommendCats.tool.js";

// Process Error Handling
process.on("unhandledRejection", (reason: unknown, promise: Promise<unknown>) => {
  console.error("[MCP Error] Unhandled Promise Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (error: Error) => {
  console.error("[MCP Error] Uncaught Exception thrown:", error);
});

// Create server instance
const server = new McpServer({
  name: "tiny-cats-mcp",
  version: "1.0.0",
});

server.registerTool(
  "recommend_cats",
  {
    title: "recommend_cats",
    description: "Recommend the best Cat breed according to inputs",
    inputSchema: {
      kidsFriendly: z.boolean(),
      apartmentFriendly: z.boolean(),
    },
  },
  async ({ kidsFriendly, apartmentFriendly }: { kidsFriendly: boolean; apartmentFriendly: boolean }) => {
    const result = await recommendCatsTool(kidsFriendly, apartmentFriendly);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result),
        },
      ],
    };
  }
);

server.registerTool(
  "get_all_cats",
  {
    title: "all cats",
    description: "Fetch all cat data",
  },
  async () => {
    const result = await getAllCatsTool();
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result),
        },
      ],
    };
  }
);

// Determine Transport Mode (stdio for local CLI integration, sse/http for Render Web Service)
const transportMode = process.env.MCP_TRANSPORT || "sse";

if (transportMode === "stdio") {
  console.error("Starting Tiny Cats MCP Server in stdio mode...");
  const transporter = new StdioServerTransport();
  await server.connect(transporter);
  console.error("Tiny Cats MCP Server running on stdio.");
} else {
  const app = express();
  app.use(cors());
  app.use(express.json());

  // Store active SSE transports by session ID or current response
  const sseTransports = new Map<string, SSEServerTransport>();

  // Health check endpoint for Render monitoring
  app.get("/health", (_req: Request, res: Response) => {
    res.status(200).json({
      status: "online",
      server: "tiny-cats-mcp",
      version: "1.0.0",
      environment: process.env.NODE_ENV || "development",
    });
  });

  // SSE endpoint for client connection initiation
  app.get("/sse", async (req: Request, res: Response) => {
    console.log("[MCP SSE] New SSE client connection initiated.");
    const transport = new SSEServerTransport("/messages", res);
    sseTransports.set(transport.sessionId, transport);

    req.on("close", () => {
      console.log(`[MCP SSE] Connection closed for session ${transport.sessionId}`);
      sseTransports.delete(transport.sessionId);
    });

    await server.connect(transport);
  });

  // POST endpoint for message handling
  app.post("/messages", async (req: Request, res: Response) => {
    const sessionId = req.query.sessionId as string;
    const transport = sseTransports.get(sessionId);

    if (transport) {
      await transport.handlePostMessage(req, res);
    } else {
      res.status(404).json({ error: "MCP Session not found or expired." });
    }
  });

  const PORT = Number(process.env.PORT) || 3001;
  const ENV = process.env.NODE_ENV || "development";

  app.listen(PORT, () => {
    console.log("==========================================");
    console.log("🚀 Tiny Cats MCP Server Started Successfully");
    console.log(`📡 Transport: HTTP / SSE`);
    console.log(`🌐 Environment: ${ENV}`);
    console.log(`🔌 Listening on Port: ${PORT}`);
    console.log(`🔗 SSE Endpoint: http://localhost:${PORT}/sse`);
    console.log(`🔗 Health Check: http://localhost:${PORT}/health`);
    console.log("==========================================");
  });
}