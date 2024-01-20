// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["@/assets/main.scss"],
  modules: [
    "nuxt-primevue",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/i18n",
    "nuxt-feather-icons",
  ],
  primevue: {
    components: {
      include: "*",
    },
    directives: {
      include: "*",
    },
  },
  i18n: {
    vueI18n: "./i18n.config.ts",
  },
  runtimeConfig: {
    public: {
      EMAIL: process.env.NUXT_EMAIL,
      CV_PATH: process.env.NUXT_CV_PATH,
      LINKEDIN: process.env.NUXT_LINKEDIN,
      GITHUB: process.env.NUXT_GITHUB,
      MEDIUM: process.env.NUXT_MEDIUM,
      gtagId: "G-880FF1HLF1",
    },
  },
});
