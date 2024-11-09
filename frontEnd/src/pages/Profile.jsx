import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Loader from "../components/Loader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../redux/user/userSlice";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [errorMessage, setErrorMessage] = useState("");
  const [previewImage, setPreviewImage] = useState(currentUser.user.avatar);
  const fileRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      username: currentUser.user.username,
      email: currentUser.user.email,
    },
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    dispatch(updateUserStart());
    try {
      const formData = new FormData();
      if (fileRef.current?.files[0]) {
        formData.append("avatar", fileRef.current.files[0]);
      }

      // Append other fields to FormData
      for (const [key, value] of Object.entries(data)) {
        if (value) {
          formData.append(key, value);
        }
      }

      const response = await axios.put(
        `/api/user/update/${currentUser.user._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        dispatch(updateUserSuccess(response.data));
        navigate("/profile");
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        "An error occurred while updating";
      setErrorMessage(errorMsg);
      dispatch(updateUserFailure(errorMsg));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-4xl mt-10 text-center font-bold">Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={handleFileChange}
        />
        <img
          onClick={() => fileRef.current.click()}
          className="w-24 h-24 object-cover cursor-pointer self-center mt-4 rounded-full"
          src={previewImage}
          alt="profile"
        />
        <input
          {...register("username")}
          type="text"
          className="border p-3 max-w-xl rounded-lg"
          placeholder="Username"
        />
        <input
          {...register("email", {
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid Format",
            },
          })}
          type="email"
          className="border p-3 max-w-xl rounded-lg"
          placeholder="Email"
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
        <input
          {...register("password")}
          type="password"
          className="border p-3 max-w-xl rounded-lg"
          placeholder="Password"
        />
        <button
          disabled={isSubmitting}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {isSubmitting ? (
            <>
              <Loader />
              <span className="ml-2">Updating</span>
            </>
          ) : (
            "Update"
          )}
        </button>
      </form>
      <div className="mt-3 flex justify-between">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
}

export default Profile;
