import { CartProduct } from "../product/utils/types";
import ProductCartRow from "./ProductCartRow";

interface IProductCartTable {
  cartProducts: CartProduct[];
}

const ProductCartTable: React.FC<IProductCartTable> = ({ cartProducts }) => {
  return (
    <div>
      <div className="hidden sm:grid sm:grid-cols-5 border-b border-slate-200 text-xs py-2">
        <div className="col-span-2">PRODUCT</div>
        <div className="text-center">PRICE</div>
        <div className="text-center">QUANTITY</div>
        <div className="text-end">SUBTOTAL</div>
      </div>
      {cartProducts.map((product) => (
        <ProductCartRow product={product} key={product.id} />
      ))}
    </div>
  );
};

export default ProductCartTable;
