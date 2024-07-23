import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import { SERVER_IP } from './config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    host: `${SERVER_IP}`,
    port: '80',
    open: true
  }, resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
