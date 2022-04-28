import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default function configureVite (port) {
  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: [
        {find: "@", replacement: path.resolve("src")},
      ],
    },
    optimizeDeps: {
      include: ["react-flatpickr", "react-image-crop"]
    },
    build: {
      outDir: "build",
      commonjsOptions: {
        include: [/react-flatpickr/, /react-image-crop/, /node_modules/],
      },
    },
    server: {
      host: true,
      port: port + 20_000,
      proxy: {
        "/api": {
          target: `http://localhost:${port + 10_000}`,
          changeOrigin: true
        }
      }
    }
  });
};