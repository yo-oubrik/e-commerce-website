import { CartProduct } from "../utils/types";

interface IIsProductInStock {
  cartProduct: CartProduct;
}

const IsProductInStock: React.FC<IIsProductInStock> = ({ cartProduct }) => {
  return (
    <span
      className={`${
        cartProduct.availableQuantity > 0 ? "text-teal-400" : "text-rose-400"
      }
      `}
    >
      {cartProduct.availableQuantity > 0 ? "In Stock" : "Out of Stock"}
    </span>
  );
};

export default IsProductInStock;
