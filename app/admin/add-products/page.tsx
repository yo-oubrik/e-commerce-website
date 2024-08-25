import FormWrapper from "@/app/components/FormWrapper";
import { AddProductForm } from "./AddProductForm";
import { Heading } from "@/app/components/Heading";
export const addProduct = () => {
  return (
    <div>
      <Heading title="Add Product" />
      <FormWrapper customClass="mx-auto">
        <AddProductForm />
      </FormWrapper>
    </div>
  );
};
export default addProduct;
