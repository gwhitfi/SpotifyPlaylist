import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        proxy: {
            "/fanart": {
                target: "https://webservice.fanart.tv",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/fanart/, ""),
            },
            "/setlist": {
                target: "https://api.setlist.fm",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/setlist/, ""),
            },
            "/coverart": {
                target: "https://coverartarchive.org",
                changeOrigin: true,
                followRedirects: false,
                rewrite: (path) => path.replace(/^\/coverart/, ""),
            },
        },
    },
});
