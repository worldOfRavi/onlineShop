import { HousePlug } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const UserHeader = () => {
  return (
    <header className='sticky top-0 z-40 border-b bg-background'>
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/user/home" className='flex items-center gap-2'>
            <HousePlug className='w-6 h-6' />
            <span className='font-bold'>Ecommerce</span>
        </Link>
         
      </div>
    </header>
  )
}

export default UserHeader
