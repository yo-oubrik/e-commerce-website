import HomeBanner from "./components/home/HomeBanner";
import Container from "./components/Container";
import ProductCard from "./components/home/ProductCard";
import getProducts from "@/actions/products/productActions";
export default async function Home() {
  console.debug("Trying to get all products");
  const products = await getProducts();
  console.debug("Fetched products ", products);

  return (
    <div className="py-8">
      <Container>
        <HomeBanner />
        <section className="grid xs:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {products.map((product) => (
            <ProductCard product={product} />
          ))}
        </section>
      </Container>
    </div>
  );
}
