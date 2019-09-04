import { Router, Request, Response } from "express";
import controller from "../controllers/serviceController";
const router = Router();

router.get("/", controller.listAll);
router.get("/:id", controller.listOne);
router.get("/countpeople/all", controller.countPersons);
router.post("/new", controller.newService);
router.put("/:id", controller.updateService);
router.delete("/:id", controller.deleteService);

export default router;
