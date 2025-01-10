import express from 'express';
import UserProductController from '../../controllers/user/product-controller.js';
const router = express.Router();

router.route("/get").get(UserProductController.getFilteredProducts);

export default router