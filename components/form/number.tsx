import { Field } from "@/lib/types";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

export const NumberField = (input: { field: Field }) => {
  const { field } = input;
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={field.name}
      rules={{
        required: field.validationRules.required,
        minLength: field.validationRules.minLength,
        maxLength: field.validationRules.maxLength,
        pattern: new RegExp(field.validationRules?.pattern || ""),
        min: field.validationRules.min,
        max: field.validationRules.max,
      }}
      render={({ field: renderField }) => (
        <FormItem>
          <FormLabel>{field.label}</FormLabel>
          <FormControl>
            <Input
              placeholder={field.metadata.placeholder}
              {...renderField}
              value={renderField.value ? Number(renderField.value) : 0}
              onChange={(event) =>
                renderField.onChange(Number(event.target.value))
              }
              type="number"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
