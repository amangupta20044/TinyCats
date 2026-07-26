import express from "express";
import { testMcpController } from "../controller/test-mcp.controller.js";

const router = express.Router();

router.get("/test-mcp", testMcpController);

export default router;