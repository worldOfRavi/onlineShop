import express from 'express';
import authRouter from "./auth-route/auth-route.js";
import adminProductRouter from "./admin/products-routes.js";
import userProductRouter from "./user/products-route.js"
import cartRouter from "./user/cart-routes.js"
const router  = express.Router();

// auht route
router.use("/api/auth",authRouter);
// admin route
router.use("/api/admin/products",adminProductRouter);
// user route
router.use("/api/user/products",userProductRouter);
// cart route
router.use("/api/user/cart", cartRouter);

export default router;