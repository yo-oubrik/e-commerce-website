import NumberInput from "@/app/components/input/NumberInput";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
interface IMinQuantityInput {
  disabled: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  maxQuantity?: number;
  required?: boolean;
}
export const MinQuantityInput: React.FC<IMinQuantityInput> = ({
  disabled,
  errors,
  register,
  maxQuantity,
  required = false,
}) => {
  const validationRules = {
    ...(required && {
      required: "Enter a valid min quantity",
      validate: {
        integer: (value: string) => {
          return (
            /^[1-9][0-9]*$/.test(value) || "Quantity must be a positive integer"
          );
        },
        minCheck: (value: string) => {
          return (
            maxQuantity === undefined ||
            parseInt(value) <= maxQuantity ||
            `Min quantity must be lower than or equal to ${maxQuantity}`
          );
        },
      },
    }),
  };
  return (
    <NumberInput
      id="minQuantity"
      label="Min Quantity"
      disabled={disabled}
      register={register}
      errors={errors}
      validation={validationRules}
      minValue={1}
    />
  );
};
