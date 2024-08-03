import axios from "axios";
import { useFormik } from "formik";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import TextField from "../../components/core-ui/text-field";

export default function SignUp() {
  const nav= useNavigate()
  const [loading,setLoading]=useState(false)

  const SignUpFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      msisdn: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      name: Yup.string().required("Name is required"),
      msisdn: Yup.string().required("Mobile number is required"),
    }),
    onSubmit: async (values,{resetForm}) => {
    setLoading(true)
     try {
      const response= await  axios.post(  `${import.meta.env.VITE_BASE_URL}/create-account`, values)
      if(response.status === 200){
        toast.success(response.data?.message);
        nav("/dashboard/campaigns")
      }
     } catch (error) {
            //@ts-ignore
      toast.error(error?.message);
     }finally{
      setLoading(false)
      resetForm()
     }
     
    },
  });

  return (
    <div className="w-full mx-auto lg:w-96 xl:w-[30rem]">
      <div>
        <h2 className="mt-8 text-3xl text-center font-bold leading-9 tracking-tight text-gray-900 mb-3">
          Welcome
        </h2>
        <p className="text-center text-lg font-thin">Sign up to Orbut</p>
      </div>
      <div className="mt-10">
        <form onSubmit={SignUpFormik.handleSubmit} className="space-y-6">
          <TextField
            type="text"
            id="email"
            placeholder="Email Address"
            label=""
            {...SignUpFormik}
          />
          <TextField
            type="password"
            id="password"
            placeholder="Password"
            label=""
            {...SignUpFormik}
          />
          <TextField
            type="text"
            id="name"
            placeholder="Name"
            label=""
            {...SignUpFormik}
          />
          <TextField
            type="text"
            id="msisdn"
            placeholder="Number"
            label=""
            {...SignUpFormik}
          />
          <button
            disabled={!SignUpFormik.dirty || !SignUpFormik.isValid}
            type="submit"
            className={`flex w-full mt-8 justify-center rounded-3xl px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
              !SignUpFormik.dirty || !SignUpFormik.isValid
                ? "cursor-not-allowed bg-violet-300"
                : "bg-violet-600 hover:bg-violet-500 focus-visible:outline-violet-600"
            }`}
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "SignUp"
            )}
          </button>
          <div className="text-sm leading-6 text-center">
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
  );
}
