import { url } from "@/lib/utils";

export async function GET() {
  const res = await fetch(url("/form.json"), {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  return Response.json({ data });
}
