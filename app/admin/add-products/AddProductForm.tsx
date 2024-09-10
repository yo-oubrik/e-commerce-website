"use client";
import TextArea from "@/app/components/input/TextArea";
import { useProductForm } from "@/hooks/useAddProductForm";
import StringInput from "@/app/components/input/StringInput";
import Button from "@/app/components/Button";
import { PriceInput } from "./inputs/PriceInput";
import { QuantityInput } from "./inputs/QuantityInput";
import { MaxQuantityInput } from "./inputs/MaxQuantityInput";
import { MinQuantityInput } from "./inputs/MinQuantityInput";
import { CategorySelector } from "./selectors/CategorySelector";
import { ColorSelector } from "./selectors/ColorSelector";

export type ImageType = {
  color: string;
  colorCode: string;
  image: File | null;
};

export type UploadedImageType = {
  color: string;
  colorCode: string;
  imageUrl: string;
};

export const AddProductForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    selectedCategory,
    errors,
    images,
    isLoading,
    isProductCreated,
    hasError,
    loadingProgress,
    onSubmit,
    handleCategorySelect,
    addImageToState,
    removeImageFromState,
  } = useProductForm();
  return (
    <>
      <StringInput
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        requiredMessage="Product name is required"
      />

      <PriceInput
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <StringInput
        id="brand"
        label="Brand"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        requiredMessage="Brand name is required"
      />

      <TextArea
        id="description"
        label="Description"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        requiredMessage="Product description is required"
      />
      <QuantityInput
        required
        errors={errors}
        disabled={isLoading}
        register={register}
      />

      <MaxQuantityInput
        errors={errors}
        disabled={isLoading}
        register={register}
        required
        minQuantity={parseInt(getValues("minQuantity"))}
      />

      <MinQuantityInput
        errors={errors}
        disabled={isLoading}
        register={register}
        maxQuantity={parseInt(getValues("maxQuantity"))}
      />

      <CategorySelector
        handleCategorySelect={handleCategorySelect}
        hasError={hasError && !selectedCategory}
        selectedCategory={selectedCategory}
      />

      <ColorSelector
        addImageToState={addImageToState}
        hasError={hasError && images.length === 0}
        isProductCreated={isProductCreated}
        removeImageFromState={removeImageFromState}
      />
      <Button
        label={isLoading ? `Loading... ${loadingProgress}% ` : "Add Product"}
        onClick={handleSubmit(onSubmit)}
        disabled={isLoading}
      />
    </>
  );
};
