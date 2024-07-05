import { createRequire } from 'node:module';
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

import * as path from 'path'

import AutoImport from 'unplugin-auto-import/vite'

const require = createRequire( import.meta.url );

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 获取`.env`环境配置文件
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [
      react(),
      
      AutoImport({
        imports: ['react', 'react-router']
      })
    ],
    esbuild: {
      loader: 'jsx',
      include: /src\/.*\.jsx?$/,
      exclude: []
      },
    // 反向代理解决跨域问题
    server: {
      // 允许跨域
      cors: true,
      // 自动打开浏览器
      open: true,
      // 配置反向代理
      // proxy: {
      //   '/user': {
      //     target: 'http://192.168.50.41:8085',
      //     changeOrigin: true,
      //     // rewrite: (path) => path.replace(/^\/api/, '')
      //   }
      // }
    },
    resolve: {
      // 配置路径别名
      alias: [
        // @代替src
        {
          find: '@',
          replacement: path.resolve('./src')
        }
      ]
    },
    // 引入scss全局变量
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/style/scss/color.scss";@import "@/style/scss/theme.scss";`
        }
      }
    }
  }
})
