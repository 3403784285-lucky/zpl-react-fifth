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
    transpileDependencies: ['simple-mind-map'],
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
      proxy: {
        // 通配符匹配所有需要代理的请求
        '/api': {
          target: 'https://f504iccf72ke3bha.aistudio-hub.baidu.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''), // 去掉 '/api' 前缀
        },
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