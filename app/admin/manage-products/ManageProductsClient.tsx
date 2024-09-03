"use client";

import { Product, ProductImage } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatPrice } from "@/app/utils/formatPrice";
import { ActionBtn } from "@/app/components/ActionBtn";
import { MdDelete, MdRemoveRedEye } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { Heading } from "@/app/components/Heading";

interface IManageProductsClient {
  products: Product[];
}

interface IRows {
  id: string;
  name: string;
  availableQuantity: number;
  minQuantity: number;
  maxQuantity: number;
  price: string;
  category: string;
  brand: string;
  inStock: boolean;
  images: ProductImage[];
}

export const ManageProductsClient: React.FC<IManageProductsClient> = ({
  products,
}) => {
  const router = useRouter();

  const handleProductDelete = useCallback(
    async (id: string) => {
      try {
        toast.loading("Deleting product...", { id });
        await axios.delete("/api/product", { data: { id } });
        toast.success("Product deleted successfully", { id });
        router.refresh();
      } catch (error) {
        console.error(`Error trying to delete product with id: ${id}`, error);
        toast.error("Ooops! Something went wrong.");
      }
    },
    [router]
  );

  const columns: GridColDef[] = useMemo(
    () => [
      { field: "id", headerName: "ID", width: 110 },
      { field: "name", headerName: "Name", width: 180 },
      {
        field: "availableQuantity",
        headerName: "Available Quantity",
        width: 140,
      },
      { field: "minQuantity", headerName: "Min Quantity", width: 109 },
      { field: "maxQuantity", headerName: "Max Quantity", width: 109 },
      {
        field: "price",
        headerName: "Price(USD)",
        width: 109,
        renderCell: (params) => (
          <div className="font-bold text-slate-800">{params.value}</div>
        ),
      },
      { field: "category", headerName: "Category", width: 109 },
      { field: "brand", headerName: "Brand", width: 109 },
      {
        field: "inStock",
        headerName: "Stock State",
        width: 109,
        renderCell: (params) => (
          <span
            className={`${params.value ? "text-teal-400" : "text-rose-400"}`}
          >
            {params.value ? "In Stock" : "Out of Stock"}
          </span>
        ),
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 140,
        renderCell: (params) => (
          <div className="flex items-center gap-4 justify-center h-full">
            <ActionBtn
              onClick={() => handleProductDelete(params.row.id)}
              icon={MdDelete}
              title="Delete product"
            />
            <ActionBtn
              onClick={() => router.push("/product/" + params.row.id)}
              icon={MdRemoveRedEye}
              title="View product"
            />
          </div>
        ),
      },
    ],
    [handleProductDelete, router]
  );

  const rows: IRows[] = useMemo(
    () =>
      products.map((product: Product) => ({
        id: product.id,
        name: product.name,
        availableQuantity: product.availableQuantity,
        minQuantity: product.minQuantity,
        maxQuantity: product.maxQuantity,
        price: formatPrice(product.price),
        category: product.category,
        brand: product.brand,
        inStock: product.availableQuantity !== 0,
        images: product.images,
      })),
    [products]
  );

  return (
    <div>
      <Heading title="Manage Products" />
      <DataGrid columns={columns} rows={rows} />
    </div>
  );
};
