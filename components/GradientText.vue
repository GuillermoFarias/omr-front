<script setup lang="ts">
const isDark = useState("isDark", () => true);

defineProps({
  value: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: "4xl",
  },
});

const sizeMap: Record<string, string> = {
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
  "6xl": "text-6xl",
  "7xl": "text-7xl",
  "8xl": "text-8xl",
  "9xl": "text-9xl",
};
</script>
<template>
  <div
    :class="
      sizeMap[size] +
      ` text-primary font-bold gradient ` +
      (!isDark ? 'gradient-light' : 'gradient-dark')
    "
  >
    {{ value }}
  </div>
</template>
<style>
.gradient-dark {
  --bg-size: 400%;
  --color-one: #21d4fd;
  --color-two: #b721ff;
  font-size: clamp(3rem, 25vmin, 8rem);
  background: linear-gradient(
      90deg,
      var(--color-one),
      var(--color-two),
      var(--color-one)
    )
    0 0 / var(--bg-size) 100%;
  color: transparent;
  background-clip: text;
  animation: move-bg 30s infinite linear;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.gradient-light {
  --bg-size: 400%;
  --color-one: #ff3cac;
  --color-two: #784ba0;
  font-size: clamp(3rem, 25vmin, 8rem);
  background: linear-gradient(
      90deg,
      var(--color-one),
      var(--color-two),
      var(--color-one)
    )
    0 0 / var(--bg-size) 100%;
  color: transparent;
  background-clip: text;
  animation: move-bg 30s infinite linear;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

@media (prefers-reduced-motion: no-preference) {
  @keyframes move-bg {
    to {
      background-position: var(--bg-size) 0;
    }
  }
}
</style>
