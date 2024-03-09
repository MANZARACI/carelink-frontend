import React, { useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [error, setError] = useState();
  const [message, setMessage] = useState();

  const emailRef = useRef();

  const { resetPassword } = useAuth();

  const submitHandler = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value.trim();
    setError("");
    setMessage("");

    if (!email) {
      return;
    }

    try {
      await resetPassword(email);
      setMessage("Check your email inbox to reset your password");
    } catch (error) {
      setError("Failed to reset password!");
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
            Password Reset
          </h2>
        </div>
        {error && (
          <div className="bg-red-600 rounded-md py-2 font-semibold text-center text-white">
            {error}
          </div>
        )}
        {message && (
          <div className="bg-green-300 rounded-md py-2 font-medium text-center text-green-1000">
            {message}
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={submitHandler}>
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
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Email address"
              />
            </div>
          </div>

          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Reset Password
          </button>

          <div className="flex justify-end">
            <div className="text-sm">
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Login
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
