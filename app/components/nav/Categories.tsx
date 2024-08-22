"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { Category } from "./Category";
import { categories } from "@/app/utils/categories";

export const Categories = () => {
  const params = useSearchParams();
  const searchCategory = params?.get("category") || "All";
  const pathname = usePathname();
  const isHome = pathname === "/";
  if (!isHome) return null;
  return (
    <div className="bg-white">
      <div className="flex items-center justify-center gap-x-3 md:gap-x-14 border-b-[1px] px-2 flex-wrap">
        {categories.map((category) => (
          <Category
            key={category.label}
            label={category.label}
            Icon={category.icon}
            isActive={searchCategory === category.label}
          />
        ))}
      </div>
    </div>
  );
};
