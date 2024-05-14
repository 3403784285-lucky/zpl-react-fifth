import { defineConfig,loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'node:path'
const env = loadEnv(mode, process.cwd())
// https://vitejs.dev/config/
export default defineConfig(({mode})=>{
  plugins: [react()],
  server: {
    // host: 'localhost', // 只能本地访问
    host: '0.0.0.0', // 局域网别人也可访问
    port: Number(env.VITE_APP_PORT),
    // 运行时自动打开浏览器
    open: true,
    proxy: {
      [env.VITE_APP_BASE_API]: {
        target: env.VITE_APP_SERVICE_API,
        changeOrigin: true,
        rewrite: (path) => path.replace(new RegExp('^' + env.VITE_APP_BASE_API), '')
      }
    }
  },
  resolve:{
    alias:{
      '@':resolve(__dirname,'src')
    }
  }
})
