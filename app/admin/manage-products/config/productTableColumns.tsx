import { GridColDef } from "@mui/x-data-grid";
import { ProductActions } from "../ProductActions";

export const productTableColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 110 },
  { field: "name", headerName: "Name", width: 160 },
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
      <span className={`${params.value ? "text-teal-400" : "text-rose-400"}`}>
        {params.value ? "In Stock" : "Out of Stock"}
      </span>
    ),
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 140,
    renderCell: (params) => <ProductActions id={params.row.id} />,
  },
];
