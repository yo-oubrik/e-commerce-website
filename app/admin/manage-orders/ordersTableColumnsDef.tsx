import { GridColDef } from "@mui/x-data-grid";
import clsx from "clsx";
import { OrderActions } from "./OrderActions";
import { DeliveryStatus, PaymentStatus } from "@prisma/client";

export const orderTableColumnsDef: GridColDef[] = [
  { field: "id", headerName: "Product ID", width: 170 },
  { field: "userName", headerName: "User Name", width: 170 },
  { field: "amount", headerName: "Amount (USD)", width: 170 },
  {
    field: "status",
    headerName: "Payment Status",
    width: 170,
    renderCell: (params) => (
      <span
        className={clsx({
          "text-teal-400": params.value === PaymentStatus.complete,
          "text-rose-400": params.value === PaymentStatus.pending,
        })}
      >
        {params.value}
      </span>
    ),
  },
  {
    field: "deliveryStatus",
    headerName: "Delivery Status",
    width: 170,
    renderCell: (params) => (
      <span
        className={clsx({
          "text-teal-400": params.value === DeliveryStatus.delivered,
          "text-rose-400": params.value === DeliveryStatus.pending,
          "text-orange-400": params.value === DeliveryStatus.dispatched,
        })}
      >
        {params.value}
      </span>
    ),
  },
  { field: "createDate", headerName: "Create Date", width: 170 },
  {
    field: "actions",
    headerName: "Actions",
    width: 170,
    renderCell: (params) => <OrderActions id={params.row.id} />,
  },
];
