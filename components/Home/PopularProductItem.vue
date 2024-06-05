<template>
  <div
    class="min-w-70 !flex !flex-col bg-background-primary gap-y-1 custom-opacity pt-xs !overflow-visible !rounded-1.75rem -hover:translate-y-1 transition-ease transition-250"
  >
    <div
      class="basis-full bg-background-secondary flex justify-center mx-xs rounded-lg"
    >
      <NuxtImg
        :src="img"
        width="180"
        height="180"
        class="w-[clamp(80px,7rem,180px)] h-[clamp(80px,7rem,180px)]"
        fit="contain"
        alt="product card image"
        loading="lazy"
      />
    </div>

    <div class="flex justify-between gap-1 items-center px-xs">
      <span class="f-text-14-18">{{ title }}</span>
      <ClientOnly>
        <span
          v-if="$q.screen.width > 640"
          class="text-primary f-text-12-15 font-bold"
          >{{ formatPrice(price) }} تومان</span
        >
      </ClientOnly>
    </div>

    <span
      class="text-text-secondary !f-text-14-14 pt-2 text-start ps-xs basis-full"
      >مدل : <span class="text-primary-alternate">{{ device_model }}</span>
    </span>
    <ClientOnly>
      <span
        v-if="$q.screen.width < 640"
        class="text-primary f-text-14-17 font-bold ps-xs"
        >{{ formatPrice(price) }} تومان</span
      >
    </ClientOnly>
    <!-- TODO Maki This Dynamic TOO -->
    <button
      class="!rounded-b-1.75rem text-primary bg-primary-light full-width flex justify-center !p-0 !py-2 !f-text-14-18 gap-2 items-center !border-t-2 !border-t-#007AFF !border-t-solid"
    >
      <!-- <Bag class="fill-primary w-5 h-5" /> -->
      رفتن به صفحه محصول
    </button>
  </div>
</template>

<script setup lang="ts">
import { formatPrice } from "@/api/basket-helper";

defineProps<{
  img: string;
  title: string;
  slug: string;
  device_model: string;
  price: number;
}>();
</script>
