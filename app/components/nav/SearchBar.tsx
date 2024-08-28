"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import { generateUrl } from "@/app/utils/helperFunctions/generateUrl";
interface ISearchBar {
  hasBorder?: boolean;
}
export const SearchBar: React.FC<ISearchBar> = ({ hasBorder }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      searchTerm: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!data.searchTerm) return router.push("/");
    const url = generateUrl("/", { searchTerm: data.searchTerm });
    router.push(url);
    reset();
  };
  return (
    <div className="flex">
      <input
        {...register("searchTerm")}
        type="text"
        placeholder="Explore E~Shop"
        className={`py-[6px] px-2 rounded-tl-md  ${
          hasBorder ? "border-slate-500" : "border - transparent"
        } outline-none focus:border-[1px] focus:border-slate-500 border `}
      />
      <button
        onClick={handleSubmit(onSubmit)}
        className="bg-slate-700 py-[6px] px-2 text-white rounded-r-md hover:opacity-85"
      >
        Search
      </button>
    </div>
  );
};
