import { Navigate, Outlet } from "react-router-dom";

export default function AuthLayout() {


  return (
    <>
      <div className="flex min-h-screen flex-1 overflow-hidden ">
        <div className="relative hidden lg:block flex-1 ml-8 my-5">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            className="absolute inset-0 h-full w-full object-cover rounded-xl"
          />
        </div>
        <div className="relative w-full lg:w-1/2">
          <div className="w-full flex justify-between items-center p-5 ">
            <p>Orbut</p>
            <div className="flex gap-2 items-center">
              <p className="text-zinc-600 hidden lg:block">
                Don't have an account yet?
              </p>
              <button className="p-3 text-violet-500 border-2 border-violet-500 rounded-3xl">
                Sign Up now
              </button>
            </div>
          </div>
          <div className=" w-full flex flex-col justify-center px-4 py-12 ">
            <div className="w-full sm:px-6 lg:flex-none">
           <Outlet/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/*<div className="relative w-full lg:w-1/2 flex flex-1 flex-col justify-center px-4 py-12">
<div className="w-full flex justify-between items-center absolute top-4 pr-10">
  <p>Orbut</p>
  <div className="flex gap-2 items-center">
    <p className="text-zinc-600 hidden lg:block">Don't have an account yet?</p>
    <button className="p-3 text-violet-500 border-2 border-violet-500 rounded-3xl">
      Sign Up now
    </button>
  </div>
</div>
<div className="w-full sm:px-6 lg:flex-none">
  <div className="w-full mx-auto lg:w-96 xl:w-[30rem]">
    <div>
      <h2 className="mt-8 text-2xl text-center font-bold leading-9 tracking-tight text-gray-900">
        Sign in to your account
      </h2>
    </div>
    <div className="mt-10">
      <div>
        <form action="#" method="POST" className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-600"
              />
              <label
                htmlFor="remember-me"
                className="ml-3 block text-sm leading-6 text-gray-700"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm leading-6">
              <a
                href="#"
                className="font-semibold text-violet-600 hover:text-violet-500"
              >
                Forgot password?
              </a>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-violet-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

</div>*/
