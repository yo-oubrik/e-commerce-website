"use client";
import { NavbarItem } from "./NavbarItem";
import Link from "next/link";
import {
  MdDashboard,
  MdDns,
  MdFormatListBulleted,
  MdLibraryAdd,
} from "react-icons/md";
import { usePathname } from "next/navigation";
export const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className="grid xs:grid-cols-2 md:grid-cols-4 max-md:gap-x-3 border-b-[1px] px-2 md:px-3">
      <NavbarItem
        href="/admin"
        label={"Summary"}
        Icon={MdDashboard}
        isActive={pathname === "/admin"}
      />
      <NavbarItem
        href="/admin/add-products"
        label={"Add Products"}
        Icon={MdLibraryAdd}
        isActive={pathname === "/admin/add-products"}
      />
      <NavbarItem
        href="/admin/manage-products"
        label={"Manage Products"}
        Icon={MdDns}
        isActive={pathname === "/admin/manage-products"}
      />
      <NavbarItem
        href="/admin/manage-orders"
        label={"Manage Orders"}
        Icon={MdFormatListBulleted}
        isActive={pathname === "/admin/manage-orders"}
      />
    </div>
  );
};
