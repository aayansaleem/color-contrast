import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'
    import { VitePWA } from 'vite-plugin-pwa'

    // https://vitejs.dev/config/
    export default defineConfig({
      plugins: [
        react(),
        VitePWA({
          manifest: {
            name: 'Color Contrast Checker',
            short_name: 'Contrast Checker',
            description: 'A tool to check color contrast ratios.',
            theme_color: '#0000ff',
            icons: [
              {
                src: 'pwa-192x192.png',
                sizes: '192x192',
                type: 'image/png',
              },
              {
                src: 'pwa-512x512.png',
                sizes: '512x512',
                type: 'image/png',
              },
            ],
          },
          registerType: 'autoUpdate',
          devOptions: {
            enabled: true
          }
        })
      ],
    })
