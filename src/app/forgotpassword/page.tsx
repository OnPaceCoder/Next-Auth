"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
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
    setToken(urlToken || "");
  }, []);

  const onSubmit = async () => {
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
  const onSend = async () => {
    setUser({ ...user, token });
    console.log(user);
    try {
      if (user.confirmPassword !== user.newPassword) {
        throw new Error("Password mismatch");
      }
      setLoading(true);

      const response = await axios.post("/api/users/updatepassword", {
        user,
      });
      console.log(response.data);
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
      <h1>Forgot Password</h1>
      <hr />

      {token.length > 0 ? (
        <div className="flex flex-col py-4">
          <label htmlFor="username">New Password</label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            type="password"
            id="newPassword"
            value={user.newPassword}
            onChange={(e) => setUser({ ...user, newPassword: e.target.value })}
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
            onClick={onSend}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          >
            Submit
          </button>
        </div>
      ) : (
        <div>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />

          <button
            onClick={onSubmit}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
}
