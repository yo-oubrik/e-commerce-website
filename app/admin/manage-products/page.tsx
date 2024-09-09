import { getAllProducts } from "@/actions/products/productActions";
import { ManageProductsClient } from "./ManageProductsClient";
import { RedirectionPage } from "@/app/components/RedirectionPage";
export const ManageProducts = async () => {
  const products = await getAllProducts();

  if (products.length === 0)
    return (
      <RedirectionPage
        heading={"No products found"}
        description="add products"
        href="/admin/add-products"
      />
    );
  return <ManageProductsClient products={products} />;
};
export default ManageProducts;
