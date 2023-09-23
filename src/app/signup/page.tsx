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
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);

      console.log("SignUP successs ", response.data);

      router.push("/login");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col gap-2 border border-gray-500 p-3 rounded-md w-1/4">
        <h1 className="text-slate-400 font-bold py-2 text-center text-xl">
          {loading ? "Processing" : "Signup"}
        </h1>
        <hr />
        <form
          action=""
          className="flex flex-col gap-2  p-3 "
          onSubmit={(e) => onSignUp(e)}
        >
          <label htmlFor="username" className="text-neutral-500 ">
            Username
          </label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            type="text"
            id="username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="John Doe"
          />
          <label htmlFor="email" className="text-neutral-500 ">
            Email
          </label>
          <input
            className="p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-gray-600 text-black"
            type="text"
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="johndoe@email.com"
          />
          <label htmlFor="password" className="text-neutral-500 ">
            Password
          </label>
          <input
            className="p-2 border fborder-gray-300 rounded mb-4 focus:outline-none focus:border-gray-600 text-black"
            type="password"
            id="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Password"
          />

          <button
            type="submit"
            className={`p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-gray-600 ${
              buttonDisabled ? "text-neutral-500" : "text-white"
            }`}
            disabled={buttonDisabled}
          >
            {buttonDisabled ? "Signup" : "Signup"}
          </button>
          <Link
            className="text-neutral-500 text-sm text-center"
            href={"/login"}
          >
            Visit Login Page
          </Link>
          <hr />
          <Link
            href={"/forgotpassword"}
            className="text-neutral-500 text-sm text-center"
          >
            Forgot Password{" "}
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Page;
