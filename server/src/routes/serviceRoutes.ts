import { Router, Request, Response } from "express";
import controller from "../controllers/serviceController";
const router = Router();

router.get("/", controller.listAll);
router.get("/:id", controller.listOne);
router.get("/countpeople/all", controller.getCountAllPersons);
router.get("/countpeople/:id", controller.getCountPersonsWithService);
router.post("/new", controller.newService);
router.put("/:id", controller.updateService);
router.delete("/:id", controller.deleteService);

export default router;
