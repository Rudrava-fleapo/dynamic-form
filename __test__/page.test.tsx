import { render, screen, waitFor } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import Page from "@/app/page";

vi.mock("@/lib/server-functions", () => ({
  fetchFormData: vi.fn(() => Promise.resolve(null)),
}));

test("renders async page content and returns failed", async () => {
  let ui;

  await waitFor(async () => {
    ui = await Page();
  });
  render(ui);

  expect(screen.getByText("helo")).toBeDefined();
});
