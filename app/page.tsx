import Image from "next/image";
import HomeBanner from "./components/home/HomeBanner";
import { products } from "./utils/products";
import Container from "./components/Container";
import ProductCard from "./components/home/ProductCard";
export default function Home() {
  return (
    <div className="p-8">
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
