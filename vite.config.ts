import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const base = env.VITE_APP_BASE ?? "/";
  return {
    plugins: [vue()],
    base: base
  }
})
