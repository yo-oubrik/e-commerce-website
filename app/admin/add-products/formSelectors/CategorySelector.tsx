import { categories } from "@/app/utils/categories";
import { Category } from "../Category";
interface ICategorySelector {
  selectedCategory: string;
  handleCategorySelect: (category: string) => void;
  hasError: boolean;
}

export const CategorySelector: React.FC<ICategorySelector> = ({
  handleCategorySelect,
  hasError,
  selectedCategory,
}) => {
  return (
    <>
      <p className="font-bold">Select a category</p>
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 place-content-center">
        {categories.map((category) => {
          if (category.label === "All") return null;
          return (
            <Category
              label={category.label}
              Icon={category.icon}
              isActive={category.label === selectedCategory}
              key={category.label}
              onClick={() => {
                handleCategorySelect(category.label);
              }}
            />
          );
        })}
      </div>
      {hasError && <p className="text-rose-500">Please select a category</p>}
    </>
  );
};
