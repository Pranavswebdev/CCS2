"use client";
import Link from "next/link";
import React, { useState } from "react";
import userApi from "../apis/userApi";
import { useRouter } from "next/navigation";
const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { signup } = userApi();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({ name, password, email });

    await signup(name, password, email)
      .then(() => {
        router.push("/");
      })
      .catch((res) => {
        setError(res.message);
      });

    console.log(e);
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400 w-15">
        <h1 className="text-xl font-bold my-4">Register</h1>

        <form onSubmit={submitHandler} className="flex flex-col gap-3">
          <input
            required
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Full Name"
          />
          <input
            required
            className="w-80"
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
          />
          <input
            required
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
            Register
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link className="text-sm text-end" href={"/"}>
            <span className="underline">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
