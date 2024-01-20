<script setup>
import projects from "~/data/projects.json";

const language = useState("lang", () => "es");
</script>
<template>
  <div class="grid" style="margin-left: -15px; margin-right: -15px">
    <div
      v-for="project in projects"
      class="xl:col-3 lg:col-3 md:col-4 sm:col-6 xs:col-6 p-2"
    >
      <Card
        :pt="{
          content: {
            class: 'pb-0',
            style: 'padding-top: 0 !important;',
          },
        }"
      >
        <template #content>
          <img
            :src="project.image"
            class="mb-2 w-full border-1"
            style="border-color: var(--surface-d)"
            alt="Image"
          />
          <div class="flex justify-content-between align-items-start">
            <div>
              <div class="text-xl font-medium text-900 mb-2">
                {{ project.title }}
              </div>
              <p class="mt-0 mb-3 text-600">
                {{ project[`description_` + language] }}
              </p>
            </div>
          </div>
          <ul class="list-none m-0 p-0">
            <li
              class="px-0 pt-2 flex justify-content-between align-items-center"
            >
              <span class="text-600 font-medium text-sm">{{
                $t("projects.type")
              }}</span>
            </li>
            <li
              class="px-0 pb-2 pt-2 flex justify-content-between align-items-center border-bottom-1 surface-border"
            >
              <span class="text-900 font-medium text-sm">{{
                project.type
              }}</span>
            </li>
            <li
              class="px-0 pt-3 flex justify-content-between align-items-center"
            >
              <span class="text-600 font-medium text-sm">{{
                $t("projects.motivation")
              }}</span>
            </li>
            <li
              class="px-0 pb-2 pt-2 flex justify-content-between align-items-center border-bottom-1 surface-border"
            >
              <span class="text-900 font-medium text-sm">{{
                project.motivation
              }}</span>
            </li>
            <li
              class="px-0 pt-3 flex justify-content-between align-items-center flex-wrap"
            >
              <span class="text-600 font-medium text-sm w-full">{{
                $t("projects.technologies")
              }}</span>
            </li>
            <li
              class="px-0 pt-2 flex justify-content-between align-items-center border-bottom-1 surface-border"
            >
              <div class="flex justify-content-start">
                <div>
                  <TechIcon
                    v-for="item in project.technologies"
                    :icon="item"
                    size="medium"
                  />
                </div>
              </div>
            </li>
          </ul>
          <div
            class="flex justify-content-between border-top-1 surface-border pt-3"
          >
            <a
              :href="project.repository"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                icon="pi pi-github"
                :label="$t('projects.repository')"
                outlined
                size="small"
              />
            </a>

            <a :href="project.url" target="_blank" rel="noopener noreferrer">
              <Button
                icon="pi pi-external-link"
                :label="$t('projects.open')"
                outlined
                size="small"
              />
            </a>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>
