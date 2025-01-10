import React, { useEffect } from 'react'
import ProductFilter from './filter'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ArrowUpDownIcon } from 'lucide-react'
import { filterOptions, sortOptions } from '@/config'
import { use } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts } from '@/store/admin/product-slice'
import UserProductTile from './product-tile'
import { fetchFilteredProducts } from '@/store/user/product-slice'

const UserListing = () => {
const dispatch = useDispatch();
const {productList} = useSelector(state=>state.userProductReducer)
// console.log(productList);

  // fetch all list of product
  useEffect(()=>{
    dispatch(fetchFilteredProducts())
  },[dispatch])
  return (
    <div className='grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6 '>
    {/* ProductFilter component holds the sidebar filter options */}
      <ProductFilter />
      <div className="bg-background w-full rounded-lg shadow-sm ">
      {/* this part contains the product count and sort options  */}
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">{`${productList?.length} ${productList?.length > 1 ? "Products" : "Product" }`}</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className='flex items-center gap-1'>
                  <ArrowUpDownIcon className='w-4 h-4' />
                  <span>Sort by</span>

                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup>
                  {
                    sortOptions.map((sortItem)=>(
                      <DropdownMenuRadioItem key={sortItem.id}>{sortItem.label}</DropdownMenuRadioItem>
                    ))
                  }
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {/* this part contains the available products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 ">
                  {
                    productList && productList?.length>0 && productList.map(product=><UserProductTile key={product.title}  product={product} />)
                  }
        </div>
      </div>
    </div>
  )
}

export default UserListing
