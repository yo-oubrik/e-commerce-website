"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { generateUrl } from "@/app/utils/functions/strings";

interface ISearchBar {
  hasBorder?: boolean;
}

export const SearchBar: React.FC<ISearchBar> = ({ hasBorder }) => {
  const pathname = usePathname();
  if (pathname !== "/") return;
  const category = useSearchParams()?.get("category");
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      searchTerm: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const defaultUrl = generateUrl("/", { category });
    if (!data.searchTerm) return router.push(defaultUrl);
    const url = generateUrl("/", {
      search: data.searchTerm,
      category,
    });
    router.push(url);
    reset();
  };

  return (
    <form className="flex" onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("searchTerm")}
        type="text"
        placeholder="Explore E~Shop"
        className={`py-[6px] px-2 rounded-tl-md  ${
          hasBorder ? "border-slate-500" : "border-transparent"
        } outline-none focus:border-[1px] focus:border-slate-500 border `}
      />
      <button
        className="bg-slate-700 py-[6px] px-2 text-white rounded-r-md hover:opacity-85"
        type="submit"
      >
        Search
      </button>
    </form>
  );
};
