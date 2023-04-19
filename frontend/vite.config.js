import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as dotenv from 'dotenv'
import replace from '@rollup/plugin-replace'

// Load environment variables from .env file
const config = dotenv.config()

console.log(config)
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    replace({
      'process.env': JSON.stringify(config.parsed),
    }),
  ],
})
