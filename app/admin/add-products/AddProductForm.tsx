"use client";
import TextArea from "@/app/components/input/TextArea";
import { categories } from "../../utils/categories";
import { colors } from "@/app/utils/colors";
import { useProductForm } from "@/hooks/useAddProductForm";
import Input from "@/app/components/input/Input";
import Button from "@/app/components/Button";
import { Category } from "./Category";
import { SetColor } from "@/app/components/input/SelectColor";
import { PriceInput } from "./PriceInput";
import { QuantityInput } from "./QuantityInput";
import { MaxQuantityInput } from "./MaxQuantityInput";
import { MinQuantityInput } from "./MinQuantityInput";
import { CategorySelector } from "./CategorySelector";
import { ColorSelector } from "./ColorSelector";
import { ProductCardImageSelector } from "./ProductCardImageSelector";

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
    handleCardImageSelect,
  } = useProductForm();
  return (
    <>
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <PriceInput disabled={isLoading} register={register} errors={errors} />

      <Input
        id="brand"
        label="Brand"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <TextArea
        id="description"
        label="Description"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <QuantityInput errors={errors} disabled={isLoading} register={register} />

      <MaxQuantityInput
        errors={errors}
        disabled={isLoading}
        register={register}
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
        isNoColorSelected={hasError && images.length === 0}
        isProductCreated={isProductCreated}
        removeImageFromState={removeImageFromState}
      />

      {images.length > 0 && <ProductCardImageSelector images={images} />}

      <Button
        label={isLoading ? `Loading... ${loadingProgress}% ` : "Add Product"}
        onClick={handleSubmit(onSubmit)}
        disabled={isLoading}
      />
    </>
  );
};
