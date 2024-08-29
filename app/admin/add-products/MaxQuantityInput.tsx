import Input from "@/app/components/input/Input";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
interface IMaxQuantityInput {
  disabled: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  minQuantity?: number;
}

export const MaxQuantityInput: React.FC<IMaxQuantityInput> = ({
  disabled,
  errors,
  register,
  minQuantity,
}) => {
  return (
    <Input
      id="maxQuantity"
      label="Max Quantity"
      type="text"
      disabled={disabled}
      register={register}
      errors={errors}
      validation={{
        pattern: {
          value: /^[1-9][0-9]*$/,
          message:
            "Please enter a valid max quantity (must be a positive integer)",
        },
        min: {
          value: 1,
          message: "Max quantity must be at least 1",
        },
        ...(minQuantity && {
          validate: (value: string) =>
            parseInt(value) >= minQuantity ||
            "Max quantity must be greater than or equal to min quantity",
        }),
      }}
    />
  );
};
