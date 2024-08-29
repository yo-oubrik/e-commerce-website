import FormWrapper from "@/app/components/FormWrapper";
import { AddProductForm } from "./AddProductForm";
import { Heading } from "@/app/components/Heading";
export const addProduct = () => {
  return (
    <div className="flex flex-col items-center">
      <Heading title="Add Product" />
      <FormWrapper>
        <AddProductForm />
      </FormWrapper>
    </div>
  );
};
export default addProduct;
