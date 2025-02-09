import { Schema, model } from "mongoose";

const orderSchema  = new Schema({
    userId : String,
    cartItems : [
        {
            productId : String,
            title : String,
            image : String,
            price : String,
            quantity : Number
        }
    ],
    addressInfo : {
        addressId : string,
        address : string,
        city : string,
        pincode : string,
        phone : string,
        notes : string
    },
    orderStatus : string,
    paymentMethod : string,
    paymentStatus : string,
    totalAmount : Number,
    orderDate : Date,
    orderUpdateDate : Date,
    paymentId : string,
    payerId : string
});

const Order = model("Order", orderSchema);

export default Order;