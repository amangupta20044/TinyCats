import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";
import dotenv from "dotenv";
dotenv.config();

let clientInstance: Client | null = null;

const getMcpSseUrl = (): URL => {
  const rawUrl = process.env.MCP_SERVER_URL || "https://tinycatsmcpsrver.onrender.com";
  const cleanUrl = rawUrl.replace(/\/$/, "");
  const finalSseUrl = cleanUrl.endsWith("/sse") ? cleanUrl : `${cleanUrl}/sse`;
  return new URL(finalSseUrl);
};

export const getMcpClient = async (): Promise<Client> => {
  if (clientInstance) {
    return clientInstance;
  }

  try {
    const sseUrl = getMcpSseUrl();
    console.log(`[MCP Client] Connecting to remote MCP server SSE endpoint: ${sseUrl.toString()}`);

    const transport = new SSEClientTransport(sseUrl);

    const client = new Client({
      name: "tiny-cats-backend-client",
      version: "1.0.0",
    });

    await client.connect(transport);
    clientInstance = client;
    console.log(`[MCP Client] Successfully connected to MCP server at ${sseUrl.toString()}`);
    return client;
  } catch (error) {
    console.error("[MCP Client Error] Failed to connect to remote MCP server:", error);
    throw new Error(
      `Unable to connect to Tiny Cats MCP server at ${process.env.MCP_SERVER_URL || "https://tinycatsmcpsrver.onrender.com"}. ${error instanceof Error ? error.message : ""}`
    );
  }
};