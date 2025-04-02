export interface Form {
  title: string;
  fields: Field[];
}

export interface Field {
  label: string;
  type: "text" | "email" | "number" | "checkbox" | "radio";
  name: string;
  defaultValue: string | boolean | null;
  validationRules: ValidationRules;
  metadata: Metadata;
  options?: Option[];
}

export interface ValidationRules {
  required: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  min?: number;
  max?: number;
}

export interface Metadata {
  placeholder?: string;
  tooltip: string;
}

export interface Option {
  label: string;
  value: string;
}
