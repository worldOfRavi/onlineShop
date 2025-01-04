import express from 'express';
import authRouter from "./auth-route/auth-route.js";
import adminProductRouter from "./admin/products-routes.js"
const router  = express.Router();

router.use("/api/auth",authRouter);
router.use("/api/admin/products",adminProductRouter);

export default router;