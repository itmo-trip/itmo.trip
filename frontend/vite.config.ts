import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const target = process.env.VITE_API_TARGET

  console.log(target)

  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      allowedHosts: true,
      port: 5177,
    },
  };
});
