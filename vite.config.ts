import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        proxy: {
            "/setlist": {
                target: "https://api.setlist.fm",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/setlist/, ""),
            },
            "/fanart": {
                target: "https://webservice.fanart.tv",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/fanart/, ""),
            },
        },
    },
});
