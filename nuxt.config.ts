// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  srcDir: 'src/',
  ssr: false, // SPA mode as requested ("Use Vue always")
  modules: ['@nuxt/ui', '@pinia/nuxt'],
  extends: ['@nuxt/ui-pro'],
  colorMode: {
    preference: 'light'
  }
})
