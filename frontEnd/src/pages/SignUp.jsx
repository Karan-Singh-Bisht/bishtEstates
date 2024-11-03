import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import Loader from "../components/Loader";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  //Proxy in vite config

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/api/auth/signUp", data);
      if (response.status >= 200 && response.status < 300) {
        // console.log("Sign-up successful:", response.data);
        navigate("/sign-in");
      }
    } catch (err) {
      if (err.response) {
        // console.log("Error:", err.response.data);
        setErrorMessage(err.response.data);
      } else if (err.request) {
        // console.log("No response received:", err.request);
        setErrorMessage(err.request);
      } else {
        // console.log("Error:", err.message);
        setErrorMessage(err.message);
      }
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-4xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input
          {...register("username", { required: true })}
          className="border p-3 rounded-lg"
          type="text"
          name="username"
          id="username"
          placeholder="username"
        />
        {errors.username && (
          <span className="text-red-500">Username is required</span>
        )}
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid Format",
            },
          })}
          className="border p-3 rounded-lg"
          type="email"
          name="email"
          id="email"
          placeholder="email"
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
        <input
          {...register("password", { required: "Password is required" })}
          className="border p-3 rounded-lg"
          type="password"
          name="password"
          id="password"
          placeholder="password"
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
        <button
          disabled={isSubmitting}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {isSubmitting ? (
            <>
              <Loader />
              <span className="ml-2">Submitting</span> {/* Loader */}
            </>
          ) : (
            "Submit"
          )}
        </button>
        <button className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Continue With Google
        </button>
      </form>
      <h3 className="mt-3 flex gap-2">
        Have an account?{" "}
        <NavLink className="text-blue-700" to="/sign-in">
          Sign in
        </NavLink>
      </h3>
      {errorMessage && <p className="text-red-500">{errorMessage.message}</p>}
    </div>
  );
}

export default SignUp;
