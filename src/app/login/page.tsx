"use client";
import Link from "next/link";
import React, { FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const Page = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login success");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex  items-center justify-center min-h-screen py-2">
      <div className="flex flex-col gap-2 border border-gray-500 p-3 rounded-md w-1/4">
        <h1 className="text-slate-400 font-bold py-2 text-center text-xl">
          {loading ? "Processing" : "Login"}
        </h1>
        <hr className="py-2" />
        <form
          action=""
          className="flex flex-col gap-2  p-3 "
          onSubmit={(e) => onLogin(e)}
        >
          <label htmlFor="email" className="text-neutral-500 ">
            Email
          </label>
          <input
            className="p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-gray-600 text-gray-500 bg-gray-100"
            type="text"
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="johndoe@email.com"
          />
          <label htmlFor="password" className="text-neutral-500">
            Password
          </label>
          <input
            className="p-2 border fborder-gray-300 rounded mb-4 focus:outline-none focus:border-gray-600  text-gray-500 bg-gray-100"
            type="password"
            id="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="adZi@324#"
          />

          <button
            type="submit"
            className={`p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 ${
              buttonDisabled ? "text-neutral-500" : "text-white"
            }`}
            disabled={buttonDisabled}
          >
            {buttonDisabled ? "Login" : "Login"}
          </button>
          <Link
            href={"/signup"}
            className="text-neutral-500 text-sm text-center"
          >
            New User! Click here to Register{" "}
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Page;
