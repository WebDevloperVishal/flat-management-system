import express from "express"
import dotenv from "dotenv"
import rootRouter from "./routes/index.js";
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

const app = express();

const PORT=5000;

app.use(express.json())

app.use(cors({
    origin:"*",
    methods:["GET","PUT","POST","DELETE"],
    allowedHeaders:["Content-Type","auth-token"]
}))

app.use("/uploads",express.static(path.join(__dirname,"uploads")));

app.get('/',(req,res)=>{
    res.send("Backend Running")
})

app.use('/api',rootRouter)

app.listen(PORT,()=>{
    console.log(`Server runing on PORT no ${PORT}`)
})