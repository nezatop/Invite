import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base должен совпадать с именем репозитория на GitHub: https://<user>.github.io/Invite/
export default defineConfig({
  plugins: [react()],
  base: '/Invite/',
})
