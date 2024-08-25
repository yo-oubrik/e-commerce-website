"use client";

import { Product, ProductImage } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatPrice } from "@/app/utils/formatPrice";
import { truncTitle } from "@/app/utils/helperFunctions/truncTitle";
import { ActionBtn } from "@/app/components/ActionBtn";
import { MdCached, MdDelete, MdRemoveRedEye } from "react-icons/md";
import prisma from "@/libs/prismadb";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { Heading } from "@/app/components/Heading";
interface IManageProductsClient {
  products: Product[];
}
interface IRows {
  id: string;
  name: string;
  quantity: number;
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
  const handleProductDelete = useCallback(async (id: string) => {
    try {
      toast("Deleting product...", {
        id,
      });
      await axios.delete("/api/product", {
        data: {
          id,
        },
      });
      toast.success("Product deleted successfully", {
        id,
      });
      router.refresh();
    } catch (error) {
      console.error("Error trying to delete product with id : " + id, error);
      toast.error("Ooops! something went wrong");
    }
  }, []);
  let rows: IRows[] = [];
  if (products) {
    rows = products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        quantity: product.quantity,
        minQuantity: product.minQuantity,
        maxQuantity: product.maxQuantity,
        price: formatPrice(product.price),
        category: product.category,
        brand: product.brand,
        inStock: product.quantity !== 0,
        images: product.images,
      };
    });
  }
  let columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 110,
    },
    {
      field: "name",
      headerName: "Name",
      width: 180,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 109,
    },
    {
      field: "minQuantity",
      headerName: "Min Quantity",
      width: 109,
    },
    {
      field: "maxQuantity",
      headerName: "Max Quantity",
      width: 109,
    },
    {
      field: "price",
      headerName: "Price(USD)",
      width: 109,
      renderCell: (params) => {
        return <div className="font-bold text-slate-800">{params.value}</div>;
      },
    },
    {
      field: "category",
      headerName: "Category",
      width: 109,
    },
    {
      field: "brand",
      headerName: "Brand",
      width: 109,
    },
    {
      field: "inStock",
      headerName: "Stock State",
      width: 109,
      renderCell: (params) => {
        return (
          <span
            className={`${params.value ? "text-teal-400" : "text-rose-400"}
      `}
          >
            {params.value ? "In Stock" : "Out of Stock"}
          </span>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 140,
      renderCell: (params) => {
        return (
          <div className="flex items-center gap-4 justify-center  h-full">
            <ActionBtn
              onClick={() => {
                const id = params.row.id;
                handleProductDelete(id);
              }}
              icon={MdDelete}
            />
            <ActionBtn
              onClick={() => {
                router.push("/product/" + params.row.id);
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
      <Heading title="Manage Products" />
      <DataGrid columns={columns} rows={rows}></DataGrid>
    </div>
  );
};
