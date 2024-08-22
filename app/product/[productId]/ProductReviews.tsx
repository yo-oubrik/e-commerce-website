import Image from "next/image";
import { Rating } from "@mui/material";
import { Separator } from "@/app/components/Separator";
import moment from "moment";
import Avatar from "@/app/components/Avatar";
import { Product, Review } from "@prisma/client";

interface IProductReviews {
  product: Product & {
    reviews: Review[];
  };
}
const ProductReviews: React.FC<IProductReviews> = ({ product }) => {
  return (
    <>
      {product.reviews.length > 0 ? (
        <>
          <h2 className="mt-5 mb-2 text-xl font-semibold">Product Reviews</h2>
          {product.reviews.map((review: any) => (
            <div key={review.id} className="mb-2">
              <div className="flex gap-2 items-center">
                <Avatar
                  src={review.user.image}
                  alt={`${review.user.name} profile image`}
                />
                <h3 className="font-semibold">{review.user.name}</h3>
                <p className="text-xs text-slate-500">
                  {moment(review.createdAt).fromNow()}
                </p>
              </div>
              <Rating value={review.rating} readOnly className="my-1" />
              <p className="max-w-[320px] mt-[-5px] text-sm text-slate-500">
                {review.comment}
              </p>
            </div>
          ))}
          <Separator />
        </>
      ) : (
        <h2 className="mt-5 mb-2 text-xl font-semibold">No reviews yet</h2>
      )}
    </>
  );
};

export default ProductReviews;
