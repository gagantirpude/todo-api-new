import express, { json } from "express";
import { config } from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./routers/userRoute.js";
import taskRouter from "./routers/taskRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";

//Server Create
const app = express();

//Middleware
app.use(express.json());
app.use(cookieParser()); // to access cookies from frontend

//Router
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);

// app.use(
//   cors({
//     origin: [process.env.FRONTEND_URL],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

//Env Config
config({
  path: "./data/config.env",
});

//Error Handler
app.use(errorMiddleware);

//Root Directory
app.get("/", (req, res) => {
  res.send(`Root Directory`);
});

//Export
export default app;
