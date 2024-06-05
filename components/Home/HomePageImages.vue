<script setup lang="ts">
import { apiGeneralBannerListRetrieve, type BannerOutPut } from "@/api";
import { useIntersectionObserver } from "@vueuse/core";

const imageContainer = ref();

const targetIsVisible = ref(false);

const { stop } = useIntersectionObserver(
  imageContainer,
  ([{ isIntersecting }]) => {
    // i don't set it to false because i don't re enable the animation
    if (isIntersecting) {
      targetIsVisible.value = true;
    }
  }
);
const { data: banners, pending: bannersPending } = useAsyncData(
  "general-banners",
  async () =>
    (await apiGeneralBannerListRetrieve()) as unknown as BannerOutPut[]
);
onBeforeUnmount(stop);
</script>
<template>
  <div
    class="grid md-grid-cols-2 gap-4 my-4xl opacity-0 w-full"
    ref="imageContainer"
    :class="{ animte: targetIsVisible }"
  >
    <QCard
      @click="
        navigateTo(
          {
            path: image.link,
          },
          {
            external: true,
          }
        )
      "
      class="max-h-18rem w-full"
      v-for="image in banners"
      :key="image.id"
    >
      <NuxtImg
        class="rounded-2xl"
        style="width: 100%; height: 100%"
        alt="game dynamic banner"
        :src="image.picture"
        loading="lazy"
      />
    </QCard>
  </div>
</template>

<style scoped>
.animte {
  animation: animateOnScroll 1.25s forwards;
}

@keyframes animateOnScroll {
  from {
    opacity: 0;
    transform: translate(50vh, 25vw);
  }
  to {
    opacity: 1;
    transform: translate(0);
  }
}
</style>
