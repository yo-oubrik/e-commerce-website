import NumberInput from "@/app/components/input/NumberInput";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
interface IQuantityInput {
  disabled: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  required?: boolean;
}
export const QuantityInput: React.FC<IQuantityInput> = ({
  errors,
  disabled,
  register,
  required = false,
}) => {
  const validationRules = {
    ...(required && {
      required: "Enter a valid quantity",
      validate: {
        integer: (value: string) => {
          return (
            /^[1-9][0-9]*$/.test(value) || "Quantity must be a positive integer"
          );
        },
      },
    }),
  };
  return (
    <NumberInput
      id="availableQuantity"
      label="Available Quantity"
      disabled={disabled}
      register={register}
      errors={errors}
      minValue={1}
      validation={validationRules}
    />
  );
};
