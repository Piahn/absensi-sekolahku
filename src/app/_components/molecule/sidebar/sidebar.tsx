"use client";
import {
  AttendanceIcon,
  DashboardIcon,
  LogoutIcon,
  RegisterIcon,
} from "@/app/_assets/icons";
import { auth } from "@/lib/firebaseClient";
import { deleteCookie } from "cookies-next";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import Modal from "../modal/modal";
import Image from "next/image";

function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      deleteCookie("token", { path: "/" });
      handleCloseLogoutModal();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleShowLogoutModal = () => {
    setShowLogoutModal(true);
  };

  const handleCloseLogoutModal = () => {
    setShowLogoutModal(false);
  };

  const itemsMenu = [
    {
      category: "Administrasi",
      items: [
        {
          name: "Beranda",
          href: "/dashboard",
          icon: DashboardIcon,
          type: "link",
          function: () => {},
        },
        {
          name: "Kehadiran",
          href: "/attendance",
          icon: AttendanceIcon,
          type: "link",
          function: () => {},
        },
        {
          name: "Pendaftaran Siswa",
          href: "/students",
          icon: RegisterIcon,
          type: "link",
          function: () => {},
        },
      ],
    },
    {
      category: "Akun",
      items: [
        {
          name: "Keluar",
          href: "",
          icon: LogoutIcon,
          type: "button",
          function: handleShowLogoutModal,
        },
      ],
    },
  ];

  return (
    <>
      <div className="h-screen w-64 font-normal bg-duniakoding-primary fixed py-5 top-20 left-0 flex flex-col gap-10 overflow-y-auto">
        {itemsMenu.map((item) => (
          <div className="flex flex-col transition-colors" key={item.category}>
            <p className="text-white text-lg font-semibold px-5 py-2">
              {item.category}
            </p>
            {item.items.map((menu) =>
              menu.type === "button" ? (
                <button
                  onClick={menu.function}
                  className={`${
                    pathname === menu.href ? "bg-disable" : ""
                  } flex items-center hover:bg-disable transition-colors px-5 py-3 gap-3 text-white text-lg`}
                  key={menu.name}
                >
                  {menu.icon && (
                    <Image
                      src={menu.icon}
                      alt={menu.name}
                      className="w-6 h-6 text-white"
                    />
                  )}
                  <p>{menu.name}</p>
                </button>
              ) : (
                <Link
                  href={menu.href}
                  className={`${
                    pathname === menu.href ? "bg-disable" : ""
                  } flex items-center hover:bg-disable transition-colors px-5 py-3 gap-3 text-white text-lg`}
                  key={menu.name}
                >
                  {menu.icon && (
                    <Image
                      src={menu.icon}
                      alt={menu.name}
                      className="w-6 h-6 text-white"
                    />
                  )}
                  <p>{menu.name}</p>
                </Link>
              )
            )}
          </div>
        ))}
      </div>
      <Modal
        title="Konfirmasi Keluar"
        content="Apakah Anda yakin ingin keluar?"
        type="warning"
        isOpen={showLogoutModal}
        buttonText1="Ya"
        buttonType1="primary"
        buttonText2="Tidak"
        buttonType2="secondary"
        onConfirm={handleLogout}
        onClose={() => setShowLogoutModal(false)}
      />
    </>
  );
}

export default Sidebar;
