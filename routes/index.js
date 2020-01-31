import { Router } from "express";
import Controller from "../controllers/controller";
const routes = Router();
routes.post("/create", (req, res) => Controller.createQrCode(req, res));

export default routes;
