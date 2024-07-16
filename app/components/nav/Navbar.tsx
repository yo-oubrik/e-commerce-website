import Link from "next/link";
import Container from "../Container";
import { Redressed } from "next/font/google";
const redressed = Redressed({
  subsets: ["latin"],
  weight: ["400"],
});
const Navbar = () => {
  return (
    <header className="sticky top-0 z-10 py-4 bg-slate-200 shadow-sm border-b">
      <Container>
        <div className="flex justify-between items-center">
          <Link href="/" className={`${redressed.className} text-2xl`}>
            E~Shop
          </Link>
          <div>Search</div>
          <div className="flex  gap-8 md:gap-12">
            <div>Cart</div>
            <div>Profile</div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
