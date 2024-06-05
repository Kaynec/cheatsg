<template>
  <div class="grid gap-4 lg:grid-cols-2 mt-1 pa-lg">
    <QInnerLoading :showing="pending" />
    <FavouriteAndAvailableCard
      @refresh-items="reExecuteFetchCalls()"
      :price="
        parseInt(
          formatPrice(product.product.off_price ?? product.product.price)
        )
      "
      :name="product.product.title"
      :discount="15"
      discountCode="ED34FBL"
      class="col-12 col-lg-6 my-sm"
      v-for="product in data"
      :key="product.id"
      :id="product.id"
      :image="product.product.main_image"
    />
  </div>
</template>

<script setup lang="ts">
import { apiUserFavoriteProductListRetrieve } from "@/api";
import { formatPrice } from "@/api/basket-helper";

const { data, pending, execute } = useAsyncData(
  "favurites",
  async () =>
    (await apiUserFavoriteProductListRetrieve()) as unknown as Record<
      string,
      any
    >[]
);

function reExecuteFetchCalls() {
  refreshNuxtData("favurites");
  execute();
}
</script>

<style scoped></style>
