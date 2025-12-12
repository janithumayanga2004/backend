import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRouter from "./routes/auth"
import { Role } from "./models/userModel"
import { authenticate } from "./middleware/auth"
import estateRouter from "./routes/estateRoute"
import divisionRouter from "./routes/divisionRoute"
import labourRouter from "./routes/labourRoute"
import categoryRouter from "./routes/categoryRoute"
import agriculturalImplementsRouter from "./routes/agriculturalImplementsRoute"
import harvestRouter from "./routes/harvestRoute";
import attendanceRouter from "./routes/attendanceRoute";

dotenv.config()

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI as string

const app = express()

app.use(
  cors({
    origin: [
      "http://localhost:8080",   // ← React dev server (your case)
      "http://localhost:5173",   // ← Vite default
      
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

app.use("/api/v1/auth", authRouter)

app.use("/api/v1/estate", estateRouter)

app.use("/api/v1/division", divisionRouter);

app.use("/api/v1/labour", labourRouter);

app.use("/api/v1/category", categoryRouter);


app.use("/api/v1/agriculturalImplements", agriculturalImplementsRouter);

app.use("/api/v1/harvest", harvestRouter);

app.use("/api/v1/attendance", attendanceRouter);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("DB connected")
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })

app.listen(PORT, () => {
  console.log("Server is running")
})