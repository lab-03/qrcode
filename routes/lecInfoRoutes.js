import { Router } from "express";
import lectureInfoController from "../controllers/lectureInfosController";
const routes = Router();

routes.get("/", lectureInfoController.getAllLectureInfos);
export default routes;
