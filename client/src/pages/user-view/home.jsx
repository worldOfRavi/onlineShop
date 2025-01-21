import React from "react";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import HeadsetIcon from '@mui/icons-material/Headset';
import SnowshoeingIcon from '@mui/icons-material/Snowshoeing';
import { Card, CardContent } from "@/components/ui/card";

const slides = [bannerOne, bannerTwo, bannerThree];

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ManIcon},
  { id: "women", label: "Women", icon: WomanIcon },
  { id: "kids", label: "Kids", icon : ChildCareIcon },
  { id: "accessories", label: "Accessories", icon : HeadsetIcon },
  { id: "footwear", label: "Footwear", icon : SnowshoeingIcon }
];

const UserHome = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* banner section start*/}
      <div className="relative w-full h-[600px] overflow-hidden">
        {slides.map((banner, index) => (
          <img
            key={index}
            src={banner}
            alt="Banner"
            className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000"
          />
        ))}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      {/* banner section end*/}

      {/* category section start */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto-px-4 ">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map(categoryItem=><Card key={categoryItem.id} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="flex flex-col justify-center items-center p-6">
                  <categoryItem.icon fontSize="large"  className="w-15 h-15 mb-4 text-primary" />
                  <span className="font-bold">{categoryItem.label}</span>
              </CardContent>
            </Card>)}
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserHome;
