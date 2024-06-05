<template>
  <div class="flex flex-col items-center gap-4">
    <div class="grid grid-cols-3 md:grid-cols-2 gap-4">
      <NuxtImg
        loading="lazy"
        v-for="image in data.included_products"
        :key="image.id"
        class="cursor-pointer max-w-18 border-1 border-solid border-#303030 p-1px rounded-xl p-xs"
        :src="image.main_image"
        alt="controller-big.png"
        @click="showImageDialog = true"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProudctOutPut } from "@/api";

defineProps<{
  data: { included_products: ProudctOutPut[] };
}>();

const showImageDialog = defineModel();
</script>
