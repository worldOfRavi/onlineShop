import express from 'express';
import { handleImageUpload } from '../../controllers/admin/products-controller.js';
import { upload } from '../../helpers/cloudinary.js';

const router = express.Router();

router.route("/upload-image").post( upload.single("my_file") ,handleImageUpload);

export default router;
