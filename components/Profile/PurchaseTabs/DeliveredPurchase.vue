<template>
  <div class="grid gap-4">
    <UserPurchaseCard
      :id="i.id"
      :price="formatPrice(parseInt(i.total_price))"
      :off_price="formatPrice(parseInt(i.total_price_discount))"
      :purchaseStatus="'Delivered'"
      v-for="i in data"
      :images="
        (i.product_images as unknown as any[]).map(
          (el) => el.product.main_image
        )
      "
    />
  </div>
</template>
<script setup lang="ts">
import type { GameListCusotmerOutPut } from "@/api";
import { formatPrice } from "@/api/basket-helper";

defineProps<{
  data: GameListCusotmerOutPut[];
}>();
</script>
