import express from "express";
import cors from 'cors'
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";

import connectDB from "./config/db.js";
import { mentorRouter } from "./routes/mentorRoutes.js";
import menteeRoute from "./routes/menteeRoute.js";
import { errorHandler, notFound } from "./middleware/errorHanlder.js";

const __dirname = path.resolve();


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
app.use(morgan("dev"))

app.use("/api/mentors", mentorRouter);
app.use("/api/mentees",menteeRoute)
// app.get("/", (req, res) => res.send("Hello World!"));
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

app.use(notFound)
app.use(errorHandler)


app.listen(PORT,()=>console.log(`app running on http://localhost:${PORT}/`))