"use client";

import axios from "axios";
import Link from "next/link";

import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);

  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verfiyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col gap-2 border border-gray-500 p-3 rounded-md w-1/4">
        <h1 className="text-slate-400 font-bold py-2 text-center text-xl">
          Verify Email
        </h1>
        <hr />
        {verified && (
          <div>
            <h2 className="text-slate-400 font-bold py-2 text-center text-xl">
              Email Verified
            </h2>
            <Link
              href={"/login"}
              className="text-neutral-500 text-sm text-center"
            >
              Login
            </Link>
          </div>
        )}
        {error && (
          <div>
            <h2 className="text-slate-400 font-bold py-2 text-center text-xl">
              Error
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
