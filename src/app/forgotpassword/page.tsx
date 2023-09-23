"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const router = useRouter();
  const [token, setToken] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [user, setUser] = React.useState({
    newPassword: "",
    confirmPassword: "",
    token: "",
  });

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken);
    setUser((prevUser) => ({ ...prevUser, token: urlToken }));
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);

      const response = await axios.post("/api/users/forgotpassword", {
        email,
      });

      router.push("/login");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const onSend = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (user.confirmPassword !== user.newPassword) {
        throw new Error("Password mismatch");
      }
      setLoading(true);

      const response = await axios.post("/api/users/updatepassword", {
        user,
      });

      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col gap-2 border border-gray-500 p-3 rounded-md w-1/4">
        <h1 className="text-slate-400 font-bold py-2 text-center text-xl">
          Forgot Password
        </h1>
        <hr />

        {token ? (
          <div className="flex flex-col py-4">
            <form
              action=""
              className="flex flex-col gap-2  p-3 "
              onSubmit={(e) => onSend(e)}
            >
              <label htmlFor="username">New Password</label>
              <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                type="password"
                id="newPassword"
                value={user.newPassword}
                onChange={(e) =>
                  setUser({ ...user, newPassword: e.target.value })
                }
                placeholder="New Password"
              />

              <label htmlFor="password">Confirm password</label>
              <input
                className="p-2 border fborder-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                type="password"
                id="password"
                value={user.confirmPassword}
                onChange={(e) =>
                  setUser({ ...user, confirmPassword: e.target.value })
                }
                placeholder="Confirm Password"
              />

              <button
                type="submit"
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
              >
                {loading ? "Processing..." : "Send"}
              </button>
            </form>
          </div>
        ) : (
          <>
            <form
              action=""
              className="flex flex-col gap-2  p-3 "
              onSubmit={(e) => onSubmit(e)}
            >
              <input
                className="p-2 border border-gray-300 rounded mb-2 focus:outline-none focus:border-gray-600 text-black"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />

              <button
                type="submit"
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
              >
                {loading ? "Processing..." : "Send"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
