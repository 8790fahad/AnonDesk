

import bodyParser from "body-parser";
import express from "express";
import { PrismaClient } from "@prisma/client";

import { stat } from "fs";

export const prisma = new PrismaClient();

const app = express();
const port = 4001;

app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
// Register request routes

require("./routes/request")(app);
app.get("/", (req, res) => {
  res.json({status: "ok"});
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});