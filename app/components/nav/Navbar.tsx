import Link from "next/link";
import Container from "../Container";
import { Redressed } from "next/font/google";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import { getCurrentUser } from "@/actions/user/userActions";
import { Categories } from "./Categories";
import { SearchBar } from "./SearchBar";
const redressed = Redressed({
  subsets: ["latin"],
  weight: ["400"],
});
const Navbar = async () => {
  const currentUser = await getCurrentUser();
  return (
    <header className="sticky top-0 z-30">
      <div className="py-4 bg-slate-200">
        <Container>
          <div className="flex justify-between items-center">
            <Link href="/" className={`${redressed.className} text-2xl`}>
              E~Shop
            </Link>
            <div className="max-sm:hidden">
              <SearchBar />
            </div>
            <div className="flex items-center gap-6 md:gap-7">
              <CartCount />
              <UserMenu currentUser={currentUser} />
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Navbar;
