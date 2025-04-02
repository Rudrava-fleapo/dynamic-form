import { Field } from "@/lib/types";
import { useFormContext } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

export const CheckboxField = (input: { field: Field }) => {
  const { field } = input;
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={field.name}
      render={({ field: renderField }) => (
        <FormItem className="flex justify-end items-center flex-row-reverse space-x-2">
          <FormLabel>{field.label}</FormLabel>
          <FormControl>
            <Checkbox
              checked={renderField.value}
              onCheckedChange={(checked) => renderField.onChange(checked)}
            >
              {field.label}
            </Checkbox>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
