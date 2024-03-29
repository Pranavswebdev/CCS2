"use client";
import Link from "next/link";
import { useState } from "react";
import userApi from "@/apis/userApi";
import { useRouter } from "next/navigation";
import { Login } from "@/interfaces";
import useStore from "@/store/projectStrore";
import { useForm, SubmitHandler } from "react-hook-form";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = userApi();
  const router = useRouter();
  const store = useStore();

  const onLogin = (email: String, password: String) => {
    // e.preventDefault();
    if (!email || !password) {
      setError("Please enter password and email");
      return;
    }

    login({ email, password })
      .then((res: any) => {
        const data: Login = res.data;
        console.log({ res });

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        store.setCurrentUser(res.data.user);

        router.push("/projects");
      })
      .catch((resp) => {
        setError(resp.response.data.message);
      });
  };

  type Inputs = {
    email: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);

    onLogin(data.email, data.password);

    // setShowModal(false);
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 w-15">
        <h1 className="text-xl font-bold my-4">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <input
            className="w-80"
            // onChange={(e) => setEmail(e.target.value)}
            {...register("email", {
              required: true,
            })}
            type="email"
            placeholder="Email"
          />
          {errors.email && (
            <span className="text-red-700 font-medium">
              This field is required
            </span>
          )}
          <input
            // onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            {...register("password", {
              required: true,
            })}
          />
          {errors.password && (
            <span className="text-red-700 font-medium">
              This field is required
            </span>
          )}
          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
            Login
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link className="text-sm text-end" href={"/register"}>
            <span className="underline">Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
