"use client";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";

interface ISelectImage {
  label?: string;
  handleFileChange: (value: File) => void;
}

export const SelectImage: React.FC<ISelectImage> = ({
  label,
  handleFileChange,
}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles?.length && handleFileChange(acceptedFiles[0]);
  }, []);
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
      {isDragActive ? (
        <p>Drop image here</p>
      ) : (
        <p>{`${label ? label : "+ Image"} `} </p>
      )}
    </div>
  );
};
