import { useFormik } from "formik";
import React, { useState } from "react";
import TextField from "../../components/core-ui/text-field";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, signIn } from "@/redux/AuthSlice";
export default function Signin() {
  const nav = useNavigate();
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const name = useSelector(selectUser)
  console.log("here",name)
  const SignInFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values,{resetForm}) => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/signin`,
          values
        );
        if (response.status === 200) {
          const { name, access_token } = response.data.data;
    
          dispatch(signIn({name,access_token}))
          toast.success(response.data?.message);
          nav("/dashboard/campaign");
         
        }
      } catch (error) {
              //@ts-ignore
        toast.error(error.response?.data?.message);
      } finally {
        setLoading(false);
        resetForm()
      }
    },
  });

  /* const { user, token } = response?.data?.loginUser;
      dispatch(signIn({ user, token }));*/
  return (
    <div className="w-full mx-auto lg:w-96 xl:w-[30rem]">
      <div>
        <h2 className="mt-8 text-3xl text-center font-bold leading-9 tracking-tight text-gray-900 mb-3">
          Welcome Back
        </h2>
        <p className="text-center text-lg font-thin">
          Sign in to manage your Campaigns
        </p>
      </div>
      <div className="mt-10">
        <div>
          <form onSubmit={SignInFormik.handleSubmit} className="space-y-6">
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
                className={`flex w-full  mt-8 justify-center rounded-3xl  px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  !SignInFormik.dirty || !SignInFormik.isValid
                    ? "cursor-not-allowed  bg-violet-300 "
                    : "  bg-violet-600 hover:bg-violet-500  focus-visible:outline-violet-600"
                }`}
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Sign In"
                )}
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
  );
}
