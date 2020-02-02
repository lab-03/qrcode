import { Router } from "express";
import controller from "../controllers/index";
const routes = Router();
routes.post("/create", (req, res) => controller.createQrCode(req, res));

export default routes;
