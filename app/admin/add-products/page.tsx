import FormWrapper from "@/app/components/FormWrapper";
import { AddProductForm } from "./AddProductForm";
export const addProduct = () => {
  return (
    <div>
      <h2 className="text-center text-2xl mb-7">Add Product</h2>
      <FormWrapper customClass="mx-auto">
        <AddProductForm />
      </FormWrapper>
    </div>
  );
};
export default addProduct;
