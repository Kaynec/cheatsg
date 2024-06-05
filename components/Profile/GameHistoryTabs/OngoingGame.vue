<template>
  <div class="grid gap-4">
    <!-- TODO ask for creation date and schedule types -->
    <UserGameCard
      :id="i.id"
      :price="formatPrice(parseInt(i.total_price))"
      :off_price="formatPrice(parseInt(i.total_price_discount))"
      purchaseStatus="Ongoing"
      :images="
        (i.product_images as unknown as any[]).map(
          (el) => el.product.main_image
        )
      "
      :ongoing="true"
      @click:detail="gotoBasketDateSelect(i)"
      v-for="i in data"
    />
  </div>
</template>

<script setup lang="ts">
import { gotoBasketDateSelect } from "@/utils/Navigations-Utils";
import type { GameListCusotmerOutPut } from "@/api";
import { formatPrice } from "@/api/basket-helper";

defineProps<{
  data: GameListCusotmerOutPut[];
}>();
</script>
