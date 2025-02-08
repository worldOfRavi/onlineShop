import React, { useState } from "react";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import CommonForm from "../common/form";
const initialFormData = {
    status:""
}
const AdminOrderDetailsView = () => {
    const [formData, setFormData] = useState(initialFormData);
    const handleUpdateStatus = () =>{
        
    }
  return (
    <DialogContent className="sm:max-w-[600px]">
      {/* order details */}
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex items-center justify-between mt-6">
            <p className="font-medium">Order ID</p>
            <Label>123456</Label>
          </div>

          <div className="flex items-center justify-between mt-2">
            <p className="font-medium">Order Date</p>
            <Label>08/02/2025</Label>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="font-medium">Order Price</p>
            <Label>$500</Label>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="font-medium">Order Status</p>
            <Label>In Process</Label>
          </div>
        </div>
        <Separator />
        {/* for ordered products list */}
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Derails</div>
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span>Product One</span>
                <span>$100</span>
              </li>
            </ul>
          </div>
        </div>
        {/* shipping info */}
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>Raj Tharu</span>
              <span>16 Madrid St</span>
              <span>Scarborough</span>
              <span>M1P 4L8</span>
              <span>2424534535</span>
              <span>You are welcome</span>
            </div>
          </div>
        </div>
        {/* select button to change the order status */}
        <CommonForm
          formControls={[
            {
              label: "Order Status",
              name: "status",
              componentType: "select",
              options: [
                { id: "pending", label: "Pending" },
                { id: "inProcess", label: "In Process" },
                { id: "inShipping", label: "In Shipping" },
                { id: "delivered", label: "Delivered" },
                { id: "rejected", label: "Rejected" },
              ],
            },
          ]}
          formData={formData}
          setFormData={setFormData}
          buttonText = {"Update Order Status"}
          onSubmit={handleUpdateStatus}
        />
      </div>
    </DialogContent>
  );
};

export default AdminOrderDetailsView;
