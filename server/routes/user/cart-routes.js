import express from 'express';
import CartController from '../../controllers/user/cart-controller.js';

const router = express.Router();

router.route("/add").post(CartController.addToCart);
router.route("/get/:userId").post(CartController.fetchCartItem);
router.route("/update-cart").post(CartController.updateCartItem);
router.route("/delete/:userId/:productId").post(CartController.deleteCartItem);

export default router;