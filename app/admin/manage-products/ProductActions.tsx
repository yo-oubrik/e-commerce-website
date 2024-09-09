import { ActionBtn } from "@/app/components/ActionBtn";
import { MdDelete, MdRemoveRedEye } from "react-icons/md";
import { handleProductDelete } from "./utils/productApiCalls";
import { useRouter } from "next/navigation";
interface IProductActions {
  id: string;
}
export const ProductActions: React.FC<IProductActions> = ({ id }) => {
  const router = useRouter();
  return (
    <div className="flex items-center gap-4 justify-center h-full">
      <ActionBtn
        onClick={() => handleProductDelete(id, router)}
        icon={MdDelete}
        title="Delete product"
      />
      <ActionBtn
        onClick={() => router.push("/product/" + id)}
        icon={MdRemoveRedEye}
        title="View product"
      />
    </div>
  );
};
