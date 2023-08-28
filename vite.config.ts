import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
      data: path.resolve(__dirname, "./data"),
      modal: path.resolve(__dirname, "./src/features/modal"),
      posts: path.resolve(__dirname, "./src/features/posts"),
      user: path.resolve(__dirname, "./src/features/user"),
    },
  },
});
