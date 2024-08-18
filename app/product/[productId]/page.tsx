import Container from "@/app/components/Container";
import ProductDetails from "./ProductDetails";
import { products } from "@/app/utils/products";
import ProductReviews from "./ProductReviews";
import { RedirectionPage } from "@/app/components/RedirectionPage";
import { getProductById } from "@/actions/products/productActions";
interface IProductParams {
  params: { productId: string };
}
const Product: React.FC<IProductParams> = async ({ params: { productId } }) => {
  console.debug("Trying to get product with id" + productId);
  const product = await getProductById(productId);
  console.debug("Fetched producy", product);

  return (
    <Container customClass="py-8">
      {!product ? (
        <RedirectionPage
          heading="Oops! No product found"
          href="/"
          description="Go back to homepage"
        />
      ) : (
        <>
          <ProductDetails product={product} />
          <ProductReviews product={product} />
        </>
      )}
    </Container>
  );
};

export default Product;
