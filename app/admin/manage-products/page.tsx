import getProducts from "@/actions/products/productActions";
import { ManageProductsClient } from "./ManageProductsClient";
export const manageProducts = async () => {
  const products = await getProducts();

  return (
    <div>
      <ManageProductsClient products={products} />
    </div>
  );
};
export default manageProducts;
