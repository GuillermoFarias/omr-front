<script setup>
import { ref, watch } from "vue";
import Dropdown from "primevue/dropdown";

const lang = useState("lang", () => "en");
const languages = ref([
  { name: "EN", code: "en" },
  { name: "ES", code: "es" },
]);

const selectedLanguage = ref(
  languages.value.find((l) => l.code === lang.value)
);

watch(selectedLanguage, () => {
  lang.value = selectedLanguage.value.code;
});
</script>

<template>
  <Dropdown
    v-model="selectedLanguage"
    :options="languages"
    optionLabel="name"
    placeholder="Select a Language"
    class="w-6rem"
  />
</template>
