import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  console.log(env.VITE_API_TARGET)

  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: 5177,
      proxy: {
        '/itmo-trip': {
          target: env.VITE_API_TARGET,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
