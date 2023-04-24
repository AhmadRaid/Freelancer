import express from "express";

function createServer() {
  const app = express();

  app.use(express.json());

  app.use("/api", require("../routes/mainRoute"));

  app.use("*", (req, res) => res.status(404).send("NOT FOUND PAGE Ahmad Raid"));

  return app;
}

export default createServer;