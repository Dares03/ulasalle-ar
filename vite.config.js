import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
  base: './',
  plugins: [
    basicSsl()
  ],
  server: {
    host: true, // Permite conexiones externas en la red local
    https: true, // Fuerza el uso de protocolo seguro HTTPS
    port: 5173
  }
});
