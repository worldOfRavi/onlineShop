import express from 'express';
import AuthController from '../../controllers/auth/auth-controller.js';
const router = express.Router();

router.route("/register").post(AuthController.authRegister)

export default router;