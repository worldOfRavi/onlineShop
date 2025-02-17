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
        return next(handleError(403, "You need to purchase product to review it..."))
    }

    const existingReview = await ProductReview.findOne({productId, userId});

    if(existingReview){
        return  next(handleError(400,"You have already reviewed this product"));
    }
    
    const newReview  = await ProductReview.create({productId, userId, userName, reviewMessage, reviewValue});
    const allReviews = await ProductReview.find({productId});

    const reviewsLength = allReviews.length;
    const averageReview = allReviews.reduce((sum, review)=>sum + review.reviewValue, 0) / reviewsLength;

    await Product.findByIdAndUpdate(productId , {averageReview})

    res.status(200).json({
        success:true,
        data:newReview
    })
    } catch (error) {
      console.log("Error while reviewing the product");
      next(error);
    }
  }

  static async getProductReviews(req, res, next) {
    try {
        const {productId} = req.params;

        const reviews = await ProductReview.find({productId});

        res.status(200).json({
            success:true,
            data:reviews
        })
    } catch (error) {
      console.log("Error while fetching the product reviews");
      next(error);
    }
  }
}

export default ProductReviewController;
