import FormWrapper from "@/app/components/FormWrapper";
import Input from "@/app/components/input/Input";
import { AddProductForm } from "./AddProductForm";
import { RedirectionPage } from "@/app/components/RedirectionPage";
import { getCurrentUser } from "@/actions/user/userActions";
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
