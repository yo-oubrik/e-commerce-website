"use client";

import { ImageType } from "@/app/admin/add-products/AddProductForm";
import { use, useCallback, useEffect, useState } from "react";
import { SelectImage } from "./SelectImage";
import Button from "../Button";

interface ISetColor {
  item: ImageType;
  addImageToState: (image: ImageType) => void;
  removeImageFromState: (image: ImageType) => void;
  isProductCreated: boolean;
}

export const SetColor: React.FC<ISetColor> = ({
  item,
  addImageToState,
  removeImageFromState,
  isProductCreated,
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  useEffect(() => {
    if (isProductCreated) {
      setIsSelected(false);
      setFile(null);
    }
  }, [isProductCreated]);
  const handleFileChange = useCallback((value: File) => {
    setFile(value);
    addImageToState({ ...item, image: value });
  }, []);
  const handleCheck = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setIsSelected(isChecked);
    if (!isChecked) {
      setFile(null);
      removeImageFromState(item);
    }
  }, []);
  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <input id={item.color} type="checkbox" onChange={handleCheck} />
          <label htmlFor={item.color}>{item.color}</label>
        </div>
        {isSelected && !file && (
          <SelectImage item={item} handleFileChange={handleFileChange} />
        )}
        {file && (
          <div>
            <p>{file.name}</p>
            <div className="max-w-28 mt-2">
              <Button
                label="Cancel"
                onClick={() => {
                  setFile(null);
                  removeImageFromState(item);
                }}
                small
                outline
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
