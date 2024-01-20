<script setup>
import Card from "primevue/card";
import TechIcon from "./TechIcon.vue";
import Button from "primevue/button";
import skillsData from "~/data/skills.json";

const { getLocaleMessage } = useI18n();
const language = useState("lang", () => "es");
const isDark = useState("isDark", () => false);

const skills = ref([]);

const loadFromLanguage = async () => {
  const messages = getLocaleMessage(language.value);
  const skills_ = messages.skills;
  const newSkills = [];

  for (const section in skills_) {
    const skills = skillsData[section];
    const newSection = {
      title: skills_[section],
    };
    if (skills.tags) {
      newSection.tags = skills.tags;
    } else if (skills.items) {
      newSection.items = skills.items;
    }
    newSkills.push(newSection);
  }

  skills.value = newSkills;
};

watch(language, (value) => {
  loadFromLanguage();
});

onMounted(() => {
  loadFromLanguage();
});
</script>
<template>
  <Card
    v-for="section in skills"
    v-bind:key="section.title"
    class="mb-4 mt-5"
    :unstyled="true"
  >
    <template #title>
      <h3 class="text-sm font-bold">
        {{ section.title }}
      </h3>
    </template>
    <template #content>
      <div v-if="section?.tags">
        <Button
          v-for="tag in section.tags"
          :key="tag"
          severity="primary"
          :label="tag"
          class="mr-1 mt-1 enabled"
          outlined
          size="small"
          disabled
        ></Button>
      </div>
      <TechIcon
        v-else-if="section?.items"
        v-for="items in section.items"
        :key="items"
        :icon="items"
        :dark="isDark"
        size="medium"
      />
    </template>
  </Card>
</template>
<style scoped>
.p-disabled,
.p-component:disabled {
  opacity: 1;
}
</style>
