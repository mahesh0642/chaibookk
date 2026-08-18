import express from "express";
import "dotenv/config"
const app = express();


app.get("/", (req,res)=>{
    res.send("Hello World");
})

app.get("/health", (req, res)=>{
    res.json("Status: Healthy");
})

app.listen(8081,()=>{
    console.log("Server is running on  port 8081");
})