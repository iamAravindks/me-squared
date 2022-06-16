import express from "express";
import cors from 'cors'
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";



const app = express()
 connectDB();

const PORT = process.env.PORT || 5000
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => res.send("Hello World!"));


app.listen(PORT,()=>console.log(`app running on http://localhost:${PORT}/`))