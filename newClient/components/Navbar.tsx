"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "../interfaces";
const Navbar = () => {
  const [currentUser, setCurrentuser] = useState<User | null>(null);
  const storedUser = localStorage.getItem("user");

  useEffect(() => {

    if (storedUser) {
      try {
        const currentUser = JSON.parse(storedUser);
        setCurrentuser(currentUser);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }else{

setCurrentuser(null)
    }
  }, [storedUser]);






  const router = useRouter();

  const Logout = () => {
    console.log("Logout  called");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentuser(null);
    router.push("/");
  };

  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">
            Project CCS
          </span>
        </div>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
         {currentUser&&    <a
              href="/projects"
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              My Projects
            </a>}
          </div>

        {currentUser&&  <button
            onClick={Logout}
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
          >
            {currentUser?.name} - Logout
          </button>}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
