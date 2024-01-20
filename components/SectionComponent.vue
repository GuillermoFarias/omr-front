<script setup lang="ts">
import type { SectionColumn } from "~~/types/index.d";

const defaultColumn: SectionColumn = {
  name: "defaultColumn",
  title: "defaultTitle",
  class: "col-12",
};

const props = defineProps({
  title: {
    type: String,
    required: false,
    default: "Default Title",
  },
  disableTitle: {
    type: Boolean,
    required: false,
    default: false,
  },
  columns: {
    type: Array as PropType<SectionColumn[]>,
    required: false,
    default: () => [],
  },
});
</script>
<template>
  <section class="fadein animation-duration-1000 w-full">
    <div class="grid">
      <!-- Only one column -->
      <div v-if="columns.length === 0" class="col-12 pt-0 pb-0">
        <h2
          v-if="!disableTitle"
          class="text-2xl text-700 font-bold mt-2 xs:mt-4"
        >
          <i class="pi pi-angle-double-right" style="font-size: 1.2rem"></i>
          {{ title }}
        </h2>
        <div class="col-12 pt-0">
          <slot />
        </div>
      </div>

      <!-- Multiple columns -->
      <template v-else-if="columns.length > 0" v-for="column in columns">
        <div :class="column['class'] + ` pt-0`">
          <h2 class="text-2xl text-700 font-bold mt-2 xs:mt-4">
            <i class="pi pi-angle-double-right" style="font-size: 1.2rem"></i>
            {{ column["title"] }}
          </h2>
          <div class="col-12 pt-0">
            <slot :name="column['name']" />
          </div>
        </div>
        <slot :name="'after-' + column['name']" />
      </template>
    </div>
  </section>
</template>
<style scoped>
@media screen and (max-width: 575.98px) {
  .xs\:col-12 {
    width: 100%;
  }

  .xs\:col-8 {
    width: 64%;
  }

  .xs\:col-4 {
    width: 32.4%;
  }
}

@media screen and (min-width: 576px) {
  .sm\:col-12 {
    width: 100%;
  }

  .sm\:col-8 {
    width: 64%;
  }

  .sm\:col-4 {
    width: 32.4%;
  }
}

@media screen and (min-width: 768px) {
  .md\:col-12 {
    width: 100%;
  }

  .md\:col-8 {
    width: 64%;
  }

  .md\:col-4 {
    width: 32.4%;
  }
}

@media screen and (min-width: 992px) {
  .lg\:col-12 {
    width: 100%;
  }

  .lg\:col-8 {
    width: 64%;
  }

  .lg\:col-4 {
    width: 32.4%;
  }
}

@media screen and (min-width: 1200px) {
  .xl\:col-12 {
    width: 100%;
  }

  .xl\:col-8 {
    width: 64%;
  }
  .xl\:col-4 {
    width: 32.4%;
  }
}

.col-8 {
  width: 64%;
}

.col-4 {
  width: 32.4%;
}

.col-12 {
  width: 100%;
}
</style>
