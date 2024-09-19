import { Review } from "@prisma/client";
import { isArrayEmpty } from "./arrays";

export const calculateAverageRating = (reviews: Review[]) => {
  if (isArrayEmpty(reviews)) {
    return 0;
  }

  const totalRating = reviews.reduce(
    (acc: number, review: Review) => acc + review.rating,
    0
  );
  return totalRating / reviews.length;
};
