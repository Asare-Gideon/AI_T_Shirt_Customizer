import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import delleRoute from "./routes/delle.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use("/app/v1/delle", delleRoute);

app.get("/", (req, res) => {
  res.status(200).json({ message: "hello from sever" });
});

app.listen(5000, () => {
  console.log("server running");
});
