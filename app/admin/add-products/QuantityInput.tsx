import Input from "@/app/components/input/Input";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
interface IQuantityInput {
  disabled: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}
export const QuantityInput: React.FC<IQuantityInput> = ({
  errors,
  disabled,
  register,
}) => {
  return (
    <Input
      id="availableQuantity"
      label="Available Quantity"
      type="text"
      disabled={disabled}
      register={register}
      errors={errors}
      required
      validation={{
        pattern: {
          value: /^[1-9][0-9]*$/,
          message: "Please enter a valid quantity (must be a positive integer)",
        },
        min: {
          value: 1,
          message: "Quantity must be at least 1",
        },
      }}
    />
  );
};
