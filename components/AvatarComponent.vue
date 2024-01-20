<script setup lang="ts">
defineProps({
  size: {
    type: Number,
    default: 9,
  },
  shape: {
    type: String as PropType<"circle" | "square">,
    default: "circle",
  },
  openToWork: {
    type: Boolean,
    default: true,
  },
});

const sizeMap: Record<number, string> = {
  2: "profile-2",
  3: "profile-3",
  4: "profile-4",
  5: "profile-5",
  6: "profile-6",
  7: "profile-7",
  8: "profile-8",
  9: "profile-9",
  10: "profile-10",
  11: "profile-11",
};

const fontMap: Record<number, string> = {
  2: "font-2",
  3: "font-3",
  4: "font-4",
  5: "font-5",
  6: "font-6",
  7: "font-7",
  8: "font-8",
  9: "font-9",
  10: "font-10",
  11: "font-11",
};
</script>
<template>
  <Avatar :class="sizeMap[size] + ` border-2 `" :shape="shape">
    <div style="position: relative; text-align: center; color: white; top: 2px">
      <Image
        src="https://media.licdn.com/dms/image/D4E03AQGw8Slzo2c1Pg/profile-displayphoto-shrink_800_800/0/1695667961630?e=1709769600&v=beta&t=xWFkv5rxPDnwOu0toI2B75FhdSgeQYLjj0f-CEMuwnM"
        alt="Image"
        width="100%"
        class="pb-0"
      />
      <Tag
        v-if="openToWork"
        value="Open to work"
        severity="success"
        :class="`profile w-full text-sm ` + fontMap[size]"
      />
    </div>
  </Avatar>
</template>
<style lang="scss" scoped>
.profile {
  position: absolute;
  bottom: -1px;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50px;
}
.profile-2 {
  width: 2rem;
  height: 2rem;
}
.font-2 {
  font-size: 0.2rem !important;
}

.profile-3 {
  width: 3rem;
  height: 3rem;
}

.font-3 {
  font-size: 0.3rem !important;
}

.profile-4 {
  width: 4rem;
  height: 4rem;
}

.font-4 {
  font-size: 0.4rem !important;
}

.profile-5 {
  width: 5rem;
  height: 5rem;
}

.font-5 {
  font-size: 0.5rem !important;
}

.profile-6 {
  width: 6rem;
  height: 6rem;
}

.font-6 {
  font-size: 0.6rem !important;
}

.profile-7 {
  width: 7rem;
  height: 7rem;
}

.font-7 {
  font-size: 0.7rem !important;
}

.profile-8 {
  width: 8rem;
  height: 8rem;
}

.font-8 {
  font-size: 0.8rem !important;
}

.profile-9 {
  width: 9rem;
  height: 9rem;
}

.font-9 {
  font-size: 0.9rem !important;
}

.profile-10 {
  width: 10rem;
  height: 10rem;
}
.font-10 {
  font-size: 1rem !important;
}

.profile-11 {
  width: 11rem;
  height: 11rem;
}

.font-11 {
  font-size: 1.1rem !important;
}
</style>
