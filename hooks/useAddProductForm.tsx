import { useState, useEffect, useCallback } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import firebaseApp from "@/libs/firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  ImageType,
  UploadedImageType,
} from "@/app/admin/add-products/AddProductForm";

export const useProductForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageType[]>([]);
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
      cardImage: "",
    },
  });

  const setCustomValue = (name: string, value: any) => {
    setValue(name, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const handleCardImageSelect = (cardImage: ImageType) => {
    setCustomValue("cardImage", cardImage);
  };

  const handleCategorySelect = (categoryLabel: string) => {
    setSelectedCategory(categoryLabel);
    setCustomValue("category", categoryLabel);
  };

  useEffect(() => {
    setValue("images", images);
  }, [images]);

  useEffect(() => {
    reset();
    setImages([]);
    setIsProductCreated(false);
    setSelectedCategory("");
  }, [isProductCreated]);

  const addImageToState = useCallback((image: ImageType) => {
    setImages((prev) => (prev ? [...prev, image] : [image]));
  }, []);

  const removeImageFromState = useCallback((image: ImageType) => {
    setImages((prev) => prev?.filter((img) => img.color !== image.color));
  }, []);
  const [selectedCategory, setSelectedCategory] = useState("");
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
        for (const item of data.images) {
          if (!item.image) {
            continue;
          }
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
              },
              (error) => rej(error),
              () => {
                getDownloadURL(uploadTask.snapshot.ref)
                  .then((downloadUrl) => {
                    uploadedImages.push({
                      color: item.color,
                      colorCode: item.colorCode,
                      imageUrl: downloadUrl,
                    });
                    res();
                  })
                  .catch((error) => rej(error));
              }
            );
          });
        }
      } catch (error) {
        setIsLoading(false);
        toast.error("Error handling image uploads");
        console.error(error);
      }
    };

    await handleImageUploads();
    const dataToStore = { ...data, images: uploadedImages };

    axios
      .post("/api/product", dataToStore)
      .then(() => {
        setIsProductCreated(true);
        toast.success("Product created successfully");
      })
      .catch(() => toast.error("Error creating product"))
      .finally(() => setIsLoading(false));
  };

  const quantity = watch("quantity");
  useEffect(() => {
    setValue("maxQuantity", quantity);
  }, [quantity]);

  return {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    getValues,
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
    selectedCategory,
    handleCardImageSelect,
  };
};
