import CommonForm from '@/components/common/form';
import { loginFormControl } from '@/config';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const initialState = {
  email : "",
  password : ""
};
const Login = () => {
  const [formData, setFormData] = useState(initialState)

  function onSubmit(){

  }
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Login to your account</h1>
        <p>Don't have an account?
        <Link className='font-medium ml-2 text-primary hover:underline ' to = "/auth/register">Register</Link>
        </p>
        
      </div>
      <CommonForm 
      formControls={loginFormControl}
      buttonText={"Login in"}
      formData={formData}
      setFormData={setFormData}
      onSbumit={onSubmit}
      />
    </div>
  )
}

export default Login
