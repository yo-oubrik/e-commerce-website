import { ActionBtn } from "@/app/components/ActionBtn";
import { useRouter } from "next/navigation";
import { MdDeliveryDining, MdDone, MdRemoveRedEye } from "react-icons/md";
import { handleDeliver, handleDispatch } from "./utils/ordersApiCalls";
interface IOderActions {
  id: string;
}
export const OrderActions: React.FC<IOderActions> = ({ id }) => {
  const router = useRouter();
  return (
    <div className="flex items-center gap-4 justify-center h-full">
      <ActionBtn
        onClick={() => handleDispatch(id, router)}
        icon={MdDeliveryDining}
        title="Mark as dispatched"
      />
      <ActionBtn
        onClick={() => handleDeliver(id, router)}
        icon={MdDone}
        title="Mark as delivered"
      />
      <ActionBtn
        onClick={() => router.push(`/order/${id}`)}
        icon={MdRemoveRedEye}
        title="View order"
      />
    </div>
  );
};
