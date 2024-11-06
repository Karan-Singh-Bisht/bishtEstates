import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import Loader from "../components/Loader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

function SignUp() {
  const [errorMessage, setErrorMessage] = useState("");
  const [previewImage, setPreviewImage] = useState(""); // State for image preview
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const fileRef = useRef(null);

  // Handle file input change to set preview
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file)); // Set preview image URL
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      if (fileRef.current && fileRef.current.files[0]) {
        formData.append("avatar", fileRef.current.files[0]);
      }
      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("password", data.password);

      const response = await axios.post("/api/auth/signUp", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status >= 200 && response.status < 300) {
        navigate("/sign-in");
      }
    } catch (err) {
      if (err.response) {
        setErrorMessage(err.response.data);
      } else if (err.request) {
        setErrorMessage("No response from server");
      } else {
        setErrorMessage(err.message);
      }
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-4xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={handleFileChange} // Add onChange handler
        />
        <img
          onClick={() => fileRef.current.click()}
          className="rounded-full w-24 h-24 hover:cursor-pointer object-cover mx-auto"
          src={
            previewImage ||
            "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg"
          } // Display preview image
          alt="profile"
        />
        <input
          {...register("username", { required: true })}
          className="border p-3 rounded-lg"
          type="text"
          name="username"
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
              <span className="ml-2">Submitting</span>
            </>
          ) : (
            "Submit"
          )}
        </button>
        <OAuth />
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
