import express from "express";
import bodyParser from "body-parser";
import qrCodeRoutes from "./routes/QrCodeRoutes";

const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const docs = require("./docs");

const server = express();
server.use(cors());

// Configure server to user bodyParser & the routes
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use("/api/docs", swaggerUi.serve, swaggerUi.setup(docs));

server.use("/api/qrcodes", qrCodeRoutes);

// create a server using port 5000
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log("server is running on port " + PORT);
});

module.exports = server;
