import Input from "@/app/components/input/Input";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
interface IMinQuantityInput {
  disabled: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  maxQuantity?: number;
}
export const MinQuantityInput: React.FC<IMinQuantityInput> = ({
  disabled,
  errors,
  register,
  maxQuantity,
}) => {
  return (
    <Input
      id="minQuantity"
      label="Min Quantity"
      type="text"
      disabled={disabled}
      register={register}
      errors={errors}
      validation={{
        pattern: {
          value: /^[1-9][0-9]*$/,
          message:
            "Please enter a valid min quantity (must be a positive integer)",
        },
        min: {
          value: 1,
          message: "Min quantity must be at least 1",
        },
        ...(maxQuantity && {
          validate: (value: string) =>
            parseInt(value) <= maxQuantity ||
            "Min quantity must be less than or equal to max quantity",
        }),
      }}
    />
  );
};
