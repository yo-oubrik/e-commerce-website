import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { use, useCallback } from "react";
import { IconType } from "react-icons";

interface INavbar {
  label: string;
  Icon: IconType;
  isActive: boolean;
}
export const Category: React.FC<INavbar> = ({ label, Icon, isActive }) => {
  const router = useRouter();
  //   const params = useSearchParams();
  const handleClick = useCallback(
    () => {
      if (label === "All") return router.push("/");
      const url = queryString.stringifyUrl(
        {
          url: "/",
          query: { category: label },
        },
        {
          skipEmptyString: true,
          skipNull: true,
        }
      );
      router.push(url);
      /* let currentQuery = params ? queryString.parse(params.toString()) : {};
    const updatedQuery = { ...currentQuery, category: label };
    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      {
        skipEmptyString: true,
        skipNull: true,
      }
    );
    router.push(url); */
    },
    [] /* [label, params, router] */
  );
  return (
    <div
      className={`flex items-center gap-2 p-3 border-b-2  hover:text-slate-800 transition cursor-pointer ${
        isActive
          ? "border-b-slate-800 text-slate-800"
          : "border-transparent text-slate-500"
      }`}
      onClick={handleClick}
    >
      <Icon size={24} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};
