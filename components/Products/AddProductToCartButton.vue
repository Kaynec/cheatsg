<template>
  <PrimaryButton
    class="!rounded-full"
    @click="addProductToCard(data, selectedAttachments)"
  >
    افزودن به سبد خرید
  </PrimaryButton>
</template>

<script setup lang="ts">
import type { ProductDetailOutPut } from "@/api";
import { addProductToCard } from "@/api/basket-helper";

defineProps<{
  data: ProductDetailOutPut;
  selectedAttachments: string[];
}>();
</script>
