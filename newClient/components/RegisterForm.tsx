"use client";
import Link from "next/link";
import React, { useState } from "react";
import userApi from "../apis/userApi";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { signup } = userApi();

  const submitHandler = async ( email:string, password:string, name:string) => {


    await signup(name, password, email)
      .then(() => {
        router.push("/");
      })
      .catch((res) => {
        setError(res.message);
      });

 
  };

  type Inputs = {
    email: string;
    password: string;
    name:string
  };



  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);

    submitHandler(data.email, data.password,data.name);

    // setShowModal(false);
  };



  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400 w-15">
        <h1 className="text-xl font-bold my-4">Register</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <input

            // onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Full Name"
            {...register("name",{
              required:true
            })}
          />
           {errors.name && <span className="text-red-700 font-medium" >This field is required</span>}
          <input
         
            className="w-80"
            // onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"

            {...register("email",{
              required:true
            })}
          />
           {errors.email && <span className="text-red-700 font-medium" >This field is required</span>}
          <input
      
            // onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            {...register("password",{
              required:true
            })}
          /> {errors.password && <span className="text-red-700 font-medium" >This field is required</span>}
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
