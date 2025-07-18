// Importing Dependencies
import express from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";

import connectDB from "./configs/db.js";

// Initializing Dependencies
const app = express();
const PORT = 3000;

// Connected DB
await connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

// API Routes
app.get("/", (req, res) => {
  res.send("ScreenTime Server is LIVE!!");
});

app.use("/api/inngest", serve({ client: inngest, functions }));

// PORT Route
app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
