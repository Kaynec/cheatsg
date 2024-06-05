<template>
  <div
    :style="backgroundStyles"
    class="custom-bg min-h-55 rounded-xl relative border-2 border-primary flex flex-col justify-between gap-2 text-text-primary pa-sm"
  >
    <NuxtImg
      src="/images/shop/fortnite.svg"
      class="absolute bottom-0 min-w-65 right-0"
      aria-details="just a bg image actually"
    />
    <h2 class="text-2xl">
      پکیج <span class="text-primary"> پیشنهادی </span> ما به شما:
    </h2>
    <div class="grid w-full lg:grid-cols-3 gap-4 lg:max-w-80%">
      <QCard
        v-for="i in products.slice(0, 3)"
        :key="i.id"
        class="flex !flex-nowrap w-full px-xs py-lg gap-1 shadow-1 items-center bg-dark text-xs border-1 border-solid border-border-primary justify-items-start"
      >
        <NuxtImg
          loading="lazy"
          :src="i.main_image"
          class="w-full !max-w-15 inline-flex"
          alt="game card image "
        />
        <div class="flex flex-col gap-2 grow items-start">
          خرید بازی {{ i.title }}
          <span class="text-right">
            {{ formatPrice(parseInt(i.price)) }}
            <strong class="text-text-secondary"> تومان </strong>
          </span>
        </div>
      </QCard>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { ProudctOutPut } from "@/api";
import { formatPrice } from "@/api/basket-helper";

defineProps<{
  products: ProudctOutPut[];
}>();

const img = useImage();
const backgroundStyles = computed(() => {
  const imgUrl = img("/images/shop/background.svg", { format: "webp" });
  return { backgroundImage: `url('${imgUrl}')` };
});
</script>

<style lang="scss" scoped>
.custom-bg {
  background-repeat: no-repeat;

  background-size: cover;
  background-position: center;
}
</style>
