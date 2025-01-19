import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast';
import { deleteCartItem } from '@/store/user/cart-slice';
import { Minus, Plus, Trash } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

const UserCartItemsContent = ({cartItem}) => {
    const { user } = useSelector((state) => state.authReducer);
    const {toast} = useToast(); 
    
    const dispatch = useDispatch();
    function handleDeleteItem(getProductId){
        dispatch(deleteCartItem({userId:user?.id, productId:getProductId}))
        toast({
            title:"Item deleted form the cart"
        })
    }
    
  return (
    <div className='flex items-center space-x-4'>
        <img src={cartItem?.image} alt={cartItem?.title} 
            className='w-20 h-20 rounded object-cover'
        />
        <div className="flex-1">
            <h3 className="font-extrabold">{cartItem?.title}</h3>
            <div className="flex items-center mt-1 gap-2">
                <Button variant="outline" className='w-8 h-8 rounded-full' size = 'icon'>
                    <Minus className='w-4 h-4' />
                    <span className="sr-only">decrease</span>
                </Button>
                <span className='font-semibold' >{cartItem?.quantity}</span>
                <Button variant="outline" className='w-8 h-8 rounded-full' size = 'icon'>
                    <Plus className='w-4 h-4' />
                    <span className="sr-only">decrease</span>
                </Button>
            </div>
        </div>
        <div className="flex flex-col items-end">
            <p className="font-semibold">
               ${((cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) * cartItem?.quantity).toFixed(2)}
            </p>
            <Trash onClick={()=>handleDeleteItem(cartItem?.productId)} className='cursor-pointer mt-1' size={17} />
        </div>
    </div>  
  )
}

export default UserCartItemsContent
