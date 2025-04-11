// vitest.setup.ts
import { config } from "dotenv";

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserver;

// Load your `.env` file before tests run
(() => {
  console.log("caled?");
  config({
    path: "./.env.local",
    override: true,
  });
})();
