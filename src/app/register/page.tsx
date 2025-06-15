"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Banner2 } from "../_assets/images";
import { Logo } from "../_assets/icons";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "@/lib/firebaseClient";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // TODO: register user
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;

      await updateProfile(userCredential.user, {
        displayName: name,
      });

      await setDoc(doc(db, "users", uid), {
        name,
        email,
        role: "teacher",
      });

      setName("");
      setEmail("");
      setPassword("");
      router.push("/login");
      setLoading(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message.includes("auth/invalid-email")) {
          setError("Email tidak valid");
        } else {
          setError(error.message);
        }
      }
    }
  };

  return (
    <div className="w-screen h-screen flex justify-between font-poppins">
      <div className="w-2/5 h-full p-16 flex-col gap-16 flex">
        <div className="flex items-center gap-4">
          <Image src={Logo} alt="Logo" width={120} height={120} />
          <div className="flex flex-col">
            <p className="text-3xl">SekolahKu</p>
            <p className="text-sm text-primary">
              Sekolahku, Sekolahmu, Sekolah kita semua
            </p>
          </div>
        </div>
        <form onSubmit={handleRegister} className="space-y-4">
          <h1 className="text-xl font-bold text-primary mb-10">
            Daftar <br />
            ke SekolahKu
          </h1>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Nama</label>
            <input
              type="text"
              name="name"
              placeholder="Nama"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border px-4 py-3 w-full border-disable rounded-lg placeholder:text-disable placeholder:font-light text-sm"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border px-4 py-3 w-full border-disable rounded-lg placeholder:text-disable placeholder:font-light text-sm"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border px-4 py-3 w-full border-disable rounded-lg placeholder:text-disable placeholder:font-light text-sm"
            />
          </div>

          {error && <p className="text-error text-sm">{error}</p>}
          <div className="flex flex-col gap-4 mt-10">
            <button
              type="submit"
              disabled={loading}
              className="bg-duniakoding-primary w-full text-white px-4 py-3 rounded-2xl font-regular"
            >
              {loading ? "Mohon Tunggu..." : "Daftar"}
            </button>
            <p className="text-primary text-sm font-medium">
              Sudah punya akun?{" "}
              <Link
                href="/login"
                className="font-bold text-duniakoding-secondary"
              >
                Masuk sekarang
              </Link>
            </p>
          </div>
        </form>
      </div>
      <div className="w-3/5 h-full">
        <Image
          src={Banner2}
          alt="Banner"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Register;
