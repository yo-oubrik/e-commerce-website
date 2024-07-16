import Link from "next/link";
import FooterBlock from "./FooterBlock";
import Container from "../Container";

//Icons
import { MdFacebook } from "react-icons/md";
import {
  AiFillInstagram,
  AiFillTwitterCircle,
  AiFillYoutube,
} from "react-icons/ai";
const Footer = () => {
  return (
    <footer className="py-11 bg-slate-700 text-slate-200 text-sm max-sm:text-center">
      <Container>
        <div className="sm:flex flex-wrap">
          <FooterBlock>
            <h3 className="mb-2 text-base font-bold">Shop Categories</h3>
            <div className="flex flex-col">
              <Link href={"#"}>Phones</Link> <Link href={"#"}>Laptops</Link>
              <Link href={"#"}>Desktops</Link>
              <Link href={"#"}>Watches</Link> <Link href={"#"}>TVs</Link>
              <Link href={"#"}>Accessories</Link>
            </div>
          </FooterBlock>
          <FooterBlock>
            <h3 className="mb-2 text-base font-bold">Customer Service</h3>
            <div className="flex flex-col">
              <Link href={"#"}>Contact Us</Link>
              <Link href={"#"}>Shipping Policy</Link>
              <Link href={"#"}>Returns & Exchanges</Link>
              <Link href={"#"}>Watches</Link> <Link href={"#"}>FAQs</Link>
            </div>
          </FooterBlock>
          <FooterBlock>
            <h3 className="mb-2 text-base font-bold">About Us</h3>
            <p>
              At our electronics store, we are dedicated to providing the latest
              and greatest devices and accessories to our customers. With a wide
              selection of phones, TVs, laptops, watches, and accessories.
            </p>
            <p className="mt-3">
              &copy; {new Date().getFullYear()} E-Shop. All rights reserved.
            </p>
          </FooterBlock>
          <FooterBlock>
            <h3 className="mb-2 text-base font-bold">Follow Us</h3>
            <div className="flex gap-4 items-center">
              <Link href={"#"}>
                <MdFacebook
                  className="hover:opacity-85 duration-300"
                  size={30}
                />
              </Link>
              <Link href={"#"}>
                <AiFillYoutube
                  className="hover:opacity-85 duration-300"
                  size={30}
                />
              </Link>
              <Link href={"#"}>
                <AiFillInstagram
                  className="hover:opacity-85 duration-300"
                  size={30}
                />
              </Link>
              <Link href={"#"}>
                <AiFillTwitterCircle
                  className="hover:opacity-85 duration-300"
                  size={30}
                />
              </Link>
            </div>
          </FooterBlock>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
