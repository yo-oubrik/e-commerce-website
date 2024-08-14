"use client";
import { IconBaseProps } from "react-icons";
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
    <div className="flex items-center justify-center gap-x-3 md:gap-14 shadow-sm border-b-[1px] px-2 pt-4 flex-wrap">
      <Link href={"/admin"}>
        <NavbarItem
          label={"Summary"}
          Icon={MdDashboard}
          isActive={pathname === "/admin"}
        />
      </Link>
      <Link href={"/admin/add-products"}>
        <NavbarItem
          label={"Add Products"}
          Icon={MdLibraryAdd}
          isActive={pathname === "/admin/add-products"}
        />
      </Link>
      <Link href={"/admin/manage-products"}>
        <NavbarItem
          label={"Manage Products"}
          Icon={MdDns}
          isActive={pathname === "/admin/manage-products"}
        />
      </Link>
      <Link href={"/admin/manage-orders"}>
        <NavbarItem
          label={"Manage Orders"}
          Icon={MdFormatListBulleted}
          isActive={pathname === "/admin/manage-orders"}
        />
      </Link>
    </div>
  );
};
