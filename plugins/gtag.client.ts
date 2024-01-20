export default defineNuxtPlugin({
  name: "googleTag",
  enforce: "pre",
  async setup(nuxtApp) {
    const { gtagId } = useRuntimeConfig().public;

    function gtag() {
      window.dataLayer.push(arguments);
    }

    window.dataLayer = window.dataLayer || [];

    gtag("js", new Date());
    gtag("config", gtagId);

    useHead({
      script: [
        {
          src: `https://www.googletagmanager.com/gtag/js?id=${gtagId}`,
          async: true,
        },
      ],
    });
  },
  env: {
    // Set this value to `false` if you don't want the plugin to run when rendering server-only or island components.
    islands: false,
  },
});
