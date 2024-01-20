<script setup>
const runtimeConfig = useRuntimeConfig();

const email = runtimeConfig.public.EMAIL;
const resume = runtimeConfig.public.CV_PATH;

const copyEmail = () => {
  const copyDiv = document.querySelector(".copyEmail:not(.animate)");
  if (copyDiv) {
    copyDiv.classList.add("animate");
    copyDiv.addEventListener("animationend", () =>
      copyDiv.classList.remove("animate")
    );
  }
};
</script>
<template>
  <a :href="resume" target="_blank">
    <Button label="Resume" severity="secondary" outlined class="text mr-2 mb-2">
      <i class="pi pi-download mr-2"></i>
      <span class="p-ml-2">{{ $t("resume") }}</span>
    </Button>
  </a>
  <a :href="`mailto:` + email" target="_blank">
    <Button
      label="Contact"
      severity="secondary"
      outlined
      class="text mb-2"
      @click="copyEmail"
    >
      <i class="pi pi-envelope mr-2"></i>
      <span class="p-ml-2">{{ $t("contact") }}</span>
    </Button>
  </a>
</template>
