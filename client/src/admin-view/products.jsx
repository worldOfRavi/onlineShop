import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React, { Fragment, useEffect, useState } from "react";
import { addProductFormElements } from "../config/index";
import ProductImageUpload from "@/components/admin-view/image-upload";
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct, fetchAllProducts } from "@/store/admin/product-slice";
import { useToast } from "@/hooks/use-toast";
import ProductTile from "./Product-tile";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

const AdminProducts = () => {
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  // product image upload component is separate from this file but the state is managed in this file
  const [imageFile, setImageFile] = useState(null);
  // url of lastly uploaded file
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const [imageLoading, setImageLoading] = useState(false);

  const dispatch = useDispatch();
  const {productList} = useSelector((state)=>state.productReducer);

  const {toast} = useToast();


  const handleCreateNewProduct = (event) => {
    event.preventDefault();
    dispatch(addNewProduct({
      ...formData,
      image:uploadedImageUrl
    })).then((data)=>{
      if(data?.payload?.success){
        toast({
          title: data?.payload?.message
        })
        setUploadedImageUrl("");
        setFormData(initialFormData);
        setOpenCreateProductDialog(false);
        dispatch(fetchAllProducts())
      }
      else{
        toast({
          title:"Something went wrong...",
          variant:"destructive"
        })
      }
    })

  };

  // fetch all product data
  useEffect(()=>{
    dispatch(fetchAllProducts())
  },[dispatch]);

  

  return (
    <Fragment>
      <div className="flex mb-5 justify-end w-full">
        <Button onClick={() => setOpenCreateProductDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {/* Products will appear here */}
        {
          productList && productList.length>0 ? productList.map((productItem, id)=><ProductTile key={id.toString()} product={productItem} />) : ""
        }
      </div>
      <Sheet
          open={openCreateProductDialog}
          onOpenChange={() => setOpenCreateProductDialog(false)}
        >
          <SheetContent side="right" className="overflow-auto">
            <SheetHeader>
              <SheetTitle>Add New Product</SheetTitle>
            </SheetHeader>
            <div className="py-6">
              {/* image upload component */}
              <ProductImageUpload
                file={imageFile}
                setFile={setImageFile}
                uploadedImageUrl={uploadedImageUrl}
                setUploadedImageUrl={setUploadedImageUrl}
                imageLoading={imageLoading}
                setImageLoading={setImageLoading}
              />
              <CommonForm
                formControls={addProductFormElements}
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleCreateNewProduct}
                buttonText="Add Product"
              />
            </div>
          </SheetContent>
        </Sheet>
    </Fragment>
  );
};

export default AdminProducts;
