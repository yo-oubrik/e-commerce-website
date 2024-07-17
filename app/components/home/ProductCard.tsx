"use client";
import { truncTitle } from "@/app/utils/truncTitle";
import Image from "next/image";
import { formatPrice } from "@/app/utils/formatPrice";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";
interface ProductCardProps {
  product: any;
}
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const numberOfReviews = product.reviews.length;
  const productRating =
    numberOfReviews > 0
      ? product.reviews.reduce(
          (acc: number, review: any) => acc + review.rating,
          0
        ) / numberOfReviews
      : 0;

  const router = useRouter();
  const handleCardClick = () => {
    router.push(`/product/${product.id}`);
  };

  return (
    <div
      key={product.id}
      className="flex flex-col justify-between items-center text-center  cursor-pointer border-[1.2px] border-slate-200 bg-slate-50 py-3 px-4 rounded-md transition hover:scale-105 hover:shadow-sm"
      onClick={handleCardClick}
    >
      <div className="w-[min(100%,180px)] aspect-square relative">
        <Image
          src={`${product.images[0].imageUrl}`}
          fill
          alt={product.name}
          className="mx-auto object-contain"
        />
      </div>
      <h2 title={`${product.name}`} className="mt-2">
        {truncTitle(product.name)}
      </h2>
      <Rating value={productRating} readOnly />
      <p className="text-sm">{numberOfReviews} reviews</p>
      <p className="font-bold">{formatPrice(product.price)}</p>
    </div>
  );
};

export default ProductCard;
