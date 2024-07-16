import Image from "next/image";
import { Rating } from "@mui/material";
import { Separator } from "@/app/components/Separator";
import moment from "moment";
import Avatar from "@/app/components/Avatar";
interface IProductReviews {
  product: any;
}
const ProductReviews: React.FC<IProductReviews> = ({ product }) => {
  return (
    <>
      {product.reviews.length > 0 && (
        <>
          <h2 className="mt-5 mb-2 text-2xl font-semibold">Product Review</h2>
          {product.reviews.map((review: any) => (
            <div key={review.id}>
              <div className="flex gap-2 items-center">
                <Avatar
                  src={review.user.imageUrl}
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
      )}
    </>
  );
};

export default ProductReviews;
