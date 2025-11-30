import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const PORT= 5000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Flat management Backend is running");
})

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})