import { getAllProducts } from "@/repository/product/product";
import { ManageProductsClient } from "./ManageProductsClient";
import { RedirectionPage } from "@/app/components/RedirectionPage";
import { isArrayEmpty } from "@/app/utils/helperFunctions/helperFunctions";
export const ManageProducts = async () => {
  const products = await getAllProducts();

  if (isArrayEmpty(products))
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
