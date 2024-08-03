import { useFormik } from 'formik'
import React from 'react'
import TextField from '../../components/core-ui/text-field'

export default function Signin() {
  const SignInFormik= useFormik({
    initialValues:{
    email:"",
    password:""
    },onSubmit:(values, formikHelpers) =>{
      
    },
  })
  return (
    <div className="w-full mx-auto lg:w-96 xl:w-[30rem]">
      <div>
        <h2 className="mt-8 text-3xl text-center font-bold leading-9 tracking-tight text-gray-900 mb-3">
          Welcome Back
        </h2>
        <p className="text-center text-lg font-thin">Sign in to manage your Campaigns</p>
      </div>
    <div className="mt-10">
      <div>
        <form action="#" method="POST" className="space-y-6">
         <TextField
            type={"text"}
            id={"email"}
            placeholder={"Email Address"}
            label={""}
            {...SignInFormik}
         />
                <TextField
            type={"password"}
            id={"password"}
            placeholder={"Password"}
            label={""}
            {...SignInFormik}
         />
         
   
          <div>
          <button
          disabled={!SignInFormik.dirty || !SignInFormik.isValid}
              type="submit"
              className={`flex w-full  mt-8 justify-center rounded-3xl  px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${!SignInFormik.dirty || !SignInFormik.isValid ? "cursor-not-allowed  bg-violet-300 ":"  bg-violet-600 hover:bg-violet-500  focus-visible:outline-violet-600"}`}
            >
              Sign in
            </button>
          </div>
         

<div className="text-sm leading-6  text-center">
  <a
    href="#"
    className="font-semibold text-violet-600 hover:text-violet-500"
  >
    Forgot password?
  </a>
</div>

        </form>
      </div>
    </div>
  </div>
  )
}
