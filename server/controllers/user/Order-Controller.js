import paypal from "../../helpers/Paypal.js";
import Order from "../../models/Order.js";
import handleError from "../../utils/error.js";

class OrderController {
  static async createOrder(req, res, next) {
    try {
      const {
        userId,
        cartItems,
        addressInfo,
        orderStatus,
        paymentMethod,
        paymentStatus,
        totalAmount,
        orderDate,
        orderUpdateDate,
        paymentId,
        payerId,
      } = req.body;

      //   creating payment json
      const create_payment_json = {
        intent: "sale",
        payer: {
          payment_method: "paypal",
        },
        redirect_urls: {
          return_url: "http://localhost:5173/user/paypal-return",
          cancel_url: "http://localhost:5173/user/paypal-cancel",
        },
        transactions: [
          {
            item_list: {
              items: cartItems.map((item) => ({
                name: item.title,
                sku: item.productId,
                price: Number(item.price || 0).toFixed(2),
                currency: "USD",
                quantity: item.quantity,
              })),
            },
            amount: {
              currency: "USD",
              total: Number(totalAmount || 0).toFixed(2),
            },
            description: "description",
          },
        ],
      };

      //   // Create payment instance
      paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
        if (error) {
          console.log("Error while making payment instance ", error.message);
          // next handleError(500, "Payment Error")
          res.status(500).json({
            success: false,
            message: "Error while creating paypal payment",
          });
        } else {
          // Check for approval URL
          const approvalLink = paymentInfo.links?.find(
            (link) => link.rel === "approval_url"
          );
          if (!approvalLink) {
            return res
              .status(500)
              .json({ success: false, message: "Approval URL not found" });
          }
          const newlyCreatedOrder = new Order({
            userId,
            cartItems,
            addressInfo,
            orderStatus,
            paymentMethod,
            paymentStatus,
            totalAmount,
            orderDate,
            orderUpdateDate,
            paymentId,
            payerId,
          });

          await newlyCreatedOrder.save();
          
          res.status(201).json({
            success: true,
            approvedURL : approvalLink.href,
            orderId: newlyCreatedOrder._id,
          });
        }
      });
    } catch (error) {
      console.log("Error while creating new order ", error.message);
      next(error);
    }
  }

  static async capturePayment(req, res, next) {
    try {
      const {} = req.body;
    } catch (error) {
      console.log("Error while creating new order ", error.message);
      next(error);
    }
  }
}

export default OrderController;
