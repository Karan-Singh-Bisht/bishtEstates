import React from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import Loader from "../components/Loader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInSuccess,
  signInstart,
} from "../redux/user/userSlice";

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.user);

  const onSubmit = async (data) => {
    dispatch(signInstart());
    try {
      const response = await axios.post("/api/auth/signIn", data);
      if (response.status >= 200 && response.status < 300) {
        dispatch(signInSuccess(response.data));
        navigate("/home");
      }
    } catch (err) {
      const errorMessage = err.response?.data || err.message;
      dispatch(signInFailure(errorMessage));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-4xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
          placeholder="Email"
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
        <input
          {...register("password", { required: "Password is required" })}
          className="border p-3 rounded-lg"
          type="password"
          placeholder="Password"
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? (
            <>
              <Loader />
              <span className="ml-2">Submitting</span> {/* Loader */}
            </>
          ) : (
            "Submit"
          )}
        </button>
        <button className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
          Continue With Google
        </button>
      </form>
      <h3 className="mt-3 flex gap-2">
        Don't have an account?{" "}
        <NavLink className="text-blue-700" to="/sign-up">
          Sign Up
        </NavLink>
      </h3>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default SignIn;
