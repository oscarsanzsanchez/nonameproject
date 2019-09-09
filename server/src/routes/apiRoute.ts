import { Router } from "express";
import personRoutes from "./personRoutes";
import serviceRoutes from "./serviceRoutes";
import paymentRoutes from "./paymentRoutes";
import auth from "./auth";
import user from "./user";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
const routes = Router();

routes.use("/people", [checkJwt, checkRole(["ADMIN"])], personRoutes);
routes.use("/services", [checkJwt, checkRole(["ADMIN"])], serviceRoutes);
routes.use("/payments", [checkJwt, checkRole(["ADMIN"])], paymentRoutes);
routes.use("/auth", auth);
routes.use("/users", [checkJwt, checkRole(["ADMIN"])], user);

export default routes;
