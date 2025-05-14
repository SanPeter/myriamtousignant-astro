import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
    site: 'http://astro.myriamtousignant.com',
    vite: {
        plugins: [tailwindcss()],
    },
    integrations: [react()],
    content: {
        // Configuration des collections
        assets: 'src/content'
    }
});