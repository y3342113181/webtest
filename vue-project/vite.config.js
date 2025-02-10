import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { compression } from 'vite-plugin-compression2'

// https://vite.dev/config/
// vite.config.js
export default defineConfig({
  build: {
    // 启用压缩
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,  // 移除 console
        drop_debugger: true  // 移除 debugger
      }
    },
    // 分块策略
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]',
        manualChunks: {
          // 将 Vue 相关库打包到同一个chunk
          'vue-vendor': ['vue', 'vue-router'],
          // Element Plus 相关
          'element-plus': ['element-plus', '@element-plus/icons-vue'],
          // 工具库
          'utils': ['axios'],
        }
      }
    },
    // 启用 gzip 压缩
    assetsInlineLimit: 4096,
    // 分块大小警告的限制
    chunkSizeWarningLimit: 2000
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    // 启用 gzip 压缩
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024 * 10, // 10KB 以上的文件进行压缩
    })
  ],
})
