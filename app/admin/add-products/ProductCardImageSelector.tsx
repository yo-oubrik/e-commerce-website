import { ImageType } from "./AddProductForm";

interface ProductCardImageSelectorProps {
  images: ImageType[];
}

export const ProductCardImageSelector: React.FC<
  ProductCardImageSelectorProps
> = ({ images }) => (
  <div className="w-full">
    <h3 className="font-bold mb-2">Select product card image</h3>
    <select
      name="card_image"
      id="card_image"
      className="border py-2 px-5 mx-auto block"
    >
      {images.map((image) => (
        <option value={image.color} key={image.color}>
          {image.color}
        </option>
      ))}
    </select>
  </div>
);
