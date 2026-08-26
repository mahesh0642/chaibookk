import express from "express";
import "dotenv/config";
import {toNodeHandler} from  "better-auth/node";
import { auth } from "./lib/auth.js";
import cors from "cors";
import { registerRoutes } from "./routes/index.js";
import { errorHandler } from "./middleware/error-handler.middleware.js";


const app = express();
const PORT = process.env.PORT;
const clientUrl = process.env.CLIENT_URL ?? "http://localhost:3001";
console.logg('mahesh');
app.use(
    cors({
        origin: clientUrl,
        credentials: true,
    })
)

app.all("/api/auth/*", toNodeHandler(auth));
// Mount express json middleware after Better Auth handler
// or only apply it to routes that don't interact with Better Auth
app.use(express.json());

app.get("/", (req,res)=>{
    res.send("Hello World");
})

app.get("/health", (req, res)=>{
    res.json("Status: Healthy");
})

registerRoutes(app);

app.use(errorHandler);

registerRoutes(app);

app.use(errorHandler);

app.listen(8081,()=>{
    console.log("Server is running on  port 8081");
})
