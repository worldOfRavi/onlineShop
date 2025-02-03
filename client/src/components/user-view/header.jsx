import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewMenuItems } from "@/config";
import appLogo from "../../assets/logo.jpg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { authLogout } from "@/store/auth-slice";
import UserCartWrapper from "@/pages/user-view/cart-wrapper";
import { fetchCartItems } from "@/store/user/cart-slice";
import { Label } from "../ui/label";

// function to create menu items
function MenuItems() {
  const navigate = useNavigate();
  // const [getCurrentMenuItem, setGetCurrentMenuItem] = useState(null);

  function handleNavigation(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilters =
      getCurrentMenuItem.id !== "home"
        ? { category: [getCurrentMenuItem.id] }
        : null;
    sessionStorage.setItem("filters", JSON.stringify(currentFilters));
    navigate(getCurrentMenuItem.path);
  }
  // useEffect(()=>{
  //   handleNavigation(getCurrentMenuItem);
  // },[getCurrentMenuItem])
  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewMenuItems.map((menuItem) => (
        <Label
          onClick={() => 
            handleNavigation(menuItem)
          }
          className="text-sm font-medium cursor-pointer"
          key={menuItem.id}
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
}

// function to render header right content
function HeaderRightContent() {
  const { user } = useSelector((state) => state.authReducer);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const { cartItems } = useSelector((state) => state.cartSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (user && user.id) {
      dispatch(fetchCartItems(user?.id));
    }
  }, [user, dispatch]);
  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setOpenCartSheet(true)}
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="sr-only">User cart</span>
        </Button>
        {/* UsercartWrapper component contains all the cart item */}
        <UserCartWrapper cartItems={cartItems} />
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black cursor-pointer">
            {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
            <AvatarFallback className="bg-black text-white font-extrabold">
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/user/account")}>
            <UserCog className="mr-2 h-4 w-4 " />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => dispatch(authLogout())}>
            <LogOut className="mr-2 h-4 w-4 " />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

const UserHeader = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/user/home" className="flex items-center gap-2">
        <img src={appLogo} alt="logo" className="w-[65px] h-[62px] rounded-full" />
          {/* <HousePlug className="w-6 h-6" /> */}
          <span className="font-bold">Ecommerce</span>
        </Link>
        {/* this sheet content will be visisble only on small devices */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="w-6 h-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-xs">
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>
        {/* render right side content of the header */}
        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
};

export default UserHeader;
