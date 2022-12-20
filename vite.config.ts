import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ command, mode, ssrBuild }) => {
  //@ts-expect-error
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    plugins: [react(), tsconfigPaths()],
    server: {
      port: 3000,
    },
    preview: {
      port: 3001,
    },
    define: {
      'process.env': {},
    },
  };
});
