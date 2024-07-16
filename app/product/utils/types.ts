export type CartProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  availableQuantity:number;
  minQuantity:number;
  maxQuantity:number;
  selectedQuantity:number;
  brand: string;
  category: string;
  selectedImage:ProductImage;
};

export type ProductImage={
  color: string,
  colorCode:string,
  imageUrl:string
}

export type Review = {
  id: string,
  userId: string,
  productId: string,
  rating:number,
  comment:
   string,
  createdAt: Date,
}

export type User = {
    id: string,
    name: string,
    email: string,
    emailVerified: boolean,
    imageUrl:string,
    hashedPassword: null,
    createdAt: Date,
    updatedAt: Date,
    role: string,
}