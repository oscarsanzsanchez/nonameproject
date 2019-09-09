import { Router, Request, Response } from "express";
import PersonController from "../controllers/personController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
const router = Router();

router.get("/", [checkJwt, checkRole(["ADMIN"])],PersonController.listAll);
router.get("/:id", PersonController.listOne);
router.post("/new", PersonController.newPerson);
router.put("/:id", PersonController.updatePerson);
router.delete("/:id", PersonController.deletePerson);

export default router;
