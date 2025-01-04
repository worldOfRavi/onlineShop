import { imageUploadUtils } from "../../helpers/cloudinary.js";
import handleError from "../../utils/error.js"

export const handleImageUpload = async(req, res,next) =>{
    try {
        if (!req.file) {
            return next(handleError(400, "No file uploaded."));
        }
        
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        const url = "data:" + req.file.mimetype + ";base64," + b64;
        const result = await imageUploadUtils(url);

        res.json({
            success:true,
            result
        });
    } catch (error) {
        console.log(error.message);
        next(error)
        
    }
}