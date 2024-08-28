"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { Category } from "./Category";
import { categories } from "@/app/utils/categories";
import { useRouter } from "next/navigation";
import { generateUrl } from "@/app/utils/helperFunctions/generateUrl";

export const Categories = () => {
  const params = useSearchParams();
  const searchCategory = params?.get("category") || "All";
  const pathname = usePathname();
  const isHome = pathname === "/";
  const router = useRouter();
  if (!isHome) return null;

  const handleCategoryClick = (label: string) => {
    if (label === "All") return router.push("/");
    const url = generateUrl("/", { category: label });
    router.push(url);
  };

  return (
    <div className="bg-white">
      <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-7 gap-x-3 md:gap-x-14 border-b-[1px] px-2 md:px-3">
        {categories.map((category) => (
          <Category
            key={category.label}
            label={category.label}
            Icon={category.icon}
            isActive={searchCategory === category.label}
            onClick={() => handleCategoryClick(category.label)}
          />
        ))}
      </div>
    </div>
  );
};
