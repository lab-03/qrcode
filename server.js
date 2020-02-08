import express from "express";
import bodyParser from "body-parser";
import mainRoutes from "./routes/index";
import qrCodeRoutes from "./routes/QrCodeRoutes";

const cors = require("cors");

const app = express();
app.use(cors());

// Configure app to user bodyParser & the routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", mainRoutes);
app.use("/api/qrcodes", qrCodeRoutes);

// create a server using port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server is running on port " + PORT);
});
