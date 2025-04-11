import { Form } from "../types";
import { url } from "../utils";

export async function fetchFormData(): Promise<Form | null> {
  try {
    const formData = await fetch(url("/api/form"), { cache: "no-store" }); // no-store ensures fresh data
    if (!formData.ok) {
      return null;
    }
    const response = await formData.json();
    return response.data.form as Form;
  } catch (error) {
    console.error("Error fetching form data:", error);
    return null;
  }
}
