<template>
  <div class="grid gap-4">
    <UserPurchaseCard
      :id="i.id"
      :price="formatPrice(parseInt(i.total_price))"
      :off_price="formatPrice(parseInt(i.total_price_discount))"
      :purchaseStatus="'Ongoing'"
      v-for="i in data"
      :images="
        (i.product_images as unknown as any[]).map(
          (el) => el.product.main_image
        )
      "
      :ongoing="true"
      @click:detail="gotoBasketDateSelect(i)"
    />
  </div>
</template>
<script setup lang="ts">
import type { GameListCusotmerOutPut } from "@/api";
import { formatPrice } from "@/api/basket-helper";
import { gotoBasketDateSelect } from "@/utils/Navigations-Utils";

defineProps<{
  data: GameListCusotmerOutPut[];
}>();
</script>
