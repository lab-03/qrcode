import { Router } from "express";
import QrCodeController from "../controllers/QrCodeController";
const routes = Router();

routes.get("/", QrCodeController.getAllQrCodes);
routes.post("/create", (req, res) => QrCodeController.createQrCode(req, res));
routes.post("/attend", (req, res) => QrCodeController.attend(req, res));

export default routes;
