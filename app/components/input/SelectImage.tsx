"use client";
import { useDropzone } from "react-dropzone";
import { ImageType } from "@/app/admin/add-products/AddProductForm";
import { useCallback } from "react";

interface ISelectImage {
  item?: ImageType;
  handleFileChange: (value: File) => void;
}

export const SelectImage: React.FC<ISelectImage> = ({
  item,
  handleFileChange,
}) => {
  //action when file added
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles?.length && handleFileChange(acceptedFiles[0]);
  }, []);
  //config
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".png"] },
  });
  return (
    <div
      {...getRootProps()}
      className="cursor-pointer border-2 border-slate-500 p-2 border-dotted text-slate-500 text-center"
    >
      <input {...getInputProps()} />
      {isDragActive ? <p>Drop image here</p> : <p>+ {item?.color} Image</p>}
    </div>
  );
};
