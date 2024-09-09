"use client";

import { DeliveryStatus, Order, PaymentStatus, User } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatPrice } from "@/app/utils/helperFunctions/numbersManipulation";
import { ActionBtn } from "@/app/components/ActionBtn";
import { MdDeliveryDining, MdDone, MdRemoveRedEye } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import moment from "moment";
import { Heading } from "@/app/components/Heading";
import clsx from "clsx";
import { OrderWithUser } from "@/app/product/utils/types";

interface IManageOrdersClient {
  orders: OrderWithUser[];
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

  const updateDeliveryStatus = async (
    id: string,
    status: DeliveryStatus,
    successMessage: string
  ) => {
    try {
      await axios.put("/api/order", { id, deliveryStatus: status });
      toast.success(successMessage, { id });
      router.refresh();
    } catch (error) {
      toast.error("Oops! Something went wrong", { id });
    }
  };
  const handleDeliver = useCallback(
    (id: string) => {
      updateDeliveryStatus(id, DeliveryStatus.delivered, "Order Delivered");
    },
    [router]
  );

  const handleDispatch = useCallback(
    (id: string) => {
      updateDeliveryStatus(id, DeliveryStatus.dispatched, "Order Dispatched");
    },
    [router]
  );

  const rows: IRows[] = useMemo(() => {
    return orders.map((order) => ({
      id: order.id,
      userName: order.user.name || "",
      amount: formatPrice(order.amount),
      status: order.status,
      deliveryStatus: order.deliveryStatus,
      createDate: moment(order.createdAt).fromNow(),
    }));
  }, [orders]);

  const columns: GridColDef[] = useMemo(
    () => [
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
        renderCell: (params) => (
          <div className="flex items-center gap-4 justify-center h-full">
            <ActionBtn
              onClick={() => handleDispatch(params.row.id)}
              icon={MdDeliveryDining}
              title="Mark as dispatched"
            />
            <ActionBtn
              onClick={() => handleDeliver(params.row.id)}
              icon={MdDone}
              title="Mark as delivered"
            />
            <ActionBtn
              onClick={() => router.push(`/order/${params.row.id}`)}
              icon={MdRemoveRedEye}
              title="View order"
            />
          </div>
        ),
      },
    ],
    [orders, handleDeliver, handleDispatch, router]
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
