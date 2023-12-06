import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    define: {
      'process.env': env,
    },
    server: {
      port: 3000,
      proxy: {
        api: {
          target: 'http://localhost:9000',
          changeOrigin: true,
        },
      },
    },
    preview: {
      port: 3000,
      watch: {
        usePolling: true,
      },
      host: true,
      proxy: {
        api: {
          target: 'http://localhost:9000',
          changeOrigin: true,
        },
      },
    },
    plugins: [react()],
    resolve: {
      alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    },
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
    optimizeDeps: {
      exclude: ['js-big-decimal'],
    },
  };
});
