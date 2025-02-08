import React from "react";
import img from "../../assets/account.jpg";
import Address from "@/components/user-view/address";
import { useSelector } from "react-redux";
import UserCartItemsContent from "./cart-items-contens";
import { Button } from "@/components/ui/button";
const UserCheckout = () => {
  // cart items
  const { cartItems } = useSelector((state) => state.cartSlice);
  // console.log(cartItems);
  // total Cart items price
  const totalCartItemAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] overflow-hidden">
        <img
          src={img}
          alt="cover image"
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5">
        <Address />
        <div className="flex flex-col gap-5 p-5">
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((item) => (
              <UserCartItemsContent key={item.productId} cartItem={item} />
            ))
          ) : (
            <p>You don't have any item in your cart</p>
          )}
          {/* total price */}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">total</span>
              <span className="font-bold">${totalCartItemAmount}</span>
            </div>
          </div>
          <div className="mt-3">
            <Button className="w-full">Checkout with Paypal</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCheckout;
