import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// Carrega as variáveis do .env
dotenv.config();

export default defineConfig({
    plugins: [react()],
    define: {
        'process.env': process.env,  // Esta linha permite acesso às variáveis no process.env
    },
});