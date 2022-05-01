import Loader, { FullPageLoader } from "@components/Loader";
import { SeoContainer } from "@components/SeoContainer";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { BsFacebook, BsTwitter, BsGithub } from "react-icons/bs";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "password") {
      setPassword(e.target.value);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    const formBody = {
      email,
      password,
    };
    let res = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formBody),
    });
    let data = await res.json();
    if (data.success === true) {
      localStorage.setItem("token", data.jwt);
      toast.success("Successfully logged in!");
      setEmail("");
      setPassword("");
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } else {
      toast.error(data.error);
    }
    setSubmitting(false);
  }

  return (
    <>
      <SeoContainer title={"Login"} />
      <div className="min-h-[80vh] flex">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Sign in with
              </h2>
            </div>

            <div className="mt-6">
              <div>
                <div>
                  <div className="mt-1 grid grid-cols-3 gap-3">
                    <div>
                      <button
                        href="#"
                        className="group w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-200 hover:shadow-md"
                      >
                        <span className="sr-only">Sign in with Facebook</span>
                        <BsFacebook className="w-5 h-5 transition-200 group-hover:text-[#4267B2]" />
                      </button>
                    </div>

                    <div>
                      <a
                        href="#"
                        className="group w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-200 hover:shadow-md"
                      >
                        <span className="sr-only">Sign in with Twitter</span>
                        <BsTwitter className="w-5 h-5 transition-200 group-hover:text-[#1DA1F2]" />
                      </a>
                    </div>

                    <div>
                      <a
                        href="#"
                        className="group w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-200 hover:shadow-md"
                      >
                        <span className="sr-only">Sign in with GitHub</span>
                        <BsGithub className="w-5 h-5 transition-200 group-hover:text-[#1d1a1a]" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-6 relative">
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={handleChange}
                        autoComplete="email"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={handleChange}
                        autoComplete="current-password"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end">
                    {/* <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-primary/80 focus:ring-primary border-gray-300 rounded transition-200"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-2 block text-sm text-gray-900"
                      >
                        Remember me
                      </label>
                    </div> */}

                    <div className="text-sm">
                      <Link href="/auth/forgot">
                        <a className="font-medium text-primary/80 hover:text-primary transition-200">
                          Forgot your password?
                        </a>
                      </Link>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="group w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary/80 hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-200"
                    >
                      {submitting ? <Loader /> : "Sign in"}
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    Don&apos;t have an account?&nbsp;
                    <Link href="/auth/register">
                      <a className="font-medium text-primary/80 hover:text-primary transition-200">
                        Sign Up
                      </a>
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:block relative w-0 flex-1">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default Login;
