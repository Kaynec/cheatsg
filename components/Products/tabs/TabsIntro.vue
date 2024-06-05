<script setup lang="ts">
import type { Product } from "@/types";

const { data } = defineProps<{
  data: Product;
}>();

const hello = ref(``);

const isLoading = ref(true);

onMounted(async () => {
  isLoading.value = true;
  try {
    const intro = (await $fetch(data.description)) as string;
    hello.value = intro;
  } catch (error) {
    console.warn(error);
  }
  isLoading.value = false;
});
</script>

<template>
  <main class="min-h-120">
    <QInnerLoading :showing="isLoading" />
    <div v-html="hello" class="py-4"></div>
  </main>
</template>
