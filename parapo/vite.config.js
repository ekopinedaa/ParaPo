import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { SERVER_IP } from './config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    host: `${SERVER_IP}`,
    //host: '192.168.1.20',
    port: '80',
    open: true
  }
})
