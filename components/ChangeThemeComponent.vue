<script setup>
import Button from "primevue/button";

const isDark = useState("isDark", () => false);

const toggleTheme = () => {
  isDark.value = !isDark.value;
};
</script>

<template>
  <Button
    :icon="isDark ? 'pi pi-sun' : 'pi pi-moon'"
    severity="secondary"
    outlined
    text
    rounded
    class="mr-2"
    :aria-label="!isDark ? 'Light Mode' : 'Dark Mode'"
    @click="toggleTheme"
  />
</template>
