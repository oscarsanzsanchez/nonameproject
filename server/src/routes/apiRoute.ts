import { Router } from "express";
import personRoutes from "./personRoutes";
import serviceRoutes from "./serviceRoutes";
import paymentRoutes from "./paymentRoutes";
const routes = Router();

routes.use("/people", personRoutes);
routes.use("/services", serviceRoutes);
routes.use("/payments", paymentRoutes);

export default routes;
