import { Logo } from "@/app/_assets/icons";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";

function Header() {
  const [displayName, setDisplayName] = useState<string | null>(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setDisplayName(user.displayName);
      } else {
        setDisplayName(null);
      }
    });
  }, []);

  return (
    <header className="w-screen h-20 bg-white px-8 py-5 flex items-center justify-between shadow-md fixed top-0">
      <div className="flex items-center gap-4">
        <Image src={Logo} alt="Logo" width={60} height={60} />
        <div className="flex flex-col">
          <p className="text-2xl">SekolahKu</p>
          <p className="text-xs text-primary">
            Sekolahku, Sekolahmu, Sekolah kita semua
          </p>
        </div>
      </div>
      <div>
        <p className="text-primary text-sm font-normal">
          Halo,{" "}
          <span className="text-duniakoding-primary font-semibold">
            {displayName || "Unknown User"}
          </span>{" "}
        </p>
      </div>
    </header>
  );
}

export default Header;
