import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import Loader from "../components/Loader";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [errorMessage, setErrorMessage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const fileRef = useRef(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

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
        navigate("/profile");
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
      <h1 className="text-4xl mt-10 text-center font-bold">Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input
          onChange={handleFileChange}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          className="w-24 h-24 object-cover cursor-pointer self-center mt-4 rounded-full"
          src={previewImage || currentUser.user.avatar}
          alt="profile image"
        />
        <input
          {...register("username")}
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          type="text"
          className="border p-3 max-w-xl rounded-lg"
          placeholder={currentUser.user.username}
          name="username"
          id="username"
        />
        <input
          {...register("email", {
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid Format",
            },
          })}
          value={email}
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="border p-3 max-w-xl rounded-lg"
          placeholder={currentUser.user.email}
          name="email"
          id="email"
        />
        <input
          {...register("password")}
          type="text"
          className="border p-3 max-w-xl rounded-lg"
          placeholder="password"
          name="password"
          id="password"
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
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
      {errorMessage && <p className="text-red-500">{errorMessage.message}</p>}
    </div>
  );
}

export default Profile;
