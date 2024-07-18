"use client";
import { AiFillCaretDown } from "react-icons/ai";
import Avatar from "../Avatar";
import { useState } from "react";
import Link from "next/link";
const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative z-30">
      <div
        className={`flex gap-1 p-[5px] rounded-3xl items-center border border-slate-400 cursor-pointer transition  ${
          isOpen ? "shadow-md" : ""
        }`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Avatar />
        <AiFillCaretDown />
      </div>
      {isOpen && (
        <ul className="absolute border rounded-md w-44 bg-white shadow-md right-0 top-12 text-sm overflow-hidden">
          <Link href="/login">
            <li className="p-3 transition hover:bg-slate-50">login</li>
          </Link>
          <Link href="/register">
            <li className="p-3 transition hover:bg-slate-50">register</li>
          </Link>
        </ul>
      )}
    </div>
  );
};

export default UserMenu;
