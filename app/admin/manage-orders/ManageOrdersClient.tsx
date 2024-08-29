"use client";

import { DeliveryStatus, Order, PaymentStatus, User } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatPrice } from "@/app/utils/formatPrice";
import { ActionBtn } from "@/app/components/ActionBtn";
import { MdDeliveryDining, MdDone, MdRemoveRedEye } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import moment from "moment";
import { Heading } from "@/app/components/Heading";
type ExtendedOrder = Order & {
  user: User;
};
interface IManageOrdersClient {
  orders: ExtendedOrder[];
}
interface IRows {
  id: string;
  userName: string;
  amount: string;
  status: PaymentStatus;
  deliveryStatus: DeliveryStatus;
  createDate: string;
}

export const ManageOrdersClient: React.FC<IManageOrdersClient> = ({
  orders,
}) => {
  const router = useRouter();
  const handleDeliver = useCallback(async (id: string) => {
    await axios
      .put("/api/order", {
        id,
        deliveryStatus: DeliveryStatus.delivered,
      })
      .then((res) => {
        toast.success("Order Delivered", { id });
        router.refresh();
      })
      .catch((error) => {
        toast.error("Ooops! something went wrong", { id });
        console.error(
          "Error trying to update delivery status to delivered :",
          error
        );
      });
  }, []);
  const handleDispatch = useCallback(async (id: string) => {
    await axios
      .put("/api/order", {
        id,
        deliveryStatus: DeliveryStatus.dispatched,
      })
      .then((res) => {
        toast.success("Order Dispatched");
        router.refresh();
      })
      .catch((error) => {
        toast.error("Ooops! something went wrong");
        console.error(
          "Error trying to update delivery status to dispatched :",
          error
        );
      });
  }, []);
  let rows: IRows[] = useMemo(
    () =>
      orders.map((order) => {
        return {
          id: order.id,
          userName: order.user.name || "",
          amount: formatPrice(order.amount),
          status: order.status,
          deliveryStatus: order.deliveryStatus,
          createDate: moment(order.createDate).fromNow(),
        };
      }),
    [orders]
  );
  let columns: GridColDef[] = useMemo(
    () => [
      {
        field: "id",
        headerName: "Product ID",
        width: 170,
      },
      {
        field: "userName",
        headerName: "User Name",
        width: 170,
      },
      {
        field: "amount",
        headerName: "Amount (USD)",
        width: 170,
      },
      {
        field: "status",
        headerName: "Payment Status",
        width: 170,
        renderCell: (params) => {
          return (
            <span
              className={`${
                params.value === "complete"
                  ? "text-teal-400"
                  : "pending"
                  ? "text-rose-400"
                  : ""
              }
  `}
            >
              {params.value}
            </span>
          );
        },
      },
      {
        field: "deliveryStatus",
        headerName: "Delivery Status",
        width: 170,
        renderCell: (params) => {
          return (
            <span
              className={`${
                params.value === DeliveryStatus.delivered
                  ? "text-teal-400"
                  : DeliveryStatus.pending
                  ? "text-rose-400"
                  : DeliveryStatus.dispatched
                  ? "text-orange-400"
                  : ""
              }
  `}
            >
              {params.value}
            </span>
          );
        },
      },
      {
        field: "createDate",
        headerName: "Create Date",
        width: 170,
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 170,
        renderCell: (params) => {
          return (
            <div className="flex items-center gap-4 justify-center  h-full">
              <ActionBtn
                onClick={() => {
                  const id = params.row.id;
                  handleDispatch(id);
                }}
                icon={MdDeliveryDining}
                title="Mark as dispatched"
              />
              <ActionBtn
                onClick={() => {
                  const id = params.row.id;
                  handleDeliver(id);
                }}
                icon={MdDone}
                title="mark as delivered"
              />
              <ActionBtn
                onClick={() => {
                  router.push(`/order/${params.row.id}`);
                }}
                icon={MdRemoveRedEye}
                title="View order"
              />
            </div>
          );
        },
      },
    ],
    [orders, handleDeliver, handleDispatch]
  );

  return (
    <div>
      <Heading title="Manage orders" />
      <DataGrid
        columns={columns}
        rows={rows}
        paginationModel={{ pageSize: 10, page: 0 }}
        pageSizeOptions={[10, 15, 20]}
        pagination
      />
    </div>
  );
};
