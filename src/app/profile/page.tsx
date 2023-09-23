"use client";
import React from "react";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const page = () => {
  const router = useRouter();
  const [data, setData] = React.useState("none");
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successfull");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data.data);
    setData(res.data.data?.username);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-y-2">
      <div className="flex flex-col gap-2 border border-gray-500 p-3 rounded-md w-1/4">
        <h1 className="text-slate-400 font-bold py-2 text-center text-xl">
          Profile
        </h1>
        <hr />
        <p>Profile Page</p>
        <h2 className="p-2 rounded bg-gray-500">
          {data === "none" ? (
            "None"
          ) : (
            <Link href={`/profile/${data}`}>Welcome {data}</Link>
          )}
        </h2>
        <hr />
        <button
          onClick={logout}
          className="bg-slate-700 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
        <button
          onClick={getUserDetails}
          className="bg-neutral-300 hover:bg-neutral-500 text-white font-bold py-2 px-4 rounded"
        >
          Get Data
        </button>
      </div>
    </div>
  );
};

export default page;
