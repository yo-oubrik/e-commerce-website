"use client";

import { Order, User } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatPrice } from "@/app/utils/formatPrice";
import { ActionBtn } from "@/app/components/ActionBtn";
import { MdDeliveryDining, MdDone, MdRemoveRedEye } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import moment from "moment";
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
  status: string;
  deliveryStatus: string | null;
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
        deliveryStatus: "delivered",
      })
      .then((res) => {
        toast.success("Order Delivered", { id });
        router.refresh();
      })
      .catch((error) => {
        toast.error("Ooops! something went wrong", { id });
        console.log(
          "Error trying to update delivery status to delivred :",
          error
        );
      });
  }, []);
  const handleDispatch = useCallback(async (id: string) => {
    await axios
      .put("/api/order", {
        id,
        deliveryStatus: "dispatched",
      })
      .then((res) => {
        toast.success("Order Dispatched");
        router.refresh();
      })
      .catch((error) => {
        toast.error("Ooops! something went wrong");
        console.log(
          "Error trying to update delivery status to dispatched :",
          error
        );
      });
  }, []);
  let rows: IRows[] = [];
  if (orders) {
    rows = orders.map((order) => {
      return {
        id: order.id,
        userName: order.user.name || "",
        amount: formatPrice(order.amount),
        status: order.status,
        deliveryStatus: order.deliveryStatus,
        createDate: moment(order.createDate).fromNow(),
      };
    });
  }
  let columns: GridColDef[] = [
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
              params.value === "delivered"
                ? "text-teal-400"
                : "pending"
                ? "text-rose-400"
                : "dispatched"
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
            />
            <ActionBtn
              onClick={() => {
                const id = params.row.id;
                handleDeliver(id);
              }}
              icon={MdDone}
            />
            <ActionBtn
              onClick={() => {
                router.push(`/order/${params.row.id}`);
              }}
              icon={MdRemoveRedEye}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <h2 className="text-center text-2xl mb-7">Manage orders</h2>
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
