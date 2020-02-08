import { Router } from "express";
import QrCodeController from "../controllers/QrCodeController";
const routes = Router();

routes.get("/", QrCodeController.getAllQrCodes);
export default routes;
