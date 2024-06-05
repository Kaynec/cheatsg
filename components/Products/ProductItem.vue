<template>
  <div
    @click="navigateTo({ name: 'Products-id', params: { id: data.slug } })"
    class="flex sm-flex-col bg-background-primary custom-opacity gap-y-3 pt-xs !overflow-visible !rounded-1.75rem -hover:translate-y-3 transition-ease transition-250"
  >
    <div class="px-2 md:px-3">
      <section
        class="min-w-5rem aspect-1 sm:aspect-auto min-h-7rem px-sm p-sm mx-auto !rounded-2xl flex items-center bg-background-secondary border-1px border-solid border-#303030 f-text-11-14"
      >
        <NuxtImg
          :src="data.main_image"
          width="150"
          height="150"
          class="m-auto object-contain aspect-1 w-auto max-w-30 md:max-w-30 lg:max-w-35"
          alt="product card image"
          loading="lazy"
        />
      </section>
    </div>

    <div class="flex flex-1 gap-1">
      <div
        class="flex justify-between px-xs basis-full gap-1 items-center basis-full"
      >
        <span class="f-text-14-16">{{ data.title }}</span>
        <span class="border-2 border-primary text-primary px-2 rounded-lg">
          {{ calculatePercentageOffPrice(data) }}%
        </span>
      </div>

      <span
        v-if="data.device_model"
        class="text-text-secondary !f-text-14-14 pt-2 text-start ps-xs"
        >مدل :
        <span class="text-primary-alternate">{{ data.device_model }}</span>
      </span>
      <div class="flex justify-between w-full">
        <StarComponent
          starClasses="!w-5 !h-5"
          containerClasses="!text-lg"
          :starNumber="parseInt(data.score ?? '0')"
          :bordered="false"
        />
      </div>
    </div>

    <!-- TODO Maki This Dynamic TOO -->
    <div class="flex !overflow-visible basis-full">
      <QBtn
        @click="navigateTo('/Products')"
        class="!rounded-b-1.75rem !overflow-visible !bg-#007AFF0D full-width !p-0 !py-2 !border-t-2 !border-t-#007AFF !border-t-solid"
      >
        <!-- <Bag class="fill-primary w-8 h-8" /> -->
        <div class="w-full !flex justify-between gap-2 py-2 px-3 items-center">
          <!-- Only Show The Line through Price if it has a special price aswell -->
          <span
            v-if="data.off_price"
            class="f-text-11-14 text-text-secondary line-through"
          >
            {{ formatPrice(data.price) }} تومان
          </span>
          <span class="f-text-18-22 text-primary ms-auto">
            {{ formatPrice(data.off_price ?? data.price) }} تومان</span
          >
        </div>
      </QBtn>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProudctOutPut } from "@/api";
import { formatPrice } from "@/api/basket-helper";
import type { Product } from "@/types";

defineProps<{
  data: Product | ProudctOutPut;
}>();
</script>
