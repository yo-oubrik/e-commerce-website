import HomeBanner from "./components/home/HomeBanner";
import Container from "./components/Container";
import { getProducts } from "@/repository/product/product";
import { ProductsSection } from "./ProductsSection";
import { SearchBar } from "./components/nav/SearchBar";
import { SearchParams } from "./product/utils/types";
interface IHome {
  searchParams: SearchParams;
}
const Home: React.FC<IHome> = async ({ searchParams }) => {
  let { category, search } = searchParams;
  category = category !== "All" ? category : "";
  const products = await getProducts({ search, category });

  return (
    <div className="py-8">
      <Container>
        <HomeBanner />
        <div className="flex justify-center sm:hidden mt-8">
          <SearchBar hasBorder />
        </div>
        <div className="mt-8">
          <ProductsSection products={products} />
        </div>
      </Container>
    </div>
  );
};
export default Home;
