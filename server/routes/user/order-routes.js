import express from 'express';
import OrderController from '../../controllers/user/Order-Controller.js';

const route = express.Router();

route.route("/create").post(OrderController.createOrder)

export default route;