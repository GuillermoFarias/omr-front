<script setup lang="ts">
import { useConfigStore } from "~/store/config";

const i18n = useI18n();

const darkTheme = "/themes/lara-dark-blue/theme.css";
const lightTheme = "/themes/lara-light-purple/theme.css";

const configStore = useConfigStore();
const isDark = useState("isDark", () => configStore.isDark);
const lang = useState("lang", () => configStore.lang);
i18n.setLocale(lang.value);

useHead({
  title: "QuizPilot",
  meta: [
    {
      name: "description",
      content:
        "Sr. Software Engineer with 7+ years of experience in the software industry.",
    },
  ],
  script: [
    {
      src: "https://docs.opencv.org/4.7.0/opencv.js",
    },
    {
      src: "https://cdn.jsdelivr.net/gh/ColonelParrot/jscanify@master/src/jscanify.min.js",
    },
  ],
  link: [
    {
      id: "theme-link",
      rel: "stylesheet",
      href: () => (isDark.value ? darkTheme : lightTheme),
    },
    {
      rel: "stylesheet",
      href: "https://cdn.jsdelivr.net/gh/dheereshagrwal/colored-icons@1.7.3/src/app/ci.min.css",
    },
  ],
});

watch(isDark, (isDark) => {
  configStore.setIsDark(isDark);
  useHead({
    link: [
      {
        id: "theme-link",
        rel: "stylesheet",
        href: () => (isDark ? darkTheme : lightTheme),
      },
    ],
  });
});

watch(lang, (value) => {
  configStore.setLang(value);
  i18n.setLocale(value);
});
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
