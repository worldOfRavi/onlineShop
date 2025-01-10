import Product from "../../models/Product";

class UserProductController{
    static async getFilteredProducts(req, res, next){
        try {
            const products = await Product.find({});
            res.status(200).json({
                success:true,
                data:products
            })
        } catch (error) {
            console.log("error while fetching products by user ", error.message);
            next(error)
        }
    }
}
export default UserProductController;