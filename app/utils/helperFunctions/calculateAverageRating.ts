import { Review } from "@prisma/client";

export const calculateAverageRating = (reviews: Review[]) => {
  if (reviews.length === 0) {
    return 0;
  }

  const totalRating = reviews.reduce(
    (acc: number, review: Review) => acc + review.rating,
    0
  );
  return totalRating / reviews.length;
};
