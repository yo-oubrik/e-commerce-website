import { SetColor } from "@/app/components/input/SelectColor";
import { colors } from "@/app/utils/colors";
import { ImageType } from "./AddProductForm";

interface IColorSelector {
  addImageToState: (image: ImageType) => void;
  removeImageFromState: (image: ImageType) => void;
  isProductCreated: boolean;
  isNoColorSelected: boolean;
}
export const ColorSelector: React.FC<IColorSelector> = ({
  addImageToState,
  isNoColorSelected,
  isProductCreated,
  removeImageFromState,
}) => {
  return (
    <>
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
      {isNoColorSelected && (
        <p className="text-rose-500">Please select a color</p>
      )}
    </>
  );
};
