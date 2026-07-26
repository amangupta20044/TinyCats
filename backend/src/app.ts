import express, { type Request, type Response } from 'express';
import catsRoute from "./routes/cats.routes.js";
import aiRoute from "./routes/ai.routes.js";
import aiRecommendRoutes from './routes/aiRecommend.routes.js';
import mcpRoutes from './routes/test-mcp.routes.js';
const app=express();
app.use(express.json())

app.get('/',(req:Request,res:Response)=>{
    res.send({
        success:true,
        message:"Tiny cats is running"
    })
})

app.use("/api/cats",catsRoute)
app.use("/api/ai",aiRoute)
app.use('/api/aiRecommend',aiRecommendRoutes)
app.use('/api/mcp',mcpRoutes)

export default app;

