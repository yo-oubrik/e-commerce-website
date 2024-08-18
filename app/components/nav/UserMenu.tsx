"use client";
import { AiFillCaretDown } from "react-icons/ai";
import Avatar from "../Avatar";
import { useState } from "react";
import Link from "next/link";
import MenuItem from "./MenuItem";
import { signOut } from "next-auth/react";
import BackDrop from "./BackDrop";
import { safeUser } from "@/app/product/utils/types";
import toast from "react-hot-toast";
import { log } from "console";
import { useRouter } from "next/navigation";

const UserMenu = ({
  currentUser,
}: {
  currentUser: safeUser | null | undefined;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);
  const router = useRouter();
  return (
    <>
      <div className="relative z-50">
        <div
          className={` flex gap-1 p-[5px] rounded-3xl items-center border border-slate-400 cursor-pointer transition  ${
            isOpen ? "shadow-md" : ""
          }`}
          onClick={toggleMenu}
        >
          <Avatar src={currentUser?.image ? currentUser.image : ""} />
          <AiFillCaretDown />
        </div>
        {isOpen && (
          <ul className="absolute border rounded-md w-44 bg-white shadow-md right-0 top-12 text-sm overflow-hidden z-30">
            {currentUser ? (
              <>
                <Link href="/orders">
                  <MenuItem onClick={toggleMenu}>Your Orders</MenuItem>
                </Link>
                {currentUser.role === "ADMIN" && (
                  <Link href="/dashboard">
                    <MenuItem onClick={toggleMenu}>Dashboard</MenuItem>
                  </Link>
                )}
                <MenuItem
                  onClick={() => {
                    toggleMenu();
                    try {
                      signOut({
                        redirect: false,
                      });
                      router.push("/");
                      router.refresh();
                      toast.success("Signed out");
                    } catch (e) {
                      toast.error("Failed to sign-out");
                      console.log(e);
                    }
                  }}
                  customClass="cursor-pointer"
                >
                  Logout
                </MenuItem>
              </>
            ) : (
              <>
                <Link href="/login">
                  <MenuItem onClick={toggleMenu}>Login</MenuItem>
                </Link>
                <Link href="/register">
                  <MenuItem onClick={toggleMenu}>Register</MenuItem>
                </Link>
              </>
            )}
          </ul>
        )}
      </div>
      {isOpen && <BackDrop onClick={toggleMenu} />}
    </>
  );
};

export default UserMenu;
