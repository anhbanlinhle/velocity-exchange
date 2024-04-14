import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslintPlugin({    
      include: ['./src/**/*.jsx', './src/**/*.js'],  // Include files to lint  
      cache: false,  // Disable or enable cache as needed

    })
  ]
});
