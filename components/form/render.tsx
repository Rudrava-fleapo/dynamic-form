import { Field } from "@/lib/types";
import { TextField } from "./text";
import { memo } from "react";
import { EmailField } from "./email";
import { CheckboxField } from "./checkbox";
import { RadioField } from "./radio";
import { NumberField } from "./number";

const UnMemoizedRenderFields: React.FC<{ fields: Field[] }> = ({ fields }) => {
  if (!fields.length) return null;
  return fields.map((field, idx) => {
    switch (field.type) {
      case "text":
        return <TextField field={field} key={idx} />;
      case "email":
        return <EmailField field={field} key={idx} />;
      case "checkbox":
        return <CheckboxField field={field} key={idx} />;
      case "radio":
        return <RadioField field={field} key={idx} />;
      case "number":
        return <NumberField field={field} key={idx} />;
    }
  });
};

export const RenderFields = memo(UnMemoizedRenderFields);
