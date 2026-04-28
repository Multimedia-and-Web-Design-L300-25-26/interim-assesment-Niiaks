import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB, disconnectDB } from "./configs/db.js";
import { seedCryptos } from "./configs/seed.js";
import authRoutes from "./routes/auth.js";
import cryptoRoutes from "./routes/crypto.js";

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/crypto", cryptoRoutes);

app.get("/api", (req, res) => {
  res.send("API is live");
});

let server;

async function startServer() {
  try {
    await connectDB();
    await seedCryptos();
    server = app.listen(PORT, () => {
      console.log("server is running on port: ", PORT);
    });
  } catch (error) {
    console.log("error starting server", error);
    process.exit(1);
  }
}

startServer();

function shutdown() {
  console.log("server is shutting down");
  server.close(() => {
    disconnectDB();
    console.log("server closed");
  });

  setTimeout(() => {
    process.exit(1);
  }, 10000).unref();
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
process.on("uncaughtException", (error) => {
  console.log(error);
  shutdown();

  setTimeout(() => {
    process.exit(1);
  }, 5000).unref();
});
