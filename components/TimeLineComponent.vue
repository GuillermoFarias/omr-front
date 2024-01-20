<script setup>
import Avatar from "primevue/avatar";

const { getLocaleMessage } = useI18n();
const language = useState("lang", () => "es");
const isDark = useState("isDark", () => false);

const experience = ref([]);

const loadFromLanguage = async () => {
  const messages = getLocaleMessage(language.value);
  experience.value = messages.experience;
};

watch(language, (value) => {
  loadFromLanguage();
});

onMounted(() => {
  loadFromLanguage();
});
</script>
<template>
  <Timeline
    :value="experience"
    align="left"
    class="customized-timeline"
    :pt="{
      opposite: {
        style: 'flex: none !important; padding: 0 !important;',
      },
      connector: {
        style:
          'width: 1px !important;background-color: var(--surface-d) !important',
      },
      content: {
        class: 'mt-1',
      },
    }"
  >
    <template #marker="slotProps">
      <Button
        v-if="true"
        :label="slotProps.item.company.avatar"
        :style="
          `boder-color:` +
          slotProps.item.company.color +
          `; color: ` +
          slotProps.item.company.color
        "
        class="w-2rem h-2rem p-0"
        rounded
        outlined
      ></Button>
      <Avatar
        v-if="false"
        :label="slotProps.item.company.avatar"
        :style="
          `background-color:` +
          slotProps.item.company.color +
          `; color: #ffffff`
        "
        shape="circle"
        v-animateonscroll="{
          enterClass: 'fadein',
        }"
      />
    </template>
    <template #content="slotProps">
      <a
        :href="slotProps.item.company.url"
        target="_blank"
        :style="
          `color:` + slotProps.item.company.color + `; text-decoration: none`
        "
        rel="noopener noreferrer"
        class="text-xl font-bold"
        v-animateonscroll="{
          enterClass: 'fadein',
        }"
      >
        {{ slotProps.item.company.name }}
        <i class="pi pi-link"></i>
      </a>
      <Card
        class="mt-2 mb-4"
        :pt="{
          content: {
            class: 'pb-0',
          },
        }"
      >
        <template #title>
          {{ slotProps.item?.job?.title }}
        </template>
        <template #subtitle>
          <i class="pi pi-calendar"></i>
          {{ slotProps.item.from }} - {{ slotProps.item.to }}
          <div class="mt-2"></div>
          <i class="pi pi-building"></i>
          {{ slotProps.item.company.industry }}
          <br />
        </template>
        <template #content>
          {{ slotProps.item?.job?.description }}
          <Divider class="mb-0" />
          <h2 class="text-sm font-bold mt-2">
            {{ slotProps.item.technologies.title }}
          </h2>
          <TechIcon
            v-for="tech in slotProps.item.technologies"
            :key="tech"
            :icon="tech"
            :dark="isDark"
            size="medium"
            :hover="true"
          />
        </template>
      </Card>
    </template>
  </Timeline>
</template>

<style scoped>
.p-timeline-event-content {
  margin-top: 0.2rem !important;
}
</style>
