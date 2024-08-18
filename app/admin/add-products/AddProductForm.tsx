"use client";
import Input from "@/app/components/input/Input";
import TextArea from "@/app/components/input/TextArea";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, set, SubmitHandler, useForm } from "react-hook-form";
import { categories } from "../../utils/categories";
import { Category } from "./Category";
import { colors } from "@/app/utils/colors";
import { SetColor } from "@/app/components/input/SelectColor";
import Button from "@/app/components/Button";
import toast from "react-hot-toast";
import firebaseApp from "@/libs/firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import axios from "axios";
import { useRouter } from "next/navigation";
//Client side
export type ImageType = {
  color: string;
  colorCode: string;
  image: File | null;
};
//Server Side
export type UploadedImageType = {
  color: string;
  colorCode: string;
  imageUrl: string;
};
export const AddProductForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageType[] | null>();
  const [isProductCreated, setIsProductCreated] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      quantity: "",
      maxQuantity: "",
      minQuantity: "1",
      images: [],
    },
  });
  //Adding new form field
  const setCustomValue = (name: string, value: any) => {
    setValue(name, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };
  const [selectedCategory, setSelectedCategory] = useState("");
  const handleCategorySelect = (categoryLabel: string) => {
    setSelectedCategory(categoryLabel);
    setCustomValue("category", categoryLabel);
  };
  useEffect(() => {
    setValue("images", images);
  }, [images]);
  useEffect(() => {
    reset();
    setImages(null);
    setIsProductCreated(false);
  }, [isProductCreated]);
  const addImageToState = useCallback((image: ImageType) => {
    setImages((prev) => {
      if (!prev || prev.length === 0) {
        return [image];
      }
      {
        return [...prev, image];
      }
    });
  }, []);
  const removeImageFromState = useCallback((image: ImageType) => {
    setImages((prev) => prev?.filter((img) => img.color !== image.color));
  }, []);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!data.category || !data.images || data.images.length === 0) {
      setHasError(true);
      return;
    }
    setIsLoading(true);
    let uploadedImages: UploadedImageType[] = [];
    const handleImageUploads = async () => {
      toast("Uploading product, please wait...");
      try {
        //loop through client uploaded images
        for (const item of data.images) {
          if (item.image) {
            //Set-up
            const fileName = new Date().getTime() + "_" + item.image.name;
            const storage = getStorage(firebaseApp);
            const storageRef = ref(storage, `products/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, item.image);

            await new Promise<void>((res, rej) => {
              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  setLoadingProgress(progress);
                  console.log("Upload is " + progress + "% done");
                },
                (error) => {
                  console.log("Error uploading image", error);
                  rej(error);
                },
                () => {
                  getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadUrl) => {
                      uploadedImages.push({
                        color: item.color,
                        colorCode: item.colorCode,
                        imageUrl: downloadUrl,
                      });
                      console.log("File available at", downloadUrl);
                      res();
                    })
                    .catch((error) => {
                      console.log("Error getting download url", error);
                      rej(error);
                    });
                }
              );
            });
          }
        }
      } catch (error) {
        setIsLoading(false);
        console.log("Error handling image uploads", error);
        return toast.error("Error handling image uploads");
      }
    };
    await handleImageUploads();
    const dataToStore = {
      ...data,
      images: uploadedImages,
    };
    axios
      .post("/api/product", dataToStore)
      .then((response) => {
        setIsProductCreated(true);
        toast.success("Product created successfully");
      })
      .catch((error) => {
        console.log("Error creating product", error);
        toast.error("Error creating product");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const quantity = watch("quantity");
  useEffect(() => {
    setValue("maxQuantity", quantity);
  }, [quantity, setValue]);
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
      <Input
        id="price"
        label="Price"
        type="text"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        validation={{
          pattern: {
            value: /^[0-9]+(\.[0-9]{1,2})?$/,
            message: "Please enter a valid price (e.g., 10 or 10.99)",
          },
          min: {
            value: 0,
            message: "Price cannot be negative",
          },
        }}
      />
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
      <Input
        id="quantity"
        label="Quantity"
        type="text"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        validation={{
          pattern: {
            value: /^[1-9][0-9]*$/,
            message:
              "Please enter a valid quantity (must be a positive integer)",
          },
          min: {
            value: 1,
            message: "Quantity must be at least 1",
          },
        }}
      />
      <Input
        id="maxQuantity"
        label="Max Quantity"
        type="text"
        disabled={isLoading}
        register={register}
        errors={errors}
        validation={{
          pattern: {
            value: /^[1-9][0-9]*$/,
            message:
              "Please enter a valid max quantity (must be a positive integer)",
          },
          min: {
            value: 1,
            message: "Max quantity must be at least 1",
          },
          validate: (value: string) =>
            parseInt(value) >= parseInt(getValues("minQuantity")) ||
            "Max quantity must be greater than or equal to min quantity",
        }}
      />
      <Input
        id="minQuantity"
        label="Min Quantity"
        type="text"
        disabled={isLoading}
        register={register}
        errors={errors}
        validation={{
          pattern: {
            value: /^[1-9][0-9]*$/,
            message:
              "Please enter a valid min quantity (must be a positive integer)",
          },
          min: {
            value: 1,
            message: "Min quantity must be at least 1",
          },
          validate: (value: string) =>
            parseInt(value) <= parseInt(getValues("maxQuantity")) ||
            "Min quantity must be less than or equal to max quantity",
        }}
      />
      <p className="font-bold">Select a category</p>
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 place-content-center">
        {categories.map((category) => {
          if (category.label === "All") return null;
          return (
            <Category
              label={category.label}
              Icon={category.icon}
              isActive={category.label === selectedCategory}
              key={category.label}
              onClick={() => {
                handleCategorySelect(category.label);
              }}
            />
          );
        })}
      </div>
      {hasError && !selectedCategory && (
        <p className="text-rose-500">Please select a category</p>
      )}
      <div>
        <h3 className="font-bold">
          Select the available product colors and upload their images.
        </h3>
        <p className="text-sm">
          Yous must upload an image for each of the color selected otherwise
          your color section will be ignored
        </p>
      </div>
      <div className="w-full grid sm:grid-cols-2 gap-x-3 gap-y-2">
        {colors.map((color) => {
          return (
            <SetColor
              item={color}
              key={color.color}
              addImageToState={addImageToState}
              removeImageFromState={removeImageFromState}
              isProductCreated={isProductCreated}
            />
          );
        })}
      </div>
      {hasError && (!images || images.length === 0) && (
        <p className="text-rose-500">Please select a color</p>
      )}
      <Button
        label={isLoading ? `Loading... ${loadingProgress}%` : "Add Product"}
        onClick={handleSubmit(onSubmit)}
        disabled={isLoading}
      />
    </>
  );
};
