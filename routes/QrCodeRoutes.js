import { Router } from "express";
import QrCodeController from "../controllers/QrCodeController";
const routes = Router();

routes.get("/", QrCodeController.getAllQrCodes);
routes.get("/get", (req, res) => QrCodeController.getQrCode(req, res));
routes.delete("/delete", (req, res) => QrCodeController.deleteQrCode(req, res));
routes.post("/create", (req, res) => QrCodeController.createQrCode(req, res));
routes.post("/end", (req, res) => QrCodeController.invalidate(req, res));
routes.post("/attend", (req, res) => QrCodeController.attend(req, res));

export default routes;
