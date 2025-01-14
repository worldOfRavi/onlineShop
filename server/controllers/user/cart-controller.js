import Cart from "../../models/Cart";
import Product from "../../models/Product";
import handleError from "../../utils/error";


class CartController {
    // function to add item to cart
    static async addToCart(req, res, next){
        try {
            const {userId, productId, quantity} = req.body;

            // if any of them does not present return wiith an error
            if(!userId || !productId || !quantity){
                return next(handleError(400, "Invalid data provided"));
            }

            const product = await Product.findById(productId);

            if(!product) return next(handleError(404, "Product not found"));

            let cart = await Cart.findOne({userId});
            
            // if there is not cart for a user, then new cart will be created before adding any item to cart
             if(!cart){
                cart = new Cart({userId, items : []});
             }
            //  see if the item that a user want to add to the cart,    already present in the cart or not?
            // for that find the index of the item in the cart, it does not present then the index will be -1

            const findCurrentProductIndex = cart.items.findIndex(item=>item.productId.toString() === productId);

            if(findCurrentProductIndex === -1){
                cart.items.push({productId, quantity});
            }
            else{
                cart.items[findCurrentProductIndex].quantity += quantity;
            }

            await cart.save();

            res.status(200).json({
                success:true,
                data:cart
            })
            
            
        } catch (error) {
            console.log("Error while adding to product to cart ", error.message);
            next(error)
        }
    }

    // function to fetch cart items
    static async fetchCartItem(req, res, next){
        try {

            const {userId} = req.params;
            if(!userId) return next(handleError(404, "User id is mandatory"));

            const cart = await Cart.findOne({userId});

            
        } catch (error) {
            console.log("Error while fetching item from cart ", error.message);
            next(error)
        }
    }

    // function to update cart item 
    static async updateCartItem(req, res, next){
        try {
            
        } catch (error) {
            console.log("Error while updating item of cart ", error.message);
            next(error)
        }
    }

    // function to delete cart item
    static async deleteCartItem(req, res, next){
        try {
            
        } catch (error) {
            console.log("Error while deleting cart item ", error.message);
            next(error)
        }
    }

    static async addToCart(req, res, next){
        try {
            
        } catch (error) {
            console.log("Error while adding to product to cart ", error.message);
            next(error)
        }
    }
}

export default CartController;