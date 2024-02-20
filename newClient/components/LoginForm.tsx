"use client";
import Link from "next/link";
import { useState } from "react";
import userApi from "@/apis/userApi";
import { useRouter } from "next/navigation";
import { Login } from "@/interfaces";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = userApi();
  const router = useRouter();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter password and email");
      return;
    }

    login({ email, password })
      .then((res: any) => {
        const data: Login = res.data;
        console.log({ res });

        localStorage.setItem("token", res.data.token);
       localStorage.setItem("user",  JSON.stringify(res.data.user) );

        router.push("/projects");
      })
      .catch((resp) => {
        setError(resp.response.data.message);
      });
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 w-15">
        <h1 className="text-xl font-bold my-4">Login</h1>

        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <input
            className="w-80"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
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
