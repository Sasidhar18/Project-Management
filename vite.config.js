import { defineConfig } from "vite";
import envCompatible from "vite-plugin-env-compatible";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      external: ["firebase/firestore/lite", "firebase/app"],
    },
  },
  envPrefix: "REACT_APP_",
  plugins: [envCompatible(), react()],
});
