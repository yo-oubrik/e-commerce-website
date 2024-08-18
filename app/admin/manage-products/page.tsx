import getProducts from "@/actions/products/productActions";
import { ManageProductsClient } from "./ManageProductsClient";
import { RedirectionPage } from "@/app/components/RedirectionPage";
export const ManageProducts = async () => {
  console.log("Calling getProducts");
  const products = await getProducts();
  console.log("Fetched products", products);

  if (products.length === 0)
    return (
      <RedirectionPage
        heading={"No products found"}
        description="add products"
        href="/add-products"
      />
    );
  return <ManageProductsClient products={products} />;
};
export default ManageProducts;
