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
      server: {
        port: 5173, // 设置服务启动端口号
        open: true, // 设置服务启动时是否自动打开浏览器
        cors: true, // 允许跨域
        // 设置代理，根据我们项目实际情况配置
        proxy: {
          '/api': { //apiTest是自行设置的请求前缀，按照这个来匹配请求，有这个字段的请求，就会进到代理来
            target: 'http://127.0.0.1:8081',
            changeOrigin: true, //是否跨域
    
          }
        }
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
