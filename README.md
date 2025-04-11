# 📄 Dynamic Form Schema Documentation

This document describes the structure and behavior of the dynamic form schema used to render input forms from JSON.

---

## 📘 Overview

Each form configuration is defined by a top-level `form` object, which includes a title and a list of form `fields`. These fields describe how individual inputs are rendered, validated, and submitted.

```json
{
  "form": {
    "title": "Dynamic Form Example",
    "fields": [ ... ]
  }
}
```

---

## 🧱 Top-Level Properties

### `form.title`

- **Type:** `string`
- **Purpose:** Title displayed above the form (optional, but recommended for UI clarity).

---

## 🔢 `fields` Array

Each item in the `fields` array represents a form field.

### Common Field Schema

```json
{
  "label": "Field Label",
  "type": "text",
  "name": "uniqueName",
  "defaultValue": "",
  "validationRules": { ... },
  "metadata": { ... }
}
```

### Field Properties

| Key               | Type     | Description                                                                                  |
| ----------------- | -------- | -------------------------------------------------------------------------------------------- |
| `label`           | `string` | Text shown to the user as the field’s label.                                                 |
| `type`            | `string` | Type of input (`text`, `email`, `number`, etc). See [Supported Types](#-supported-types).    |
| `name`            | `string` | Unique identifier; also used as the key in the submission payload.                           |
| `defaultValue`    | `any`    | The default value shown in the field (based on type).                                        |
| `validationRules` | `object` | Validation config. See [Validation](#%EF%B8%8F-validationrules).                             |
| `metadata`        | `object` | UI hints like placeholders and tooltips. See [Metadata](#-metadata).                         |
| `options`         | `array`  | Required for `radio`, `select`, etc. See [Options](#-options-for-radios-and-future-selects). |

---

## 🔤 Supported Types

Current:

- `text`
- `email`
- `number`
- `checkbox`
- `radio`

Planned (not yet supported):

- `select`
- `textarea`
- `date`
- `file`
- `password`
- `custom` components

---

## 🛡️ `validationRules`

Defines built-in rules that control whether user input is valid.

### Global Notes:

- Custom validation functions are **not** supported.
- Custom error messages are **not** supported; system uses built-in error text.
- Regex patterns must be passed as **stringified expressions**.

### Common Rules by Type

#### Text / Email

```json
"validationRules": {
  "required": true,
  "minLength": 2,
  "maxLength": 50,
  "pattern": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"
}
```

| Rule        | Type      | Description                         |
| ----------- | --------- | ----------------------------------- |
| `required`  | `boolean` | Field must be filled                |
| `minLength` | `number`  | Minimum number of characters        |
| `maxLength` | `number`  | Maximum number of characters        |
| `pattern`   | `string`  | Regex string to match input against |

#### Number

```json
"validationRules": {
  "required": false,
  "min": 18,
  "max": 100
}
```

| Rule       | Type      | Description            |
| ---------- | --------- | ---------------------- |
| `required` | `boolean` | Optional/mandatory     |
| `min`      | `number`  | Minimum accepted value |
| `max`      | `number`  | Maximum accepted value |

#### Checkbox

```json
"validationRules": {
  "required": false
}
```

| Rule       | Type      | Description                         |
| ---------- | --------- | ----------------------------------- |
| `required` | `boolean` | If true, must be checked to proceed |

#### Radio

```json
"validationRules": {
  "required": true
}
```

| Rule       | Type      | Description                    |
| ---------- | --------- | ------------------------------ |
| `required` | `boolean` | Must choose one of the options |

---

## 🧩 `metadata`

Provides UI-level hints. Only two fields are currently supported.

```json
"metadata": {
  "placeholder": "Enter value here",
  "tooltip": "Shown on hover"
}
```

| Key           | Type     | Description                                              |
| ------------- | -------- | -------------------------------------------------------- |
| `placeholder` | `string` | Input hint shown inside empty input fields               |
| `tooltip`     | `string` | Browser-native tooltip shown on hover (via `title` attr) |

> Future plans: May support `helperText`, `icon`, `readonly`, etc.

---

## 🔘 `options` (For Radios and Future Selects)

Required for `radio` inputs, and to be used in the future with `select`.

```json
"options": [
  { "label": "Male", "value": "male" },
  { "label": "Female", "value": "female" },
  { "label": "Other", "value": "other" }
]
```

| Key     | Type     | Description                         |
| ------- | -------- | ----------------------------------- |
| `label` | `string` | Human-friendly text shown in UI     |
| `value` | `string` | Internal value used in form payload |

---

## 📤 Submission Payload

After the form is submitted, the data is compiled using the `name` key of each field:

```json
{
  "firstName": "Alice",
  "email": "alice@example.com",
  "age": 25,
  "subscribe": true,
  "gender": "female"
}
```

---

## 💡 Tips & Notes

- Fields render in the order they appear in the `fields` array
- No conditional rendering is currently supported
- Validation uses default error messages
- Regex is passed as a string pattern
- Tooltip is browser-native (`title` attribute)

---

## 🧪 Example Field

```json
{
  "label": "Email Address",
  "type": "email",
  "name": "email",
  "defaultValue": "",
  "validationRules": {
    "required": true,
    "pattern": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"
  },
  "metadata": {
    "placeholder": "Enter your email",
    "tooltip": "We will never share your email"
  }
}
```
