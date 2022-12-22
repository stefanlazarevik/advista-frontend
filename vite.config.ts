import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import viteCompression from "vite-plugin-compression";
export default defineConfig(({ command, mode, ssrBuild }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    plugins: [react(), tsconfigPaths(), viteCompression()],
    server: {
      port: 3000,
    },
    preview: {
      port: 3001,
    },
    define: {
      "process.env": {},
    },
  };
});
