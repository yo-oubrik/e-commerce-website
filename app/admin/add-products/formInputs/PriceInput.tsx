import NumberInput from "@/app/components/input/NumberInput";
import { countDecimals } from "@/app/utils/helperFunctions/numbersManipulation";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface IPriceInput {
  disabled?: boolean;
  register: UseFormRegister<any>; // Simplified without generics
  required?: boolean;
  errors: FieldErrors;
  minPrice?: number;
}

export const PriceInput: React.FC<IPriceInput> = ({
  disabled = false,
  register,
  errors,
  minPrice = 1,
  required = false,
}) => {
  // Define validation rules
  const validationRules = {
    ...(required && {
      required: "Price is required",
      validate: {
        minPrice: (value: number) => {
          return value >= minPrice
            ? true
            : `Price cannot be less than ${minPrice}$`;
        },
        twoDecimals: (value: number) => {
          return countDecimals(value) <= 2
            ? true
            : "Price can have at most 2 decimal places";
        },
      },
    }),
  };

  return (
    <NumberInput
      id="price"
      label="Price"
      disabled={disabled}
      register={register}
      errors={errors}
      validation={validationRules}
    />
  );
};
