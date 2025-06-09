import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path'; 

export default defineConfig({
  base: '/BCStudentMart/', 
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      services: path.resolve(__dirname, 'src/services'),
      utils: path.resolve(__dirname, 'src/utils'),
      context: path.resolve(__dirname, 'src/context'),
      components: path.resolve(__dirname, 'src/components'),
      pages: path.resolve(__dirname, 'src/pages'),
      hooks: path.resolve(__dirname, 'src/hooks'),
    }
  }
});
