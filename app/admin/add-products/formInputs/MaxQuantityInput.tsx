import NumberInput from "@/app/components/input/NumberInput";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface IMaxQuantityInput {
  disabled: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  minQuantity?: number;
  required?: boolean;
}

export const MaxQuantityInput: React.FC<IMaxQuantityInput> = ({
  disabled,
  errors,
  register,
  minQuantity,
  required = false,
}) => {
  const validationRules = {
    ...(required && {
      required: "Enter a valid max quantity",
      validate: {
        integer: (value: string) => {
          return (
            /^[1-9][0-9]*$/.test(value) || "Quantity must be a positive integer"
          );
        },
        minCheck: (value: string) => {
          return (
            minQuantity === undefined ||
            parseInt(value) >= minQuantity ||
            `Max quantity must be greater than or equal to ${minQuantity}`
          );
        },
      },
    }),
  };

  return (
    <NumberInput
      id="maxQuantity"
      label="Max Quantity"
      disabled={disabled}
      register={register}
      minValue={1}
      errors={errors}
      validation={validationRules}
    />
  );
};
