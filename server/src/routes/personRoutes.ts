import { Router, Request, Response } from "express";
import PersonController from "../controllers/personController";
const router = Router();

router.get("/", PersonController.listAll);
router.get("/:id", PersonController.listOne);
router.post("/new", PersonController.newPerson);
router.put("/:id", PersonController.updatePerson);
router.delete("/:id", PersonController.deletePerson);

export default router;
