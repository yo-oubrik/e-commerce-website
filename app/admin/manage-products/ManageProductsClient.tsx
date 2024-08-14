"use client";

import { Product, ProductImage } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatPrice } from "@/app/utils/formatPrice";
import { truncTitle } from "@/app/utils/helperFunctions/truncTitle";
import { max, min } from "moment";

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
  let rows: IRows[] = [];
  if (products) {
    rows = products.map((product) => {
      return {
        id: product.id,
        name: truncTitle(product.name),
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
      width: 220,
    },
    {
      field: "name",
      headerName: "Name",
      width: 105,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 105,
    },
    {
      field: "minQuantity",
      headerName: "Min Quantity",
      width: 105,
    },
    {
      field: "maxQuantity",
      headerName: "Max Quantity",
      width: 105,
    },
    {
      field: "price",
      headerName: "Price(USD)",
      width: 105,
      renderCell: (params) => {
        return <div className="font-bold text-slate-800">{params.value}</div>;
      },
    },
    {
      field: "category",
      headerName: "Category",
      width: 105,
    },
    {
      field: "brand",
      headerName: "Brand",
      width: 105,
    },
    {
      field: "inStock",
      headerName: "Stock State",
      width: 105,
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
      width: 105,
      renderCell: (params) => {
        return <div></div>;
      },
    },
  ];
  return (
    <div>
      <h2 className="text-center text-2xl mb-7">Manage Products</h2>
      <DataGrid columns={columns} rows={rows}></DataGrid>
    </div>
  );
};
