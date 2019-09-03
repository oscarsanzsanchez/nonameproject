import { Router, Request, Response } from "express";
import controller from "../controllers/paymentController";
const router = Router();

router.get("/", controller.listAll);
router.get("/:id", controller.listOne);
router.post("/new", controller.new);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
