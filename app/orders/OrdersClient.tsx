"use client";

import { Order, User } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatPrice } from "@/app/utils/formatPrice";
import { ActionBtn } from "@/app/components/ActionBtn";
import { MdRemoveRedEye } from "react-icons/md";
import { useRouter } from "next/navigation";
import moment from "moment";
interface IManageOrdersClient {
  orders: Order[];
}
interface IRows {
  id: string;
  amount: string;
  status: string;
  deliveryStatus: string | null;
  createDate: string;
}

export const OrdersClient: React.FC<IManageOrdersClient> = ({ orders }) => {
  const router = useRouter();
  let rows: IRows[] = [];
  if (orders) {
    rows = orders.map((order) => {
      return {
        id: order.id,
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
      width: 188,
    },
    {
      field: "amount",
      headerName: "Amount (USD)",
      width: 188,
    },
    {
      field: "status",
      headerName: "Payment Status",
      width: 188,
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
      width: 188,
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
      width: 188,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 188,
      renderCell: (params) => {
        return (
          <div className="flex items-center gap-4 justify-center  h-full">
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
