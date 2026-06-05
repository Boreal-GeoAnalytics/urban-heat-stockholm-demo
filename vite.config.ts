import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/urban-heat-stockholm-demo/',
  plugins: [react()],
});
