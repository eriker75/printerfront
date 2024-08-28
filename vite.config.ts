import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    base: "https://procodelearning.com",
    plugins: [react()],
    server: {
        port: 3000
    },
    define: {
        'process.env': process.env
    }
})
