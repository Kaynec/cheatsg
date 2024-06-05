<template>
  <QCard
    class="!flex !flex-col shadow-0 bg-background-primary gap-y-1 custom-opacity pt-xs !overflow-visible !rounded-1.75rem -hover:translate-y-1 transition-ease transition-250"
  >
    <div
      class="flex justify-between h-full !flex-nowrap items-start gap-3 pa-xs"
    >
      <!-- Image Section -->
      <div class="grid gap-x-3 gap-y-6 w-40% max-w-40 grid-cols-2">
        <div
          class="w-full bg-background-secondary rounded-lg max-w-5rem p-2"
          v-for="product in packg.included_products"
        >
          <NuxtImg
            :src="product.main_image"
            fit="cover"
            alt="product card image"
            class="!object-cover w-full h-full"
            loading="lazy"
            width="35"
            height="35"
          />
        </div>
      </div>
      <div class="flex flex-col min-h-65 h-full grow gap-2 mx-1">
        <span class="f-text-14-18">{{ packg.title }}</span>

        <div class="grid grid-cols-2 gap-y-2 mt-3">
          <div
            v-for="product in packg.included_products"
            class="flex col-span-2 2xl:col-span-1 items-center gap-2 text-xs text-text-secondary"
          >
            <Bullet class="fill-primary" />
            {{ product.title }}
          </div>
        </div>
        <div class="mt-auto flex justify-end">
          <span class="text-primary f-text-14-17 font-bold ps-xs"
            >{{
              formatPrice(parseInt(packg.off_price ?? packg.price))
            }}
            تومان</span
          >
        </div>
      </div>
    </div>

    <!-- TODO Maki This Dynamic TOO -->
    <button
      @click="navigate(packg)"
      class="!rounded-b-1.75rem text-primary bg-primary-light full-width flex justify-center !p-0 !py-2 !f-text-14-18 gap-2 items-center !border-t-2 !border-t-#007AFF !border-t-solid"
    >
      <Bag class="fill-primary w-5 h-5" />
      افزودن به سبد خرید
    </button>
  </QCard>
</template>
<script setup lang="ts">
import type { ProudctOutPut } from "@/api";
import { formatPrice } from "@/api/basket-helper";
import type { Package } from "@/types";

defineProps<{
  packg: Package;
}>();

function navigate(packg: ProudctOutPut) {
  navigateTo({
    name: "Products-Package-id",
    params: {
      id: packg.slug,
    },
  });
}
</script>
