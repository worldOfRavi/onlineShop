import Product from "../../models/Product.js";

class UserProductController{
    static async getFilteredProducts(req, res, next){
        try {
            const {category, brand, sortBy} = req.query;

            let filters = {};

            if(category.length){
                filters.category = {$in :category.split(",")}
            }

            if(brand.length){
                filters.brand = {$in : brand.split(",")}
            }

            let sort = {};

            switch(sortBy){
                case "price-lowtohigh" :
                sort.price = 1
                break;
                case "price-hightolow" :
                sort.price = -1
                break;
                case "title-atoz":
                sort.title = 1
                break;
                case "title-ztoa":
                sort.title = -1
                break;

                default:
                sort.price = 1
                break
            }
            console.log(sort);
            

            const products = await Product.find(filters).sort(sort);
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