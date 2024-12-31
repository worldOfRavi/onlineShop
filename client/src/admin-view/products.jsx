import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React, { Fragment, useState } from "react";
import { addProductFormElements } from "../config/index";
import ProductImageUpload from "@/components/admin-view/image-upload";

const initialFormData = {
  image:null,
  title:"",
  description:"",
  category:"",
  brand:"",
  price:"",
  salePrice:"",
  totalStock:""
}

const AdminProducts = () => {
  const [openCreateProductDialog, setOpenCreateProductDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const handleCreateNewProduct = (event) => {};

  return (
    <Fragment>
      <div className="flex mb-5 justify-end w-full">
        <Button onClick={() => setOpenCreateProductDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        <Sheet
          open={openCreateProductDialog}
          onOpenChange={() => setOpenCreateProductDialog(false)}
        >
          <SheetContent side="right" className="overflow-auto">
            <SheetHeader>
              <SheetTitle>Add New Product</SheetTitle>
            </SheetHeader>
            <div className="py-6">
            <ProductImageUpload />
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
      </div>
    </Fragment>
  );
};

export default AdminProducts;
