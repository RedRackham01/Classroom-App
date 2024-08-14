import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import classroomRoutes from "./routes/classroomRoutes.js"; 
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";

//rest object
const app = express();

//configure env
dotenv.config();

//path config
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

//databse config
connectDB();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
// app.use(express.static(path.join(__dirname, "./client/build")));

//routes
app.use("/auth", authRoutes);
app.use("/classroom", classroomRoutes);
// app.use("/product", productRoutes);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>Classroom Backend Server Running........</h1>");
});
// app.use("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`.bgCyan.white);
});
