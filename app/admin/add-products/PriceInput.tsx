import Input from "@/app/components/input/Input";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
interface IPriceInput {
  disabled: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

export const PriceInput: React.FC<IPriceInput> = ({
  disabled,
  register,
  errors,
}) => {
  return (
    <Input
      id="price"
      label="Price"
      type="text"
      disabled={disabled}
      register={register}
      errors={errors}
      required
      validation={{
        pattern: {
          value: /^[0-9]+(\.[0-9]{1,2})?$/,
          message: "Please enter a valid price (e.g., 10 or 10.99)",
        },
        min: {
          value: 0,
          message: "Price cannot be negative",
        },
      }}
    />
  );
};
