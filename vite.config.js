import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite builds the front-end to /dist. The /api folder is deployed separately
// by Vercel as serverless functions (it is not part of the Vite build).
export default defineConfig({
  plugins: [react()],
});
