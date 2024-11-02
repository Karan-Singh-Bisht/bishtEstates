import React from "react";
import { NavLink } from "react-router-dom";

function SignUp() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-4xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4">
        <input
          className="border p-3 rounded-lg"
          type="text"
          name="username"
          id="username"
          placeholder="username"
        />
        <input
          className="border p-3 rounded-lg"
          type="email"
          name="email"
          id="email"
          placeholder="email"
        />
        <input
          className="border p-3 rounded-lg"
          type="password"
          name="password"
          id="password"
          placeholder="password"
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Sign Up
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
    </div>
  );
}

export default SignUp;
