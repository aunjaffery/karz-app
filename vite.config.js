import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@comp", replacement: path.resolve(__dirname, "src/components") },
      { find: "@pages", replacement: path.resolve(__dirname, "src/pages") },
      { find: "@src", replacement: path.resolve(__dirname, "src") },
    ],
  },
});
