to enable cors(cross origin resource sharing).
app.use(cors({
    origin:"http://localhost:5174/",
    methods:["GET", "POST", "DELETE", "PUT"],
    allowedHeaders:[
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma"
    ],
    credentials:true
}))


for image uplaod in cloudinary follow the following steps.
1. create an id in cloudinary
2. create any helper function for example cloudinary.js which will contain the following code
--------------------------------
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

// configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
});

// create storage
const storage =  multer.memoryStorage();


// image upload function
export async function imageUploadUtils(file){
    const result = await cloudinary.uploader.upload(file,{
        resource_type:"auto"
    });

    return result;
}

export const upload  = multer({storage});
--------------------------------

2. make another controler file with a imageUplaod function which contain the following code
--------------------------
export const handleImageUpload = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(handleError(400, "No file uploaded."));
    }

    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtils(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};
-------------------------