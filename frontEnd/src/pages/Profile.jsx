import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useRef } from "react";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-4xl mt-10 text-center font-bold">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          className="w-24 h-24 object-cover cursor-pointer self-center mt-4 rounded-full"
          src={currentUser.user.avatar}
          alt="profile image"
        />
        <input
          type="text"
          className="border p-3 max-w-xl rounded-lg"
          placeholder="username"
          name="username"
          id="username"
        />
        <input
          type="email"
          className="border p-3 max-w-xl rounded-lg"
          placeholder="email"
          name="email"
          id="email"
        />
        <input
          type="text"
          className="border p-3 max-w-xl rounded-lg"
          placeholder="password"
          name="password"
          id="password"
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="mt-3 flex justify-between">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}

export default Profile;
