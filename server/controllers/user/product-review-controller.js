import Order from "../../models/Order.js";
import ProductReview from "../../models/Review.js";
import Product from "../../models/Product.js";
import handleError from "../../utils/error.js";

class ProductReviewController {
  // function to add a review to a product
  static async addProductReview(req, res, next) {
    try {
      const { productId, userId, userName, reviewMessage, reviewValue } =
        req.body;
        
    const order = await Order.findOne({
        userId, 
        "cartItems.productId" : productId,
        orderStatus : 'confirmed'
    });
    if(!order){
        return handleError(403, "You need to purchase product to review it...")
    }
     
    } catch (error) {
      console.log("Error while reviewing the product");
      next(error);
    }
  }

  static async getProductReviews(req, res, next) {
    try {
    } catch (error) {
      console.log("Error while fetching the product reviews");
      next(error);
    }
  }
}

export default ProductReviewController;
