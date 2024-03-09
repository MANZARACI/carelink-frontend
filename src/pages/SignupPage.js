import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

const SignupPage = () => {
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordVerifyRef = useRef();

  const { signup } = useAuth();

  const signupHandler = async (e) => {
    e.preventDefault();
    setError("");
    toast.dismiss();

    if (passwordRef.current.value !== passwordVerifyRef.current.value) {
      return setError("You must enter the same password twice");
    }

    const toastId = toast.loading("Signing up...", {
      position: toast.POSITION.BOTTOM_RIGHT,
      theme: "dark",
    });

    try {
      await signup(emailRef.current.value, passwordRef.current.value);
      toast.update(toastId, {
        type: toast.TYPE.SUCCESS,
        render: "Successfully signed up!",
        isLoading: false,
        autoClose: 3000,
      });
      navigate("/");
    } catch (error) {
      setError(error.message);
      toast.update(toastId, {
        type: toast.TYPE.ERROR,
        render: "Signing up failed!",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Signup
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              already have an account
            </Link>
          </p>
        </div>
        {error && (
          <div className="bg-red-600 rounded-md py-2 font-semibold text-center text-white">
            {error}
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={signupHandler}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                ref={emailRef}
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                ref={passwordRef}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div>
              <label htmlFor="passwordVerify" className="sr-only">
                Password Verify
              </label>
              <input
                ref={passwordVerifyRef}
                id="passwordVerify"
                name="passwordVerify"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password Verify"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
