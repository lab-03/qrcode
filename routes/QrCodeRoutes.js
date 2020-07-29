import { Router } from "express";
import QrCodeController from "../controllers/QrCodeController";
const routes = Router();

routes.get("/", QrCodeController.getAllQrCodes);
routes.delete("/delete", (req, res) => QrCodeController.deleteQrCode(req, res));
routes.post("/get", (req, res) => QrCodeController.getQrCode(req, res));
routes.post("/create", (req, res) => QrCodeController.createQrCode(req, res));
routes.put("/end", (req, res) => QrCodeController.invalidate(req, res));
routes.post("/attend", (req, res) => QrCodeController.attend(req, res));

export default routes;
