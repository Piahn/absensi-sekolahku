'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import { Logo } from '../_assets/icons';
import { Banner } from '../_assets/images';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebaseClient';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';
import TextInput from '../_components/textinput';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();

      setAuth(token);
      rederectToDashboard();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message ?? 'Login gagal');
    } finally {
      setLoading(false);
    }
  };

  function rederectToDashboard() {
    router.push('/dashboard');
  }

  const setAuth = (token: string) => {
    setCookie('token', token, {
      maxAge: 60 * 60 * 24, // 1 hari tokens
    });
  };

  return (
    <div className="w-screen h-screen flex justify-between font-poppins">
      <div className="w-full md:w-2/5 h-full p-16 flex-col gap-16 flex">
        <div className="flex items-center gap-4">
          <Image src={Logo} alt="Logo" width={120} height={120} />
          <div className="flex flex-col">
            <p className="text-3xl text-duniakoding-primary font-bold">SekolahKu</p>
            <p className="text-sm text-primary">Sekolahku, Sekolahmu, Sekolah kita semua</p>
          </div>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <h1 className="text-xl font-bold text-primary mb-10">
            Masuk
            <br />
            ke SekolahKu
          </h1>
          <TextInput
            name="email"
            label="Email"
            placeholder="Masukkan Email Anda"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextInput
            name="password"
            label="Password"
            placeholder="Masukkan Password Anda"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-error text-sm">{error}</p>}
          <div className="flex flex-col gap-4 mt-20">
            <button
              type="submit"
              disabled={loading}
              className="bg-duniakoding-primary w-full text-white px-4 py-3 rounded-2xl">
              {loading ? 'Mohon Tunggu...' : 'Masuk'}
            </button>
            <p className="text-primary text-sm font-medium py-5 md:py-0">
              Belum punya akun?{' '}
              <Link href="/register" className="font-bold text-duniakoding-secondary">
                Daftar sekarang
              </Link>
            </p>
          </div>
        </form>
      </div>
      <div className="w-3/5 h-full hidden md:block">
        <Image src={Banner} alt="Banner" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default Login;
