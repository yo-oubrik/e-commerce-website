"use client";

import { Heading } from "@/app/components/Heading";
import { DataGrid } from "@mui/x-data-grid";
import { Product } from "@prisma/client";
import { useMemo } from "react";
import { productTableColumnsDef } from "./productTableColumnsDef";
import { formatProductsForDisplay } from "./utils/productRows";

interface IManageProductsClient {
  products: Product[];
}

export const ManageProductsClient: React.FC<IManageProductsClient> = ({
  products,
}) => {
  const rows = useMemo(() => formatProductsForDisplay(products), [products]);

  return (
    <div>
      <Heading title="Manage Products" />
      <DataGrid columns={productTableColumnsDef} rows={rows} />
    </div>
  );
};
