import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(() => {
  const target = process.env.VITE_API_TARGET

  console.log(target)

  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      allowedHosts: true as true,
      port: 5177,
    },
  };
});
