import React from 'react'
import { Outlet } from 'react-router-dom'
import Adminsidebar from './sidebar'
import AdminHeader from './header'

const Adminlayout = () => {
  return (
    <div className='flex min-h-screen w-full'>
      {/* admin side bar */}
      <Adminsidebar />
      <div className="flex flex-1 flex-col">
        {/* admin header */}
        <AdminHeader />
        <main className='flex-1 flex bg-muted/40 p-4 md:p-6'>
            <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Adminlayout
