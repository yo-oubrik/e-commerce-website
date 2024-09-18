import Container from "@/app/components/Container";
import ProductDetails from "./ProductDetails";
import ProductReviews from "./ProductReviews";
import { RedirectionPage } from "@/app/components/RedirectionPage";
import { getProductById } from "@/repository/product/product";
import { AddProductReview } from "./AddProductReview";
import { getCurrentUser } from "@/repository/user/user";
interface IProductParams {
  params: { productId: string };
}
const ProductPage: React.FC<IProductParams> = async ({
  params: { productId },
}) => {
  const product = await getProductById(productId);
  const user = await getCurrentUser();
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
          <AddProductReview product={product} user={user} />
        </>
      )}
    </Container>
  );
};
export default ProductPage;
