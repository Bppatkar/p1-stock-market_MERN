import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwind(), react()],
  server: {
    proxy: {
      "/api": {
        target: "https://p1-stock-market-mern.onrender.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api/v1"),
      },
    },
  },
});
