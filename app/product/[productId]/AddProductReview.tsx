"use client";
import { DeliveryStatus, Product } from "@prisma/client";
import { UserWithSafeTimestamps } from "../utils/types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Rating } from "@mui/material";
import TextArea from "@/app/components/input/TextArea";
import Button from "@/app/components/Button";
import toast from "react-hot-toast";
import axios from "axios";
import { getErrorMessage } from "@/app/utils/helperFunctions/getErrorMessage";
interface IAddProductReview {
  user: UserWithSafeTimestamps;
  product: Product;
}
export const AddProductReview: React.FC<IAddProductReview> = ({
  product,
  user,
}) => {
  if (!product || !user) return null;

  const isProductDelivered = user.orders.some(
    (order) =>
      order.deliveryStatus === DeliveryStatus.delivered &&
      order.cart_products.some((prod) => prod.productId === product.id)
  );
  if (!isProductDelivered) return null;
  const hasAlreadyRated = user.reviews.some(
    (review) => review.productId === product.id
  );
  if (hasAlreadyRated) return null;

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      comment: "",
      rating: 0,
    },
  });
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!data.rating) {
      return toast.error("Please rate the product");
    }
    const rating = {
      ...data,
      userId: user?.id,
      productId: product.id,
    };
    setIsLoading(true);
    await axios
      .post("/api/rating", rating)
      .then((response) => {
        toast.success("Product rated successfully");
        reset();
        router.refresh();
      })
      .catch((error) => {
        console.error("Failed to rate product :", getErrorMessage(error));
        toast.error("Oops! Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="flex flex-col gap-2 max-w-[500px]">
      <h2 className="font-medium">Add Rating</h2>
      <Rating
        onChange={(event, newValue) => {
          setCustomValue("rating", newValue);
        }}
      />
      <TextArea
        id={"comment"}
        label={"Comment"}
        register={register}
        errors={errors}
        required
      />
      <Button
        label={isLoading ? "Loading" : "Rate Product"}
        onClick={handleSubmit(onSubmit)}
      />
    </div>
  );
};
