"use client";

import { Heading } from "@/app/components/Heading";
import { OrderWithUser } from "@/app/product/utils/types";
import { formatPrice } from "@/app/utils/helperFunctions/numbersManipulation";
import { DataGrid } from "@mui/x-data-grid";
import { DeliveryStatus, PaymentStatus } from "@prisma/client";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { orderTableColumnsDef } from "./ordersTableColumnsDef";

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

  return (
    <div>
      <Heading title="Manage orders" />
      <DataGrid
        columns={orderTableColumnsDef}
        rows={rows}
        paginationModel={{ pageSize: 10, page: 0 }}
        pageSizeOptions={[10, 15, 20]}
        pagination
      />
    </div>
  );
};
