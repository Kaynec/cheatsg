<template>
  <div class="flex flex-col items-center gap-4">
    <img class="max-w-58" :src="data.main_image" alt="controller-big.png" />
    <div class="flex gap-2">
      <NuxtImg
        loading="lazy"
        v-for="image in data.images"
        :key="image.id"
        class="cursor-pointer max-w-18 border-1 border-solid border-#303030 p-1px rounded-xl p-xs"
        :src="image.file"
        alt="controller-big.png"
        @click="showImageDialog = true"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductDetailOutPut } from "@/api";

defineProps<{
  data: ProductDetailOutPut;
}>();

const showImageDialog = defineModel();
</script>
