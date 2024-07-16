import Container from "@/app/components/Container";
import ProductDetails from "./ProductDetails";
import { products } from "@/app/utils/products";
import ProductReviews from "./ProductReviews";
interface IProductParams {
  params: { productId: string };
}
const Product: React.FC<IProductParams> = ({ params }) => {
  const productIndex = products.findIndex((p) => p.id == params.productId);
  const product = products[productIndex as number];
  return (
    <Container customClass="py-8">
      <ProductDetails product={product} />
      <h2 className="mt-5 mb-2 text-2xl font-semibold">Product Review</h2>
      <ProductReviews product={product} />
    </Container>
  );
};

export default Product;
