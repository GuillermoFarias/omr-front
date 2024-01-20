<script setup>
import Image from "primevue/image";
import { computed } from "vue";
import techIcons from "~/data/techicons.json";

const isDark = useState("isDark", () => false);

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: "small",
  },
  hover: {
    type: Boolean,
    default: false,
  },
  class: {
    type: String,
    default: "",
  },
  style: {
    type: Object,
    default: () => ({}),
  },
});

const style = ref(props.style);
const class_ = computed(() => {
  return props.class;
});

const colorMode = computed(() => {
  return isDark.value ? "dark" : "light";
});

const techIcon = computed(() => {
  return techIcons[props.icon];
});

const iconTitle = computed(() => {
  return techIcons[props.icon]?.name;
});

const iconClass = computed(() => {
  let class_ = techIcons[props.icon]?.class || "";
  if (!class_) {
    class_ = techIcons[props.icon]?.["class_" + colorMode.value];
  }
  return class_ ? class_ : "";
});

const iconImage = computed(() => {
  let image_ = techIcons[props.icon]?.image;
  if (!image_) {
    image_ = techIcons[props.icon]?.["image_" + colorMode.value];
  }
  return image_ ? image_ : "";
});

const type = computed(() => {
  const icon = Object.keys(techIcons[props.icon] || {});
  if (
    icon.includes("class") ||
    icon.includes("class_dark") ||
    icon.includes("class_light")
  ) {
    style.value = props.style;
    return "class";
  } else if (
    icon.includes("image") ||
    icon.includes("image_dark") ||
    icon.includes("image_light")
  ) {
    if (
      Object.keys(style.value).length === 0 &&
      style.value.constructor === Object
    ) {
      style.value = {
        "margin-bottom": "6px !important",
      };
    }

    return "image";
  }

  return techIcon.value?.class ? "class" : "image";
});

const classSizes = {
  small: "",
  medium: "ci-2x",
  large: "ci-3x",
  xlarge: "ci-4x",
};

const imageSizes = {
  small: "15",
  medium: "20",
  large: "45",
  xlarge: "55",
};

const styleObjetToCss = (style) => {
  let css = "";
  for (const [key, value] of Object.entries(style)) {
    css += `${key}: ${value};`;
  }
  return css;
};
</script>

<template>
  <i
    v-if="type === 'class'"
    :className="
      `ci ` +
      iconClass +
      ` ` +
      classSizes[size] +
      ` techicon ` +
      (hover ? 'techicon-hover' : '') +
      ` ` +
      class_
    "
    v-tooltip.top="iconTitle"
    :style="style"
  ></i>
  <i v-else-if="type === 'image'">
    <Image
      :src="iconImage"
      :width="imageSizes[size]"
      :height="imageSizes[size]"
      href="#"
      :class="`techicon ` + (hover ? 'techicon-hover' : '') + ` ` + class_"
      v-tooltip.top="iconTitle"
      :pt="{
        image: {
          style: styleObjetToCss(style),
        },
      }"
    />
  </i>
</template>

<style scoped>
.techicon {
  margin-right: 0.5rem;
}

.ci-2x {
  width: 1.2rem !important;
}

.techicon-hover {
  -webkit-filter: grayscale(100%); /* Chrome, Safari, Opera */
  filter: grayscale(100%);
}

.techicon-hover:hover {
  -webkit-filter: grayscale(0%); /* Chrome, Safari, Opera */
  filter: grayscale(0%);
}
</style>
