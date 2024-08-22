import HomeBanner from "./components/home/HomeBanner";
import Container from "./components/Container";
import getProducts, { IProduct } from "@/actions/products/productActions";
import { ProductsSection } from "./ProductsSection";
interface IHome {
  searchParams: IProduct;
}
const Home: React.FC<IHome> = async ({ searchParams }) => {
  let { category = "", search = "" } = searchParams;
  category = category !== "All" ? category : "";
  const products = await getProducts({ search, category });

  return (
    <div className="py-8">
      <Container>
        <HomeBanner />
        <ProductsSection products={products} />
      </Container>
    </div>
  );
};
export default Home;
