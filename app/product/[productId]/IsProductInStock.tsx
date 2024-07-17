import { CartProduct } from "../utils/types";

interface IIsProductInStock {
  product: CartProduct;
}

const IsProductInStock: React.FC<IIsProductInStock> = ({ product }) => {
  return (
    <span
      className={`${
        product.availableQuantity > 0 ? "text-teal-400" : "text-rose-400"
      }
      `}
    >
      {product.availableQuantity > 0 ? "In Stock" : "Out of Stock"}
    </span>
  );
};

export default IsProductInStock;
