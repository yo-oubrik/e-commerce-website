"use client";
import { truncTitle } from "@/app/utils/functions/strings";
import Image from "next/image";
import { formatPrice } from "@/app/utils/functions/numbers";
import { Rating } from "@mui/material";
import { calculateAverageRating } from "@/app/utils/functions/reviews";
import Link from "next/link";
import { ProductWithReviews } from "@/app/product/utils/types";

interface ProductCardProps {
  product: ProductWithReviews;
}
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const numberOfReviews = product.reviews.length;
  const productRating = calculateAverageRating(product.reviews);

  return (
    <Link href={`/product/${product.id}`}>
      <div
        key={product.id}
        className="flex flex-col items-center justify-between cursor-pointer border-[1.2px] border-slate-200 bg-slate-50 py-3 px-4 rounded-md transition hover:scale-105 hover:shadow-sm"
      >
        <div className="w-[min(100%,180px)] aspect-square relative">
          <Image
            src={`${product.images[0].imageUrl}`}
            fill
            alt={product.name}
            className="object-contain"
          />
        </div>
        <h2 title={`${product.name}`} className="mt-2">
          {truncTitle(product.name)}
        </h2>
        <Rating value={productRating} readOnly />
        <p className="text-sm">{numberOfReviews} reviews</p>
        <p className="font-bold">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
